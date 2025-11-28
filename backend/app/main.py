from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.api.v1.chat import router as chat_router
from app.core.config import settings
from app.core.database import engine


def check_database_connection():
    """Verifica la conexión a la base de datos y muestra información útil en consola."""
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version();"))
            version = result.fetchone()
            print("✅ Conexión exitosa a PostgreSQL!")
            print(f"Versión: {version}")
            print(f"Base de datos: {getattr(settings, 'DB_NAME', 'No definida')}")
    except Exception as e:
        print("❌ Error de conexión:")
        print(e)


def create_app() -> FastAPI:
    """Crea y configura la aplicación FastAPI."""
    app = FastAPI(debug=True)

    # Configurar CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Registrar rutas
    app.include_router(chat_router, prefix="/api/v1", tags=["Chat"])

    @app.get("/")
    async def root():
        return {"message": "API is running"}

    return app


# Verificar conexión a la base de datos al iniciar
check_database_connection()

# Instancia global de la app
app = create_app()

