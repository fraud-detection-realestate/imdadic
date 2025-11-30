import time
import uuid
from google import genai
from google.genai import types
from app.core.config import settings
from typing import List, Dict, Optional
from datetime import datetime, timedelta
import threading
from app.services.tools import tool_predict_price, tool_detect_anomaly


class ChatSessionManager:
    """
    Gestiona historiales de chat en memoria para usuarios anónimos.
    Implementa patrón Singleton y limpieza automática.
    """

    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(ChatSessionManager, cls).__new__(cls)
                    cls._instance.sessions = {}
                    cls._instance.max_sessions = 1000
                    cls._instance.session_timeout = 3600  # 1 hora en segundos
                    cls._instance.last_cleanup = time.time()
        return cls._instance

    def get_history(self, session_id: str) -> List[Dict[str, str]]:
        """Recupera el historial de una sesión"""
        self._cleanup_if_needed()
        if session_id in self.sessions:
            self.sessions[session_id]["last_activity"] = time.time()
            return self.sessions[session_id]["history"]
        return []

    def add_message(self, session_id: str, role: str, content: str):
        """Agrega un mensaje al historial de la sesión"""
        self._cleanup_if_needed()

        if session_id not in self.sessions:
            # Si llegamos al límite, forzar limpieza o eliminar el más antiguo
            if len(self.sessions) >= self.max_sessions:
                self._force_cleanup()

            self.sessions[session_id] = {"history": [], "last_activity": time.time()}

        self.sessions[session_id]["history"].append({"role": role, "content": content})
        self.sessions[session_id]["last_activity"] = time.time()

    def _cleanup_if_needed(self):
        """Ejecuta limpieza si ha pasado suficiente tiempo"""
        now = time.time()
        if now - self.last_cleanup > 300:  # Limpiar cada 5 minutos
            self._force_cleanup()
            self.last_cleanup = now

    def _force_cleanup(self):
        """Elimina sesiones inactivas"""
        now = time.time()
        expired_sessions = [
            sid
            for sid, data in self.sessions.items()
            if now - data["last_activity"] > self.session_timeout
        ]
        for sid in expired_sessions:
            del self.sessions[sid]

        # Si aún hay demasiadas, eliminar las LRU (Least Recently Used)
        if len(self.sessions) >= self.max_sessions:
            sorted_sessions = sorted(
                self.sessions.items(), key=lambda x: x[1]["last_activity"]
            )
            # Eliminar el 10% más antiguo
            to_remove = int(self.max_sessions * 0.1) or 1
            for i in range(to_remove):
                if i < len(sorted_sessions):
                    del self.sessions[sorted_sessions[i][0]]


