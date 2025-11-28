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
    # Obtener o crear conversación
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

    # Obtener historial de mensajes
    messages = (
        db.query(Message)
        .filter(Message.conversation_id == conversation.id)
        .order_by(Message.created_at)
        .all()
    )

    history_dicts = [{"role": msg.role, "content": msg.content} for msg in messages]

    # Generar respuesta
    response_text = gemini_service.generate_response(req.message, history_dicts)  # type: ignore[attr-defined]

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

    return ChatResponse(
        response=response_text,
        conversation_id=str(conversation.id),  # Convertir a string explícitamente
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
