"use client";

import { useState } from "react";
import PropertyInputForm from "@/components/detection/PropertyInputForm";
import PredictionResults from "@/components/detection/PredictionResults";
import { fullPrediction } from "@/app/actions/predictions";
import { PredioInput, PredictionFullResponse } from "@/types/prediction";
import { Icon } from "@/components/shared/Icon";

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
            {/* Header Premium Full Width */}
            <header className="bg-gradient-to-r from-[var(--igac-blue-700)] via-[var(--igac-blue-600)] to-[var(--igac-blue-700)] shadow-2xl border-b border-[var(--igac-blue-800)] relative overflow-hidden mb-8">
                {/* Patrón de fondo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="container mx-auto px-4 py-8 relative z-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <Icon name="search" className="w-7 h-7 text-white" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                    Detección de Anomalías Inmobiliarias
                                </h1>
                            </div>
                            <p className="text-blue-100 text-base max-w-2xl font-medium">
                                Análisis inteligente de transacciones con Machine Learning
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-md px-4 py-2.5 font-semibold text-white border border-white/30 shadow-lg">
                                <span className="w-2.5 h-2.5 bg-[var(--success-400)] rounded-full animate-pulse shadow-lg"></span>
                                Sistema En Línea
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-xl bg-white text-[var(--igac-blue-900)] px-4 py-2.5 font-bold shadow-lg">
                                <Icon name="robot" className="w-4 h-4" />
                                Modelo ML Activo
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Info Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Icon name="lightbulb" className="w-6 h-6 text-white" />
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
                                    <Icon name="xmark" className="w-6 h-6 text-white" />
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
                                <Icon name="chart" className="w-10 h-10 text-slate-400" />
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
                                    <Icon name="target" className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="font-bold mb-2">Precisión Alta</h4>
                                <p className="text-sm text-blue-100">
                                    Modelos entrenados con +34M de registros históricos del IGAC
                                </p>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                                    <Icon name="bolt" className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="font-bold mb-2">Análisis Rápido</h4>
                                <p className="text-sm text-blue-100">
                                    Resultados en segundos gracias a tecnología de ML optimizada
                                </p>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                                    <Icon name="lock" className="w-7 h-7 text-white" />
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
