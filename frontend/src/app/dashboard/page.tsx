"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Icon } from "@/components/shared/Icon";
import { RecentAnomaliesTable } from "@/components/dashboard/RecentAnomaliesTable";
import type { AnomalyRecord, AnomalySeverity } from "@/types/anomaly";
import { getDashboardData, DashboardData } from "@/app/actions/dashboard";
import { FloatingParticles } from "@/components/shared/FloatingParticles";

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
    <main className="min-h-screen bg-gradient-to-br from-[var(--igac-blue-50)] via-white to-[var(--gray-50)] relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-[var(--igac-blue-500)] opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-20 w-96 h-96 bg-[var(--igac-blue-400)] opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-[var(--igac-blue-700)] opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        <FloatingParticles />
      </div>

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
                  <Icon name="chart" className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Dashboard Ejecutivo IMDADIC
                </h1>
              </div>
              <p className="text-blue-100 text-base max-w-2xl font-medium">
                Monitoreo en tiempo real de anomalías en la dinámica inmobiliaria a nivel nacional
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-md px-4 py-2.5 font-semibold text-white border border-white/30 shadow-lg">
                <span className="w-2.5 h-2.5 bg-[var(--success-400)] rounded-full animate-pulse shadow-lg"></span>
                Sistema En Línea
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white text-[var(--igac-blue-900)] px-4 py-2.5 font-bold shadow-lg">
                <Icon name="database" className="w-4 h-4" />
                Datos Reales
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-8">

        {/* Filtros con diseño premium */}
        <section className="mb-8 rounded-2xl border-2 border-[var(--igac-blue-200)] bg-gradient-to-br from-white to-[var(--igac-blue-50)] shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="filter" className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[var(--gray-900)]">Filtros de Búsqueda</h2>
            </div>
            <button
              onClick={() => setFiltros({ ciudad: "Todas", severidad: "todas", fechaDesde: "", fechaHasta: "" })}
              className="text-sm font-semibold text-[var(--igac-blue-700)] hover:text-[var(--igac-blue-900)] hover:underline transition-all flex items-center gap-2"
            >
              <Icon name="refresh" className="w-4 h-4" />
              Limpiar filtros
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">Ciudad</label>
              <select
                className="w-full rounded-lg border border-[var(--border-color)] bg-white px-3 py-2.5 text-sm text-[var(--gray-900)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--igac-blue-600)] focus:border-[var(--igac-blue-600)] transition-all"
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
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">Severidad</label>
              <div className="flex flex-wrap gap-2">
                {MOCK_SEVERIDADES.map((s) => {
                  const active = filtros.severidad === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setFiltros((f) => ({ ...f, severidad: s.value }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${active
                        ? "bg-gradient-to-br from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] text-white border-[var(--igac-blue-700)] shadow-sm"
                        : "bg-white text-[var(--gray-700)] border-[var(--border-color)] hover:bg-[var(--gray-50)] hover:border-[var(--border-color-hover)]"
                        }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">Desde</label>
              <input
                type="date"
                className="w-full rounded-lg border border-[var(--border-color)] bg-white px-3 py-2.5 text-sm text-[var(--gray-900)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--igac-blue-600)] focus:border-[var(--igac-blue-600)] transition-all"
                value={filtros.fechaDesde}
                onChange={(e) => setFiltros((f) => ({ ...f, fechaDesde: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">Hasta</label>
              <input
                type="date"
                className="w-full rounded-lg border border-[var(--border-color)] bg-white px-3 py-2.5 text-sm text-[var(--gray-900)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--igac-blue-600)] focus:border-[var(--igac-blue-600)] transition-all"
                value={filtros.fechaHasta}
                onChange={(e) => setFiltros((f) => ({ ...f, fechaHasta: e.target.value }))}
              />
            </div>
          </div>
          <div className="pt-4 border-t border-[var(--border-color)] flex items-center gap-2 text-sm">
            <span className="font-medium text-[var(--gray-700)]">Resumen:</span>
            <span className="text-[var(--gray-600)]">
              Mostrando {anomalíasFiltradas.length} de {data.kpis.totalAnomalias} anomalías detectadas
            </span>
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
