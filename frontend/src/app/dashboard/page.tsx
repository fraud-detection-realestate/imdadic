"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RecentAnomaliesTable } from "@/components/dashboard/RecentAnomaliesTable";
import type { AnomalyRecord, AnomalySeverity } from "@/types/anomaly";

const DashboardCharts = dynamic(
  () => import("@/components/dashboard/DashboardCharts").then((m) => m.DashboardCharts),
  { ssr: false }
);

// --- Datos MOCK: reemplazar por integraciones reales al backend ---
const MOCK_KPIS = {
  totalPropiedades: "2.1M+",
  totalAnomalias: "18.4K",
  tasaAnomalias: "0.87%",
  tiempoMedio: "3.2 días",
};

const MOCK_TENDENCIA_MENSUAL = [
  { mes: "Ene", anomalías: 1200 },
  { mes: "Feb", anomalías: 1350 },
  { mes: "Mar", anomalías: 1420 },
  { mes: "Abr", anomalías: 1600 },
  { mes: "May", anomalías: 1750 },
  { mes: "Jun", anomalías: 1820 },
];

const MOCK_SEVERIDAD = [
  { nombre: "Alta", valor: 620 },
  { nombre: "Media", valor: 980 },
  { nombre: "Baja", valor: 240 },
];

const MOCK_ANOMALIAS: AnomalyRecord[] = [
  {
    id: "A-2025-0001",
    ciudad: "Bogotá D.C.",
    municipio: "Bogotá D.C.",
    departamento: "Cundinamarca",
    severidad: "alta",
    tipo: "sobrevaloracion",
    fecha: "2025-11-20",
    valorTransaccion: 980000000,
    areaConstruida: 95,
    estadoRevision: "pendiente",
  },
  {
    id: "A-2025-0002",
    ciudad: "Medellín",
    municipio: "Medellín",
    departamento: "Antioquia",
    severidad: "media",
    tipo: "flipping",
    fecha: "2025-11-19",
    valorTransaccion: 650000000,
    areaConstruida: 80,
    estadoRevision: "en_revision",
  },
  {
    id: "A-2025-0003",
    ciudad: "Cali",
    municipio: "Santiago de Cali",
    departamento: "Valle del Cauca",
    severidad: "alta",
    tipo: "inconsistencia",
    fecha: "2025-11-18",
    valorTransaccion: 420000000,
    areaConstruida: 70,
    estadoRevision: "pendiente",
  },
  {
    id: "A-2025-0004",
    ciudad: "Barranquilla",
    municipio: "Barranquilla",
    departamento: "Atlántico",
    severidad: "baja",
    tipo: "subvaloracion",
    fecha: "2025-11-18",
    valorTransaccion: 310000000,
    areaConstruida: 65,
    estadoRevision: "cerrada",
  },
  {
    id: "A-2025-0005",
    ciudad: "Bogotá D.C.",
    municipio: "Bogotá D.C.",
    departamento: "Cundinamarca",
    severidad: "media",
    tipo: "flipping",
    fecha: "2025-11-17",
    valorTransaccion: 780000000,
    areaConstruida: 90,
    estadoRevision: "en_revision",
  },
];

const MOCK_CIUDADES = ["Todas", "Bogotá D.C.", "Medellín", "Cali", "Barranquilla"];
const MOCK_SEVERIDADES: Array<{ label: string; value: AnomalySeverity | "todas" }> = [
  { label: "Todas", value: "todas" },
  { label: "Alta", value: "alta" },
  { label: "Media", value: "media" },
  { label: "Baja", value: "baja" },
];

interface FiltrosEstado {
  ciudad: string;
  severidad: AnomalySeverity | "todas";
  fechaDesde: string;
  fechaHasta: string;
}

