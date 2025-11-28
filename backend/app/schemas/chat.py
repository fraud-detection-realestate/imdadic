from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Message(BaseModel):
    role: str
    content: str
    
    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    user_id: str

class ChatResponse(BaseModel):
    response: str
    conversation_id: str

class ConversationResponse(BaseModel):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    messages: List[Message] = []
    
    class Config:
        from_attributes = True