from fastapi import FastAPI
from app.api.v1.chat import router as chat_router

app = FastAPI(debug=True)

# Registrar rutas
app.include_router(chat_router, prefix="/api/v1", tags=["Chat"])


@app.get("/")
async def root():
    return {"message": "API is running"}
