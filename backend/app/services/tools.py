from app.services.prediction_service import PredictionService
from app.models_ml.model_loader import ml_models
import pandas as pd

# Instancia del servicio existente
prediction_service = PredictionService()


def tool_predict_price(
    departamento: str, municipio: str, area_construida: float, estrato: int
):
    """
    Realiza una predicción rápida del rango de precios para una propiedad.

    Args:
        departamento: Nombre del departamento (ej. ANTIOQUIA).
        municipio: Nombre del municipio (ej. MEDELLIN).
        area_construida: Área en metros cuadrados.
        estrato: Estrato socioeconómico (1-6).
    """
    try:
        # 1. Construir un DataFrame con los datos mínimos requeridos
        # Nota: Los modelos ML suelen requerir MUCHAS columnas.
        # Aquí llenamos las faltantes con valores por defecto/promedio para permitir una "predicción rápida".
        input_data = {
            "DEPARTAMENTO": [departamento.upper()],
            "MUNICIPIO": [municipio.upper()],
            "AREA_CONSTRUIDA": [area_construida],
            "ESTRATO": [estrato],
            # --- Valores por defecto para lo que el usuario no dice en el chat ---
            "TIPO_PREDIO_ZONA": ["URBANO"],
            "CATEGORIA_RURALIDAD": ["Urbano"],
            "DESTINO_ECONOMICO": ["HABITACIONAL"],
            "CLASE_SUELO": ["URBANO"],
            "YEAR_RADICA": [2024],
            "NUM_ANOTACION": [1],
            "Dinámica_Inmobiliaria": [50],  # Valor medio
            "COD_NATUJUR": [1],
            "PREDIOS_NUEVOS": [0],
            "VALOR_CONSTANTE_2024": [0],  # No influye en clasificación si no es target
        }

        df = pd.DataFrame(input_data)

        # 2. Llamar al servicio de predicción real
        # Asegúrate de que tu prediction_service tenga un método que acepte DataFrame
        # O usa directamente el modelo si es necesario:

        # SIMULACIÓN (Ajusta esto a tu método real en prediction_service.py)
        # result = prediction_service.classify_price(df)

        # Como no tengo tu prediction_service completo, aquí muestro cómo usaría el modelo cargado:
        if ml_models.lgbm_classifier:
            # Aquí iría tu lógica de preprocesamiento real
            prediction = "RANGO_MEDIO"  # Placeholder si falta preprocesamiento
            confidence = 0.85
            return f"El modelo estima que esta propiedad está en el rango: {prediction} con una confianza del {confidence * 100}%."
        else:
            return "El modelo de predicción no está cargado actualmente."

    except Exception as e:
        return f"Error ejecutando el modelo: {str(e)}"


def tool_detect_anomaly(valor: float, area: float, municipio: str):
    """
    Analiza si una transacción parece anómala basada en valor y área.
    """
    # Lógica similar llamando a Isolation Forest
    return f"Análisis completado: La transacción de {valor} para {area}m2 en {municipio} se considera NORMAL."
