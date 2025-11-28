from app.models import Base  # Importa desde __init__
from app.core.database import engine

def init_db():
    # Importar todos los modelos para que SQLAlchemy los registre
    from app.models import Conversation, Message
    
    Base.metadata.create_all(bind=engine)
    print("✅ Base de datos inicializada")

if __name__ == "__main__":
    init_db()