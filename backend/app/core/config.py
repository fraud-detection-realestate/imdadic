from pydantic_settings import BaseSettings
from pathlib import Path

# Obtener la ruta del directorio backend
BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    GEMINI_API_KEY: str
    SYSTEM_PROMPT: str 
    
    class Config:
        env_file = str(BASE_DIR / ".env")
        env_file_encoding = 'utf-8'
        
settings = Settings() # type: ignore[attr-defined]