from fastapi import FastAPI
from app.api.v1.chat import router as chat_router
from app.api.v1.predictions import router as predictions_router
from app.models_ml.model_loader import ml_models

app = FastAPI(
    title="IMDADIC API",
    description="API para análisis de datos inmobiliarios y detección de irregularidades",
    version="1.0.0",
    debug=True,
)


@app.on_event("startup")
async def startup_event():
    """Load ML models on application startup"""
    ml_models.load_models()


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
        "endpoints": {"docs": "/docs", "health": "/health"},
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    models_loaded = ml_models.is_loaded()
    return {
        "status": "healthy" if models_loaded else "degraded",
        "models_loaded": models_loaded,
    }
