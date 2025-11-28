from pydantic_settings import BaseSettings
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    GEMINI_API_KEY: str
    DEBUG: bool = True

    SYSTEM_PROMPT: str = (
        "Eres un asistente experto en análisis inmobiliario y detección de anomalías."
    )

    # Database credentials
    DB_NAME: str
    DB_USER: str
    DB_PASS: str
    DB_HOST: str
    DB_PORT: str

    class Config:
        env_file = str(BASE_DIR / ".env")
        env_file_encoding = "utf-8"

    @property
    def DATABASE_URL(self) -> str:
        """Construye la URL de conexión a partir de las credenciales"""
        return f"postgresql://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


settings = Settings()  # type: ignore[attr-defined]
