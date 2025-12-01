"use client";

import { PredictionFullResponse } from "@/types/prediction";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PredictionResultsProps {
    prediction: PredictionFullResponse;
}

const PRICE_RANGE_COLORS: { [key: string]: string } = {
    LUJO: "#8b5cf6",
    ALTO: "#3b82f6",
    MEDIO: "#10b981",
    BAJO: "#f59e0b",
};

const PRICE_RANGE_DESCRIPTIONS: { [key: string]: string } = {
    LUJO: "Propiedad de alto valor, segmento premium",
    ALTO: "Propiedad de valor alto, por encima del promedio",
    MEDIO: "Propiedad de valor medio, segmento estándar",
    BAJO: "Propiedad de valor económico",
};

export default function PredictionResults({ prediction }: PredictionResultsProps) {
    const { clasificacion, deteccion_anomalia } = prediction;

    // Prepare data for bar chart
    const probabilityData = Object.entries(clasificacion.probabilidades).map(
        ([rango, prob]) => ({
            rango,
            probabilidad: (prob * 100).toFixed(1),
            probValue: prob,
        })
    );

    // Sort by probability descending
    probabilityData.sort((a, b) => b.probValue - a.probValue);

    // Anomaly severity level based on score
    const getAnomalyLevel = (score: number) => {
        if (score < -0.1) return { level: "Crítica", color: "red", bgColor: "bg-red-100", textColor: "text-red-900" };
        if (score < -0.05) return { level: "Alta", color: "orange", bgColor: "bg-orange-100", textColor: "text-orange-900" };
        if (score < -0.01) return { level: "Media", color: "yellow", bgColor: "bg-yellow-100", textColor: "text-yellow-900" };
        return { level: "Baja", color: "green", bgColor: "bg-green-100", textColor: "text-green-900" };
    };

    const anomalyLevel = getAnomalyLevel(deteccion_anomalia.score_anomalia);

    return (
        <div className="space-y-6">
            {/* Price Classification Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-2xl">💰</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Clasificación de Precio</h3>
                        <p className="text-sm text-slate-600">Análisis del rango de valor de la propiedad</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Predicted Range */}
                    <div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-slate-600 mb-2">Rango Predicho</p>
                            <div
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-2xl shadow-lg"
                                style={{ backgroundColor: PRICE_RANGE_COLORS[clasificacion.rango_precio] }}
                            >
                                {clasificacion.rango_precio}
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {PRICE_RANGE_DESCRIPTIONS[clasificacion.rango_precio]}
                        </p>

                        {/* Value Display */}
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-xs font-medium text-slate-600 mb-1">Valor Analizado</p>
                            <p className="text-2xl font-bold text-slate-900">
                                ${(prediction.predio_input.VALOR_CONSTANTE_2024 / 1000000).toFixed(1)}M
                            </p>
                            <p className="text-xs text-slate-500">COP (pesos colombianos)</p>
                        </div>
                    </div>

                    {/* Probability Chart */}
                    <div>
                        <p className="text-sm font-medium text-slate-600 mb-3">Distribución de Probabilidades</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={probabilityData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis type="category" dataKey="rango" width={60} />
                                <Tooltip
                                    formatter={(value) => `${value}%`}
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Bar dataKey="probabilidad" radius={[0, 8, 8, 0]}>
                                    {probabilityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PRICE_RANGE_COLORS[entry.rango]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>

                        {/* Probability Legend */}
                        <div className="mt-3 space-y-1">
                            {probabilityData.map((item) => (
                                <div key={item.rango} className="flex justify-between text-sm">
                                    <span className="text-slate-600">{item.rango}:</span>
                                    <span className="font-semibold">{item.probabilidad}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Anomaly Detection Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${deteccion_anomalia.anomalia_detectada
                                ? "bg-gradient-to-br from-red-600 to-red-500"
                                : "bg-gradient-to-br from-green-600 to-green-500"
                            }`}
                    >
                        <span className="text-2xl">
                            {deteccion_anomalia.anomalia_detectada ? "⚠️" : "✅"}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Detección de Anomalías</h3>
                        <p className="text-sm text-slate-600">Análisis de patrones sospechosos en la transacción</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Status Badge */}
                    <div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-slate-600 mb-3">Estado de la Transacción</p>
                            {deteccion_anomalia.anomalia_detectada ? (
                                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-3xl">🔴</span>
                                        <span className="text-xl font-bold text-red-900">ANOMALÍA DETECTADA</span>
                                    </div>
                                    <p className="text-sm text-red-700 leading-relaxed">
                                        Se han identificado patrones sospechosos en esta transacción. Se recomienda
                                        una revisión detallada por parte de autoridades competentes.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-3xl">🟢</span>
                                        <span className="text-xl font-bold text-green-900">TRANSACCIÓN NORMAL</span>
                                    </div>
                                    <p className="text-sm text-green-700 leading-relaxed">
                                        La transacción no presenta patrones anómalos según el modelo de detección.
                                        Los valores se encuentran dentro de los rangos esperados.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Anomaly Level */}
                        <div className={`p-3 rounded-lg ${anomalyLevel.bgColor} border border-${anomalyLevel.color}-300`}>
                            <p className="text-xs font-medium text-slate-600 mb-1">Nivel de Severidad</p>
                            <p className={`text-lg font-bold ${anomalyLevel.textColor}`}>
                                {anomalyLevel.level}
                            </p>
                        </div>
                    </div>

                    {/* Score Gauge */}
                    <div>
                        <p className="text-sm font-medium text-slate-600 mb-3">Score de Anomalía</p>

                        {/* Score Display */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
                            <div className="text-5xl font-bold text-slate-900 mb-2">
                                {deteccion_anomalia.score_anomalia.toFixed(4)}
                            </div>
                            <p className="text-xs text-slate-500 mb-4">
                                Valores más negativos indican mayor probabilidad de anomalía
                            </p>

                            {/* Visual Gauge */}
                            <div className="relative h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
                                <div
                                    className="absolute top-0 bottom-0 w-1 bg-slate-900"
                                    style={{
                                        left: `${Math.max(0, Math.min(100, (deteccion_anomalia.score_anomalia + 0.2) * 250))}%`,
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>Alta Anomalía</span>
                                <span>Normal</span>
                            </div>
                        </div>

                        {/* Technical Details */}
                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                                <span className="text-slate-600">Predicción Raw:</span>
                                <span className="font-semibold">
                                    {deteccion_anomalia.prediccion_raw === -1 ? "Anomalía (-1)" : "Normal (1)"}
                                </span>
                            </div>
                            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                                <span className="text-slate-600">Es Normal:</span>
                                <span className="font-semibold">
                                    {deteccion_anomalia.es_normal ? "Sí ✓" : "No ✗"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
                <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2">
                    📊 Ver Detalles Completos
                </button>
                <button className="px-6 py-3 bg-indigo-100 text-indigo-900 rounded-xl font-semibold hover:bg-indigo-200 transition-colors flex items-center gap-2">
                    📄 Generar Reporte PDF
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                    🔍 Nuevo Análisis
                </button>
            </div>
        </div>
    );
}