class GeminiService:
    def __init__(self, api_key: str, system_prompt: str | None = None):
        self.api_key = api_key
        self.system_prompt = system_prompt
        self.client = genai.Client(api_key=api_key)
        self.session_manager = ChatSessionManager()

        self.tools = [tool_predict_price, tool_detect_anomaly]

    def generate_response(
        self,
        prompt: str,
        history: Optional[List[Dict[str, str]]] = None,
        session_id: Optional[str] = None,
    ) -> str:
        try:
            # 1. Preparar historial (Igual que antes)
            chat_history = []
            if session_id:
                chat_history = self.session_manager.get_history(session_id)
            elif history:
                chat_history = history

            contents = []
            if self.system_prompt and not chat_history:
                contents.append(
                    types.Content(
                        role="model", parts=[types.Part(text=self.system_prompt)]
                    )
                )

            for msg in chat_history:
                role = "user" if msg["role"] == "user" else "model"
                contents.append(
                    types.Content(role=role, parts=[types.Part(text=msg["content"])])
                )

            contents.append(types.Content(role="user", parts=[types.Part(text=prompt)]))

            # 2. Llamada inicial al modelo (Usamos gemini-2.0-flash que tienes disponible)
            # NOTA: Quitamos 'automatic_function_calling' si da problemas y lo hacemos manual
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=contents,
                config=types.GenerateContentConfig(
                    temperature=0.7,
                    max_output_tokens=2048,
                    tools=self.tools,
                ),
            )

            # 3. Procesar respuesta inicial
            response_text = ""
            if response.text:
                response_text = response.text
            elif response.candidates and response.candidates[0].content.parts:
                parts = response.candidates[0].content.parts
                response_text = "".join([p.text for p in parts if p.text])
            else:
                # Intento de recuperar function_call nativo si existe
                if response.function_calls:
                    # Si la librería lo capturó como objeto, aquí iría la lógica nativa
                    # Pero asumiremos que falla y devuelve texto para este parche
                    pass
                return "Lo siento, no pude generar una respuesta válida."

            # 4. DETECCIÓN Y EJECUCIÓN MANUAL DE HERRAMIENTAS
            # Si el modelo devuelve algo como "tool_predict_price(...)" como texto
            if (
                "tool_predict_price(" in response_text
                or "tool_detect_anomaly(" in response_text
            ):
                print(f"🛠️ Detectada llamada a herramienta en texto: {response_text}")

                try:
                    import re

                    tool_result = "Error ejecutando herramienta."

                    if "tool_predict_price" in response_text:
                        # Extraer argumentos con Regex (simple y efectivo para este caso)
                        dept_match = re.search(
                            r"departamento=['\"]([^'\"]*)['\"]", response_text
                        )
                        muni_match = re.search(
                            r"municipio=['\"]([^'\"]*)['\"]", response_text
                        )
                        area_match = re.search(
                            r"area_construida=([\d.]+)", response_text
                        )
                        estrato_match = re.search(r"estrato=(\d+)", response_text)

                        if dept_match and muni_match and area_match and estrato_match:
                            from app.services.tools import (
                                tool_predict_price,
                            )  # Import local

                            tool_result = tool_predict_price(
                                departamento=dept_match.group(1),
                                municipio=muni_match.group(1),
                                area_construida=float(area_match.group(1)),
                                estrato=int(estrato_match.group(1)),
                            )
                        else:
                            tool_result = "Error: No pude entender los parámetros de la predicción."

                    elif "tool_detect_anomaly" in response_text:
                        val_match = re.search(r"valor=([\d.]+)", response_text)
                        area_match = re.search(r"area=([\d.]+)", response_text)
                        muni_match = re.search(
                            r"municipio=['\"]([^'\"]*)['\"]", response_text
                        )

                        if val_match and area_match and muni_match:
                            from app.services.tools import tool_detect_anomaly

                            tool_result = tool_detect_anomaly(
                                valor=float(val_match.group(1)),
                                area=float(area_match.group(1)),
                                municipio=muni_match.group(1),
                            )

                    # 5. Enviar el resultado de vuelta al modelo para que genere la respuesta final
                    print(f"✅ Resultado herramienta: {tool_result}")

                    # Agregamos lo que el modelo "dijo" (la llamada)
                    contents.append(
                        types.Content(
                            role="model", parts=[types.Part(text=response_text)]
                        )
                    )

                    # Agregamos el resultado como si fuera un mensaje del sistema/usuario
                    tool_feedback = f"SYSTEM: La herramienta se ejecutó exitosamente. Resultado: {tool_result}. \nPor favor responde al usuario basándote en este resultado."
                    contents.append(
                        types.Content(
                            role="user", parts=[types.Part(text=tool_feedback)]
                        )
                    )

                    # Segunda llamada
                    final_response = self.client.models.generate_content(
                        model="gemini-2.0-flash", contents=contents
                    )
                    response_text = final_response.text

                except Exception as e:
                    print(f"❌ Error ejecutando tool manualmente: {e}")
                    # CAMBIO TEMPORAL: Devuelve el error real en el chat para verlo
                    response_text += f"\nDEBUG ERROR: {str(e)}"

            # 6. Guardar y Retornar
            if session_id:
                self.session_manager.add_message(session_id, "user", prompt)
                self.session_manager.add_message(session_id, "model", response_text)

            return response_text

        except Exception as e:
            print(f"Error generando respuesta: {e}")
            import traceback

            traceback.print_exc()
            return f"Lo siento, ocurrió un error al procesar tu pregunta."


# Importar y usar el system prompt mejorado
try:
    from app.services.knowledge_base import get_system_prompt

    enhanced_system_prompt = get_system_prompt()
except ImportError:
    enhanced_system_prompt = "Eres un asistente experto en análisis inmobiliario."

gemini_service = GeminiService(
    api_key=settings.GEMINI_API_KEY, system_prompt=enhanced_system_prompt
)
