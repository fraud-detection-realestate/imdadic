from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.api.v1.chat import router as chat_router
from app.core.config import settings
from app.core.database import engine
from app.api.v1.predictions import router as predictions_router
from app.models_ml.model_loader import ml_models


def check_database_connection():
    """Verifica la conexión a la DB. Retorna True si es exitosa."""
    try:
        # Nota: Si usas un engine asíncrono, esto debería ser await
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version();"))
            version = result.fetchone()
            print(f"✅ Conexión exitosa a PostgreSQL: {version}")
            return True
    except Exception as e:
        print(f"❌ Error de conexión a BD: {e}")
        return False


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Maneja el ciclo de vida de la aplicación (Startup y Shutdown).
    Reemplaza a @app.on_event("startup") y ("shutdown").
    """
    # --- CÓDIGO DE INICIO (STARTUP) ---
    print("🚀 Iniciando aplicación...")

    # 1. Verificar Base de Datos
    db_status = check_database_connection()
    if not db_status:
        print("⚠️ Advertencia: La aplicación inició sin conexión a BD.")

    # 2. Cargar Modelos de ML
    print("🧠 Cargando modelos de ML...")
    ml_models.load_models()  # Asegúrate que esto no bloquee demasiado si es síncrono

    yield  # La aplicación corre aquí

    # --- CÓDIGO DE CIERRE (SHUTDOWN) ---
    print("🛑 Cerrando aplicación y liberando recursos...")
    # Aquí podrías cerrar conexiones a BD o limpiar memoria de modelos si fuera necesario
    # ml_models.unload()


def create_app() -> FastAPI:
    """Crea y configura la aplicación FastAPI."""

    # Pasamos el lifespan aquí
    app = FastAPI(
        title="IMDADIC API",
        version="1.0.0",
        debug=settings.DEBUG,  # Usa la config en lugar de hardcodear True
        lifespan=lifespan,
    )

    # Configurar CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",
            "http://localhost:5173",
        ],  # Mover a settings idealmente
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Registrar rutas
    app.include_router(chat_router, prefix="/api/v1", tags=["Chat"])
    app.include_router(
        predictions_router, prefix="/api/v1/predictions", tags=["Predictions"]
    )

    @app.get("/")
    async def root():
        return {
            "message": "IMDADIC API is running",
            "version": "1.0.0",
            "docs": "/docs",
        }

    @app.get("/health")
    async def health_check():
        models_loaded = ml_models.is_loaded()
        # Podrías agregar verificación de BD en tiempo real aquí también
        return {
            "status": "healthy" if models_loaded else "degraded",
            "models_loaded": models_loaded,
        }

    return app


# Instancia global para el servidor ASGI (Uvicorn)
app = create_app()
