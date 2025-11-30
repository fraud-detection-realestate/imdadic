"use client";

import { useState } from "react";
import PropertyInputForm from "@/components/detection/PropertyInputForm";
import PredictionResults from "@/components/detection/PredictionResults";
import { fullPrediction } from "@/app/actions/predictions";
import { PredioInput, PredictionFullResponse } from "@/types/prediction";

export default function DetectionPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [prediction, setPrediction] = useState<PredictionFullResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: PredioInput) => {
        setIsLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const result = await fullPrediction(data);

            // Check if error
            if ("error" in result) {
                setError(result.error);
            } else {
                setPrediction(result);
            }
        } catch (err) {
            console.error("Error submitting prediction:", err);
            setError("Ocurrió un error inesperado. Por favor intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Detección de Anomalías Inmobiliarias
                            </h1>
                            <p className="text-slate-600 mt-1">
                                Análisis inteligente de transacciones con Machine Learning
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Info Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-xl">💡</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-blue-900 mb-2">
                                    ¿Cómo funciona el análisis?
                                </h3>
                                <p className="text-sm text-blue-800 leading-relaxed mb-3">
                                    Nuestro sistema utiliza modelos de Machine Learning entrenados con más de 34
                                    millones de transacciones inmobiliarias en Colombia para:
                                </p>
                                <ul className="text-sm text-blue-800 space-y-1 ml-5 list-disc">
                                    <li>
                                        <strong>Clasificar el rango de precio</strong> de la propiedad (Bajo, Medio,
                                        Alto, Lujo) basado en características y ubicación
                                    </li>
                                    <li>
                                        <strong>Detectar anomalías</strong> que puedan indicar posible fraude, lavado
                                        de activos o errores en el registro
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                            Datos de la Propiedad
                        </h2>
                        <PropertyInputForm onSubmit={handleSubmit} isLoading={isLoading} />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">❌</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-red-900 mb-2">Error en el Análisis</h3>
                                    <p className="text-sm text-red-800">{error}</p>
                                    <button
                                        onClick={() => setError(null)}
                                        className="mt-3 px-4 py-2 bg-red-100 text-red-900 rounded-lg font-medium hover:bg-red-200 transition-colors"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-lg">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Analizando Propiedad...
                            </h3>
                            <p className="text-slate-600">
                                Procesando datos con modelos de Machine Learning
                            </p>
                        </div>
                    )}

                    {/* Results */}
                    {prediction && !isLoading && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                Resultados del Análisis
                            </h2>
                            <PredictionResults prediction={prediction} />
                        </div>
                    )}

                    {/* Empty State */}
                    {!prediction && !isLoading && !error && (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">📊</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Completa el formulario para comenzar
                            </h3>
                            <p className="text-slate-600">
                                Los resultados del análisis aparecerán aquí una vez envíes los datos
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Info */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <h4 className="font-bold mb-2">Precisión Alta</h4>
                                <p className="text-sm text-blue-100">
                                    Modelos entrenados con +34M de registros históricos del IGAC
                                </p>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h4 className="font-bold mb-2">Análisis Rápido</h4>
                                <p className="text-sm text-blue-100">
                                    Resultados en segundos gracias a tecnología de ML optimizada
                                </p>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <h4 className="font-bold mb-2">Datos Seguros</h4>
                                <p className="text-sm text-blue-100">
                                    Los datos ingresados no se almacenan y son procesados de forma segura
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
