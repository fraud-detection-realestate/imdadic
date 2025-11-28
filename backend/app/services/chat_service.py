from google import genai
from google.genai import types
from app.core.config import settings
from typing import List, Dict, Optional


class GeminiService:
    def __init__(self, api_key: str, system_prompt: str | None = None):
        self.api_key = api_key
        self.system_prompt = system_prompt
        self.client = genai.Client(api_key=api_key)

    def generate_response(
        self, prompt: str, history: Optional[List[Dict[str, str]]] = None
    ) -> str:
        try:
            # Si hay historial, usar chat multi-turn
            if history and len(history) > 0:
                # Construir el historial usando los tipos correctos
                contents = []

                for msg in history:
                    role = "user" if msg["role"] == "user" else "model"
                    contents.append(
                        types.Content(
                            role=role, parts=[types.Part(text=msg["content"])]
                        )
                    )

                # Agregar el mensaje actual
                contents.append(
                    types.Content(role="user", parts=[types.Part(text=prompt)])
                )

                response = self.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=contents,
                    config=types.GenerateContentConfig(
                        temperature=0.7,
                    ),
                )
            else:
                # Primera interacción - incluir system prompt
                if self.system_prompt:
                    final_prompt = f"{self.system_prompt}\n\n{prompt}"
                else:
                    final_prompt = prompt

                response = self.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=final_prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.7,
                    ),
                )

            if response.text is None:
                return "Lo siento, no pude generar una respuesta."

            return response.text

        except Exception as e:
            print(f"Error generando respuesta: {e}")
            import traceback

            traceback.print_exc()
            return f"Lo siento, ocurrió un error al generar la respuesta."


gemini_service = GeminiService(
    api_key=settings.GEMINI_API_KEY, system_prompt=settings.SYSTEM_PROMPT
)
