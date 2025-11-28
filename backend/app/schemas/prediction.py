"""
Pydantic schemas for ML prediction requests and responses
"""

from pydantic import BaseModel, Field
from typing import Dict


class PredioInput(BaseModel):
    """Input schema for property (predio) data"""

    DEPARTAMENTO: str = Field(..., description="Departamento del predio")
    MUNICIPIO: str = Field(..., description="Municipio del predio")
    TIPO_PREDIO_ZONA: str = Field(
        ..., description="Tipo de zona del predio (URBANO/RURAL)"
    )
    CATEGORIA_RURALIDAD: str = Field(..., description="Categoría de ruralidad")
    ORIP: str = Field(..., description="Código ORIP")
    ESTADO_FOLIO: str = Field(..., description="Estado del folio (ACTIVO/INACTIVO)")
    YEAR_RADICA: int = Field(..., description="Año de radicación", ge=1900, le=2100)
    NUM_ANOTACION: int = Field(..., description="Número de anotaciones", ge=0)
    Dinámica_Inmobiliaria: int = Field(..., description="Dinámica inmobiliaria", ge=0)
    COD_NATUJUR: int = Field(..., description="Código de naturaleza jurídica")
    COUNT_A: int = Field(..., description="Count A", ge=0)
    COUNT_DE: int = Field(..., description="Count DE", ge=0)
    PREDIOS_NUEVOS: int = Field(..., description="Número de predios nuevos", ge=0)
    TIENE_MAS_DE_UN_VALOR: int = Field(
        ..., description="Tiene más de un valor (0/1)", ge=0, le=1
    )
    VALOR_CONSTANTE_2024: float = Field(
        ..., description="Valor constante en pesos de 2024", gt=0
    )

    class Config:
        json_schema_extra = {
            "example": {
                "DEPARTAMENTO": "ANTIOQUIA",
                "MUNICIPIO": "MEDELLIN",
                "TIPO_PREDIO_ZONA": "URBANO",
                "CATEGORIA_RURALIDAD": "Urbano",
                "ORIP": "001",
                "ESTADO_FOLIO": "ACTIVO",
                "YEAR_RADICA": 2023,
                "NUM_ANOTACION": 5,
                "Dinámica_Inmobiliaria": 10,
                "COD_NATUJUR": 125,
                "COUNT_A": 1,
                "COUNT_DE": 1,
                "PREDIOS_NUEVOS": 0,
                "TIENE_MAS_DE_UN_VALOR": 0,
                "VALOR_CONSTANTE_2024": 500000000,
            }
        }


class PriceClassificationResponse(BaseModel):
    """Response schema for price classification"""

    rango_precio: str = Field(
        ..., description="Rango de precio predicho (ALTO, BAJO, MEDIO, LUJO)"
    )
    probabilidades: Dict[str, float] = Field(
        ..., description="Probabilidades para cada clase"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "rango_precio": "MEDIO",
                "probabilidades": {
                    "ALTO": 0.15,
                    "BAJO": 0.20,
                    "MEDIO": 0.55,
                    "LUJO": 0.10,
                },
            }
        }


class AnomalyDetectionResponse(BaseModel):
    """Response schema for anomaly detection"""

    anomalia_detectada: bool = Field(..., description="True si se detectó una anomalía")
    es_normal: bool = Field(..., description="True si la transacción es normal")
    score_anomalia: float = Field(
        ..., description="Score de anomalía del Isolation Forest"
    )
    prediccion_raw: int = Field(
        ..., description="Predicción raw: -1 = anomalía, 1 = normal"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "anomalia_detectada": False,
                "es_normal": True,
                "score_anomalia": 0.12,
                "prediccion_raw": 1,
            }
        }


class PredictionFullResponse(BaseModel):
    """Response schema for full prediction (classification + anomaly detection)"""

    clasificacion: PriceClassificationResponse = Field(
        ..., description="Resultado de clasificación de precio"
    )
    deteccion_anomalia: AnomalyDetectionResponse = Field(
        ..., description="Resultado de detección de anomalías"
    )
    predio_input: PredioInput = Field(..., description="Eco del input recibido")

    class Config:
        json_schema_extra = {
            "example": {
                "clasificacion": {
                    "rango_precio": "MEDIO",
                    "probabilidades": {
                        "ALTO": 0.15,
                        "BAJO": 0.20,
                        "MEDIO": 0.55,
                        "LUJO": 0.10,
                    },
                },
                "deteccion_anomalia": {
                    "anomalia_detectada": False,
                    "es_normal": True,
                    "score_anomalia": 0.12,
                    "prediccion_raw": 1,
                },
                "predio_input": {
                    "DEPARTAMENTO": "ANTIOQUIA",
                    "MUNICIPIO": "MEDELLIN",
                    "TIPO_PREDIO_ZONA": "URBANO",
                    "CATEGORIA_RURALIDAD": "Urbano",
                    "ORIP": "001",
                    "ESTADO_FOLIO": "ACTIVO",
                    "YEAR_RADICA": 2023,
                    "NUM_ANOTACION": 5,
                    "Dinámica_Inmobiliaria": 10,
                    "COD_NATUJUR": 125,
                    "COUNT_A": 1,
                    "COUNT_DE": 1,
                    "PREDIOS_NUEVOS": 0,
                    "TIENE_MAS_DE_UN_VALOR": 0,
                    "VALOR_CONSTANTE_2024": 500000000,
                },
            }
        }
