"""
Predictions API endpoints
Endpoints for ML predictions: price classification and anomaly detection
"""

from fastapi import APIRouter, HTTPException
from app.schemas.prediction import (
    PredioInput,
    PriceClassificationResponse,
    AnomalyDetectionResponse,
    PredictionFullResponse,
)
from app.services.prediction_service import prediction_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/classify-price", response_model=PriceClassificationResponse)
async def classify_price(predio: PredioInput):
    """
    Classify the price range of a property

    Returns one of: ALTO, BAJO, MEDIO, LUJO
    """
    try:
        result = prediction_service.clasificar_precio(predio.model_dump())
        return PriceClassificationResponse(**result)
    except Exception as e:
        logger.error(f"Error in price classification endpoint: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error al clasificar precio: {str(e)}"
        )


@router.post("/detect-anomaly", response_model=AnomalyDetectionResponse)
async def detect_anomaly(predio: PredioInput):
    """
    Detect if a property transaction is anomalous

    Returns anomaly detection result (possible fraud, money laundering, or data errors)
    """
    try:
        result = prediction_service.detectar_anomalia(predio.model_dump())
        return AnomalyDetectionResponse(**result)
    except Exception as e:
        logger.error(f"Error in anomaly detection endpoint: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error al detectar anomalías: {str(e)}"
        )


@router.post("/full", response_model=PredictionFullResponse)
async def full_prediction(predio: PredioInput):
    """
    Perform complete prediction: price classification + anomaly detection

    Returns both classification and anomaly detection results in a single call
    """
    try:
        result = prediction_service.prediccion_completa(predio.model_dump())
        return PredictionFullResponse(**result)
    except Exception as e:
        logger.error(f"Error in full prediction endpoint: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error al realizar predicción completa: {str(e)}"
        )
