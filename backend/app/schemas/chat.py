from pydantic import BaseModel


# Pydantic model for request body
class ChatRequest(BaseModel):
    message: str  # nosotros esperamos un cuerpo JSON como {"prompt": "tu mensaje aqui"}


class ChatResponse(BaseModel):
    response: (
        str  # Devolvemos un cuerpo JSON como {"response": "respuesta del chat aqui"}
    )
