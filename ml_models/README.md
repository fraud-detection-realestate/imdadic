# 🧠 Modelos de Detección de Fraude y Valoración Inmobiliaria (IGAC)

Este directorio contiene los artefactos de Machine Learning entrenados para el sistema de monitoreo de dinámicas inmobiliarias. Estos modelos permiten clasificar rangos de precios y detectar anomalías transaccionales (posible fraude, lavado de activos, errores de registro).

---

## 📦 Inventario de Modelos

Los siguientes archivos `.pkl` son requeridos para la inferencia en producción:

| Archivo | Tipo | Descripción | Notebook Origen |
| :--- | :--- | :--- | :--- |
| **`lgbm_classifier_balanced_v1.pkl`** | Modelo ML | **Clasificador LightGBM**. Predice el rango de precio (`ALTO`, `BAJO`, `MEDIO`, `LUJO`) basado en características del predio. | `04_entrenamiento_model.ipynb` |
| **`model_artifacts_v1.pkl`** | Metadatos | Diccionario con **Encoders** y lista de features necesarios para el clasificador LightGBM. Indispensable para preprocesar el JSON de entrada. | `04_entrenamiento_model.ipynb` |
| **`isolation_forest_v1.pkl`** | Modelo ML | **Detector de Anomalías (Isolation Forest)**. Identifica transacciones sospechosas (fraude, valores atípicos). Devuelve `-1` (Anomalía) o `1` (Normal). | `05_deteccion_anomalias.ipynb` |
| **`anomalies_artifacts_v1.pkl`** | Metadatos | Contiene el `StandardScaler` y `LabelEncoders` específicos usados para normalizar los datos antes de pasarlos al detector de anomalías. | `05_deteccion_anomalias.ipynb` |

---

## Datos de entrada (Ejemplo JSON del frontend)

```json
    predio_input = {
    "DEPARTAMENTO": "ANTIOQUIA",
    "MUNICIPIO": "MEDELLIN",
    "TIPO_PREDIO_ZONA": "URBANO",
    "CATEGORIA_RURALIDAD": "Urbano",
    "ORIP": "001",
    "ESTADO_FOLIO": "ACTIVO",
    "YEAR_RADICA": 2023,
    "NUM_ANOTACION": 5,
    "Dinámica_Inmobiliaria": 10,
    "COD_NATUJUR": 125, # Código de Compraventa
    "COUNT_A": 1,
    "COUNT_DE": 1,
    "PREDIOS_NUEVOS": 0,
    "TIENE_MAS_DE_UN_VALOR": 0,
    "VALOR_CONSTANTE_2024": 500000000
    }
```