export default function DashboardPage() {
  const [filtros, setFiltros] = useState<FiltrosEstado>({
    ciudad: "Todas",
    severidad: "todas",
    fechaDesde: "",
    fechaHasta: "",
  });

  const anomalíasFiltradas = useMemo(() => {
    return MOCK_ANOMALIAS.filter((a) => {
      if (filtros.ciudad !== "Todas" && a.ciudad !== filtros.ciudad) return false;
      if (filtros.severidad !== "todas" && a.severidad !== filtros.severidad) return false;

      const fecha = new Date(a.fecha).getTime();
      if (filtros.fechaDesde) {
        const desde = new Date(filtros.fechaDesde).getTime();
        if (fecha < desde) return false;
      }
      if (filtros.fechaHasta) {
        const hasta = new Date(filtros.fechaHasta).getTime();
        if (fecha > hasta) return false;
      }

      return true;
    });
  }, [filtros]);

  const ciudadTop = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of MOCK_ANOMALIAS) {
      counts.set(a.ciudad, (counts.get(a.ciudad) ?? 0) + 1);
    }
    let maxCiudad = "Bogotá D.C.";
    let max = 0;
    counts.forEach((value, key) => {
      if (value > max) {
        max = value;
        maxCiudad = key;
      }
    });
    return maxCiudad;
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Header ejecutivo */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard ejecutivo IMDADIC
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Monitoreo de anomalías en la dinámica inmobiliaria a nivel nacional. Los datos mostrados son
              representativos (mock) y están listos para conectarse al backend.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 border border-emerald-100">
              • En línea (mock)
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-900 text-slate-50 px-3 py-1 font-medium">
              2015–2025 · 34M+ registros
            </span>
          </div>
        </header>

        {/* Filtros rápidos */}
        <section className="mb-6 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full md:w-auto">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Ciudad</label>
              <select
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filtros.ciudad}
                onChange={(e) => setFiltros((f) => ({ ...f, ciudad: e.target.value }))}
              >
                {MOCK_CIUDADES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Severidad</label>
              <div className="flex flex-wrap gap-2">
                {MOCK_SEVERIDADES.map((s) => {
                  const active = filtros.severidad === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setFiltros((f) => ({ ...f, severidad: s.value }))}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                        active
                          ? "bg-blue-900 text-white border-blue-900 shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Desde</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filtros.fechaDesde}
                  onChange={(e) => setFiltros((f) => ({ ...f, fechaDesde: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Hasta</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filtros.fechaHasta}
                  onChange={(e) => setFiltros((f) => ({ ...f, fechaHasta: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 text-xs text-slate-500 md:items-end">
            <p className="font-medium text-slate-700">Resumen IA (mock)</p>
            <p className="max-w-sm">
              En los últimos 30 días se observa un incremento sostenido de anomalías tipo
              <span className="font-semibold text-slate-900"> sobrevaloración </span>
              en ciudades capitales, con mayor concentración en
              <span className="font-semibold text-slate-900"> Bogotá D.C. </span> y
              <span className="font-semibold text-slate-900"> Medellín</span>.
            </p>
          </div>
        </section>

        {/* KPIs principales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <KpiCard
            label="Propiedades monitoreadas"
            value={MOCK_KPIS.totalPropiedades}
            helper="Cobertura nacional 2015–2025"
            trendLabel="Último mes:"
            trendValue="+3.2%"
            iconName="database"
          />
          <KpiCard
            label="Anomalías detectadas"
            value={MOCK_KPIS.totalAnomalias}
            helper="Suma histórica de registros marcados"
            trendLabel="Variación mensual:"
            trendValue="+12.4%"
            iconName="chart"
            intent="warning"
          />
          <KpiCard
            label="Tasa de anomalías"
            value={MOCK_KPIS.tasaAnomalias}
            helper="Porcentaje sobre el total de transacciones"
            trendLabel="Objetivo institucional:"
            trendValue="< 0.50%"
            iconName="target"
            intent="danger"
          />
          <KpiCard
            label="Tiempo medio de análisis"
            value={MOCK_KPIS.tiempoMedio}
            helper="Desde detección hasta cierre de revisión"
            trendLabel="Meta:"
            trendValue="≤ 2.0 días"
            iconName="clock"
            intent="success"
          />
        </section>

        {/* Gráficos + mapa resumen (cargados dinámicamente para evitar problemas de chunks) */}
        <DashboardCharts
          tendenciaMensual={MOCK_TENDENCIA_MENSUAL}
          severidad={MOCK_SEVERIDAD}
          anomalías={MOCK_ANOMALIAS}
          ciudadTop={ciudadTop}
        />

        {/* Tabla de anomalías recientes */}
        <section className="mb-10">
          <RecentAnomaliesTable anomalies={anomalíasFiltradas} />
        </section>
      </div>
    </main>
  );
}
