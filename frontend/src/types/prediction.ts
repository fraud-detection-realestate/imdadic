/**
 * Types for ML Prediction API
 * These match the Pydantic schemas in backend/app/schemas/prediction.py
 */

export interface PredioInput {
    DEPARTAMENTO: string;
    MUNICIPIO: string;
    TIPO_PREDIO_ZONA: string;
    CATEGORIA_RURALIDAD: string;
    ORIP: string;
    ESTADO_FOLIO: string;
    YEAR_RADICA: number;
    NUM_ANOTACION: number;
    Dinámica_Inmobiliaria: number;
    COD_NATUJUR: number;
    COUNT_A: number;
    COUNT_DE: number;
    PREDIOS_NUEVOS: number;
    TIENE_MAS_DE_UN_VALOR: 0 | 1;
    VALOR_CONSTANTE_2024: number;
}

export interface PriceClassificationResponse {
    rango_precio: "ALTO" | "BAJO" | "MEDIO" | "LUJO";
    probabilidades: {
        ALTO: number;
        BAJO: number;
        MEDIO: number;
        LUJO: number;
    };
}

export interface AnomalyDetectionResponse {
    anomalia_detectada: boolean;
    es_normal: boolean;
    score_anomalia: number;
    prediccion_raw: -1 | 1;
}

export interface PredictionFullResponse {
    clasificacion: PriceClassificationResponse;
    deteccion_anomalia: AnomalyDetectionResponse;
    predio_input: PredioInput;
}

export type RangoPrecio = "ALTO" | "BAJO" | "MEDIO" | "LUJO";
export type TipoPredioZona = "URBANO" | "RURAL";
export type EstadoFolio = "ACTIVO" | "INACTIVO";
