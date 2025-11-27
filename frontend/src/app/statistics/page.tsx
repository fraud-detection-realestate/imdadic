"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getDashboardData, DashboardData } from "@/app/actions/dashboard";

const StatisticsCharts = dynamic(
  () => import("@/components/statistics/StatisticsCharts").then((m) => m.StatisticsCharts),
  { ssr: false }
);

export default function StatisticsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to fetch statistics data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Cargando estadísticas...</div>
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
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Estadísticas avanzadas de anomalías
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Análisis estadístico basado en datos reales del tablero de riesgos.
          </p>
        </header>

        <StatisticsCharts
          temporal={data.tendenciaMensual}
          tipo={data.distribucionTipo}
          geografico={data.distribucionGeografica}
        />

        {/* Análisis descriptivo */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <article className="bg-white/90 rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Distribución por tipo de anomalía</h2>
            <p className="mb-2">
              Los datos muestran la distribución actual de los diferentes tipos de anomalías detectadas.
              Es importante monitorear las categorías con mayor incidencia para focalizar los esfuerzos de auditoría.
            </p>
          </article>

          <article className="bg-white/90 rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Evolución temporal</h2>
            <p className="mb-2">
              La serie de tiempo permite identificar tendencias y patrones estacionales en la detección de riesgos.
              Un incremento sostenido puede indicar cambios en la dinámica del mercado o mejoras en la capacidad de detección.
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 pb-6">
          <article className="bg-white/90 rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Comparativo geográfico</h2>
            <p className="mb-2">
              El análisis geográfico destaca las regiones con mayor volumen de alertas.
              Las áreas con alta concentración requieren una revisión detallada de los factores locales que pueden estar influyendo en el riesgo.
            </p>
          </article>

          <article className="bg-white/90 rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Conclusiones operativas</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Priorizar la revisión en los departamentos con mayor incidencia.</li>
              <li>
                Analizar los tipos de anomalía predominantes para ajustar los modelos de riesgo.
              </li>
              <li>
                Mantener un monitoreo continuo de la tendencia temporal para alertas tempranas.
              </li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
