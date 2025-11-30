"use client";

import { useState } from "react";
import { PredioInput } from "@/types/prediction";
import {
    DEPARTAMENTOS_COLOMBIA,
    MUNICIPIOS_PRINCIPALES,
    TIPO_PREDIO_OPTIONS,
    CATEGORIA_RURALIDAD_OPTIONS,
    ESTADO_FOLIO_OPTIONS,
    COD_NATUJUR_OPTIONS,
    ORIP_OPTIONS,
    DEFAULT_PREDIO_INPUT,
    EXAMPLE_SCENARIOS,
} from "@/lib/constants/formDefaults";

interface PropertyInputFormProps {
    onSubmit: (data: PredioInput) => void;
    isLoading?: boolean;
}

export default function PropertyInputForm({
    onSubmit,
    isLoading = false,
}: PropertyInputFormProps) {
    const [formData, setFormData] = useState<PredioInput>(DEFAULT_PREDIO_INPUT);
    const [availableMunicipios, setAvailableMunicipios] = useState<string[]>(
        MUNICIPIOS_PRINCIPALES[DEFAULT_PREDIO_INPUT.DEPARTAMENTO] || []
    );

    const handleChange = (
        field: keyof PredioInput,
        value: string | number
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Update municipios when department changes
        if (field === "DEPARTAMENTO") {
            const municipios = MUNICIPIOS_PRINCIPALES[value as string] || [];
            setAvailableMunicipios(municipios);
            // Reset municipio if not in new list
            if (!municipios.includes(formData.MUNICIPIO)) {
                setFormData((prev) => ({ ...prev, MUNICIPIO: municipios[0] || "" }));
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const loadScenario = (scenarioKey: string) => {
        const scenario = EXAMPLE_SCENARIOS[scenarioKey];
        if (scenario) {
            setFormData(scenario);
            setAvailableMunicipios(MUNICIPIOS_PRINCIPALES[scenario.DEPARTAMENTO] || []);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Scenarios Preset */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">
                    💡 Escenarios de Ejemplo
                </h3>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => loadScenario("lujo_bogota")}
                        className="px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors"
                    >
                        Lujo - Bogotá
                    </button>
                    <button
                        type="button"
                        onClick={() => loadScenario("economico_pereira")}
                        className="px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors"
                    >
                        Económico - Pereira
                    </button>
                    <button
                        type="button"
                        onClick={() => loadScenario("rural_santander")}
                        className="px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors"
                    >
                        Rural - Santander
                    </button>
                </div>
            </div>

            {/* Location Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    📍 Ubicación
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Departamento <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.DEPARTAMENTO}
                            onChange={(e) => handleChange("DEPARTAMENTO", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {DEPARTAMENTOS_COLOMBIA.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Municipio <span className="text-red-500">*</span>
                        </label>
                        {availableMunicipios.length > 0 ? (
                            <select
                                value={formData.MUNICIPIO}
                                onChange={(e) => handleChange("MUNICIPIO", e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                {availableMunicipios.map((mun) => (
                                    <option key={mun} value={mun}>
                                        {mun}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={formData.MUNICIPIO}
                                onChange={(e) => handleChange("MUNICIPIO", e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ingrese el municipio"
                                required
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Property Characteristics */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    🏠 Características del Predio
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Tipo de Zona <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.TIPO_PREDIO_ZONA}
                            onChange={(e) => handleChange("TIPO_PREDIO_ZONA", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {TIPO_PREDIO_OPTIONS.map((tipo) => (
                                <option key={tipo} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Categoría de Ruralidad <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.CATEGORIA_RURALIDAD}
                            onChange={(e) => handleChange("CATEGORIA_RURALIDAD", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {CATEGORIA_RURALIDAD_OPTIONS.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            ORIP (Oficina de Registro) <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.ORIP}
                            onChange={(e) => handleChange("ORIP", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {ORIP_OPTIONS.map((orip) => (
                                <option key={orip.value} value={orip.value}>
                                    {orip.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Estado del Folio <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.ESTADO_FOLIO}
                            onChange={(e) => handleChange("ESTADO_FOLIO", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {ESTADO_FOLIO_OPTIONS.map((estado) => (
                                <option key={estado} value={estado}>
                                    {estado}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    📄 Detalles de la Transacción
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Código Naturaleza Jurídica <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.COD_NATUJUR}
                            onChange={(e) => handleChange("COD_NATUJUR", parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {COD_NATUJUR_OPTIONS.map((cod) => (
                                <option key={cod.value} value={cod.value}>
                                    {cod.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Año de Radicación <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.YEAR_RADICA}
                            onChange={(e) => handleChange("YEAR_RADICA", parseInt(e.target.value))}
                            min={2015}
                            max={2025}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Número de Anotaciones <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.NUM_ANOTACION}
                            onChange={(e) => handleChange("NUM_ANOTACION", parseInt(e.target.value))}
                            min={0}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Dinámica Inmobiliaria <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.Dinámica_Inmobiliaria}
                            onChange={(e) => handleChange("Dinámica_Inmobiliaria", parseInt(e.target.value))}
                            min={0}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            COUNT_A <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.COUNT_A}
                            onChange={(e) => handleChange("COUNT_A", parseInt(e.target.value))}
                            min={0}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            COUNT_DE <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.COUNT_DE}
                            onChange={(e) => handleChange("COUNT_DE", parseInt(e.target.value))}
                            min={0}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Predios Nuevos
                        </label>
                        <input
                            type="number"
                            value={formData.PREDIOS_NUEVOS}
                            onChange={(e) => handleChange("PREDIOS_NUEVOS", parseInt(e.target.value))}
                            min={0}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            ¿Tiene más de un valor?
                        </label>
                        <select
                            value={formData.TIENE_MAS_DE_UN_VALOR}
                            onChange={(e) => handleChange("TIENE_MAS_DE_UN_VALOR", parseInt(e.target.value) as 0 | 1)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value={0}>No</option>
                            <option value={1}>Sí</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Valor Constante 2024 (COP) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.VALOR_CONSTANTE_2024}
                            onChange={(e) => handleChange("VALOR_CONSTANTE_2024", parseFloat(e.target.value))}
                            min={0}
                            step={1000000}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Valor actual: ${(formData.VALOR_CONSTANTE_2024 / 1000000).toFixed(1)}M COP
                        </p>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => setFormData(DEFAULT_PREDIO_INPUT)}
                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                    disabled={isLoading}
                >
                    Limpiar Formulario
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Analizando...
                        </>
                    ) : (
                        <>
                            🔍 Analizar Propiedad
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
