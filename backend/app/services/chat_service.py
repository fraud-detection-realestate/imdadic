from google import genai
from google.genai import types
from app.core.config import settings


class GeminiService:
    def __init__(self, api_key: str, system_prompt: str | None = None):
        self.api_key = api_key
        self.system_prompt = system_prompt
        self.client = genai.Client(api_key=api_key)

    def generate_response(self, prompt: str) -> str:
        if self.system_prompt:
            final_prompt = f"{self.system_prompt}\n\nUsuario: {prompt}"
        else:
            final_prompt = prompt
        
        response = self.client.models.generate_content(
            model="gemini-2.5-flash",  # Modelo disponible y estable
            contents=final_prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
            )
        )
        
        if response.text is None:
            return "Lo siento, no pude generar una respuesta."
        
        return response.text


gemini_service = GeminiService(
    api_key=settings.GEMINI_API_KEY,
    system_prompt=settings.SYSTEM_PROMPT
)