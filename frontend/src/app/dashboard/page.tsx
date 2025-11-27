"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RecentAnomaliesTable } from "@/components/dashboard/RecentAnomaliesTable";
import type { AnomalyRecord, AnomalySeverity } from "@/types/anomaly";
import { getDashboardData, DashboardData } from "@/app/actions/dashboard";

const DashboardCharts = dynamic(
  () => import("@/components/dashboard/DashboardCharts").then((m) => m.DashboardCharts),
  { ssr: false }
);

const MOCK_CIUDADES = ["Todas", "Bogotá D.C.", "Medellín", "Cali", "Barranquilla", "Apartadó", "Andes"]; // Expanded list
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
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosEstado>({
    ciudad: "Todas",
    severidad: "todas",
    fechaDesde: "",
    fechaHasta: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const anomalíasFiltradas = useMemo(() => {
    if (!data) return [];
    return data.anomalías.filter((a) => {
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
  }, [filtros, data]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Cargando datos del tablero...</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-red-500">Error al cargar los datos.</div>
      </main>
    );
  }

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
              Monitoreo de anomalías en la dinámica inmobiliaria a nivel nacional.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 border border-emerald-100">
              • En línea
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-900 text-slate-50 px-3 py-1 font-medium">
              Datos Reales
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
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${active
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
            <p className="font-medium text-slate-700">Resumen IA</p>
            <p className="max-w-sm">
              Análisis basado en {data.kpis.totalAnomalias} registros procesados.
            </p>
          </div>
        </section>

        {/* KPIs principales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <KpiCard
            label="Propiedades monitoreadas"
            value={data.kpis.totalPropiedades}
            helper="Total registros procesados"
            trendLabel="Último mes:"
            trendValue="+3.2%"
            iconName="database"
          />
          <KpiCard
            label="Anomalías detectadas"
            value={data.kpis.totalAnomalias}
            helper="Registros marcados como anomalía"
            trendLabel="Variación mensual:"
            trendValue="+12.4%"
            iconName="chart"
            intent="warning"
          />
          <KpiCard
            label="Tasa de anomalías"
            value={data.kpis.tasaAnomalias}
            helper="Porcentaje sobre el total"
            trendLabel="Objetivo institucional:"
            trendValue="< 0.50%"
            iconName="target"
            intent="danger"
          />
          <KpiCard
            label="Tiempo medio de análisis"
            value={data.kpis.tiempoMedio}
            helper="Desde detección hasta cierre"
            trendLabel="Meta:"
            trendValue="≤ 2.0 días"
            iconName="clock"
            intent="success"
          />
        </section>

        {/* Gráficos + mapa resumen */}
        <DashboardCharts
          tendenciaMensual={data.tendenciaMensual}
          severidad={data.severidad}
          anomalías={data.anomalías}
          ciudadTop={data.ciudadTop}
        />

        {/* Tabla de anomalías recientes */}
        <section className="mb-10">
          <RecentAnomaliesTable anomalies={anomalíasFiltradas} />
        </section>
      </div>
    </main>
  );
}
