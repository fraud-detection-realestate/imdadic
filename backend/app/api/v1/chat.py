from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.chat import ChatRequest, ChatResponse, ConversationResponse
from app.schemas.user import UserCreate, UserResponse
from app.services.chat_service import gemini_service
from app.core.database import get_db
from app.models import Conversation, Message
from app.models.user import User
from datetime import datetime
from typing import List, Optional
import uuid


router = APIRouter()


@router.post("/user", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar si el usuario ya existe
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    new_user = User(username=user.username)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get("/user/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user


@router.get("/users", response_model=List[UserResponse])
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest, db: Session = Depends(get_db)):
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="El mensaje no puede estar vacío")

    # --- FLUJO 1: SESIÓN ANÓNIMA (EN MEMORIA) ---
    # Si hay session_id o NO hay user_id, asumimos sesión anónima
    if req.session_id or not req.user_id:
        # Generar session_id si no existe
        session_id = req.session_id or str(uuid.uuid4())

        try:
            # Usar servicio con session_id (gestiona historial en memoria)
            response_text = gemini_service.generate_response(
                prompt=req.message, session_id=session_id
            )

            return ChatResponse(response=response_text, session_id=session_id)
        except Exception as e:
            print(f"Error en chat anónimo: {e}")
            raise HTTPException(
                status_code=503, detail="El servicio de IA no está disponible"
            )

    # --- FLUJO 2: USUARIO REGISTRADO (BASE DE DATOS) ---
    # Si hay user_id, usamos el flujo persistente original

    # 1. Obtener o crear usuario (con manejo de concurrencia)
    user = db.query(User).filter(User.id == req.user_id).first()
    if not user:
        try:
            user = User(id=req.user_id, username=f"user_{req.user_id}")
            db.add(user)
            db.commit()
            db.refresh(user)
        except Exception:
            # Si falla (ej. race condition), intentamos obtenerlo de nuevo
            db.rollback()
            user = db.query(User).filter(User.id == req.user_id).first()
            if not user:
                raise HTTPException(status_code=500, detail="Error creando usuario")

    # 2. Obtener o crear conversación
    conversation: Optional[Conversation] = None
    if req.conversation_id:
        conversation = (
            db.query(Conversation)
            .filter(Conversation.id == req.conversation_id)
            .first()
        )

    if not conversation:
        conversation = Conversation(user_id=req.user_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # 3. Obtener historial (limitado a últimos 20 mensajes para eficiencia)
    messages = (
        db.query(Message)
        .filter(Message.conversation_id == conversation.id)
        .order_by(Message.created_at.desc())
        .limit(20)
        .all()
    )
    # Reordenar cronológicamente para el prompt
    messages.reverse()

    history_dicts = [{"role": msg.role, "content": msg.content} for msg in messages]

    # 4. Generar respuesta con Gemini
    try:
        response_text = gemini_service.generate_response(
            req.message, history=history_dicts
        )
    except Exception as e:
        print(f"Error externo Gemini: {e}")
        raise HTTPException(
            status_code=503,
            detail="El servicio de IA no está disponible momentáneamente",
        )

    # 5. Guardar interacción en una sola transacción atómica
    try:
        # Guardar mensaje del usuario
        user_message = Message(
            conversation_id=conversation.id, role="user", content=req.message
        )
        db.add(user_message)

        # Guardar respuesta del asistente
        assistant_message = Message(
            conversation_id=conversation.id, role="assistant", content=response_text
        )
        db.add(assistant_message)

        # Actualizar timestamp de conversación
        conversation.updated_at = datetime.utcnow()  # type: ignore[attr-defined]

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error guardando mensajes: {e}")
        raise HTTPException(status_code=500, detail="Error guardando la conversación")

    return ChatResponse(
        response=response_text,
        conversation_id=str(conversation.id),
    )


@router.get("/conversations/{user_id}", response_model=List[ConversationResponse])
async def get_user_conversations(user_id: str, db: Session = Depends(get_db)):
    """Obtener todas las conversaciones de un usuario"""
    conversations = (
        db.query(Conversation)
        .filter(Conversation.user_id == user_id)
        .order_by(Conversation.updated_at.asc())
        .all()
    )  # me muestra las conversaciones mas antiguas primero

    return conversations


@router.get("/conversation/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(conversation_id: str, db: Session = Depends(get_db)):
    """Obtener una conversación específica con su historial"""
    conversation = (
        db.query(Conversation).filter(Conversation.id == conversation_id).first()
    )

    if not conversation:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Conversación no encontrada")

    return conversation
