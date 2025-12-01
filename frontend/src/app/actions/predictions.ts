"use server";

import {
    PredioInput,
    PriceClassificationResponse,
    AnomalyDetectionResponse,
    PredictionFullResponse,
} from "@/types/prediction";

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

/**
 * Classify the price range of a property using ML model
 */
export async function classifyPrice(
    data: PredioInput
): Promise<PriceClassificationResponse | { error: string }> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/predictions/classify-price`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            // No cache for predictions
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Classification error:", errorData);
            return {
                error: errorData.detail || `Error ${response.status}: ${response.statusText}`,
            };
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error calling classification API:", error);
        return {
            error: "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.",
        };
    }
}

/**
 * Detect anomalies in a property transaction using ML model
 */
export async function detectAnomaly(
    data: PredioInput
): Promise<AnomalyDetectionResponse | { error: string }> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/predictions/detect-anomaly`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Anomaly detection error:", errorData);
            return {
                error: errorData.detail || `Error ${response.status}: ${response.statusText}`,
            };
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error calling anomaly detection API:", error);
        return {
            error: "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.",
        };
    }
}

/**
 * Perform full prediction: price classification + anomaly detection
 */
export async function fullPrediction(
    data: PredioInput
): Promise<PredictionFullResponse | { error: string }> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/predictions/full`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Full prediction error:", errorData);
            return {
                error: errorData.detail || `Error ${response.status}: ${response.statusText}`,
            };
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error calling full prediction API:", error);
        return {
            error: "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.",
        };
    }
}
