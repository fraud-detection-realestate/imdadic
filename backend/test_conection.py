from app.core.config import settings
from app.core.database import engine
from sqlalchemy import text

print(f"Intentando conectar a: {settings.DATABASE_URL}")

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        version = result.fetchone()
        print("✅ Conexión exitosa a PostgreSQL!")
        print(f"Versión: {version}")
        print(f"Base de datos: {settings.DB_NAME}")
except Exception as e:
    print("❌ Error de conexión:")
    print(e)