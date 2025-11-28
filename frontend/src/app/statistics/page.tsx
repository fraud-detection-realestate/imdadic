"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getDashboardData, DashboardData } from "@/app/actions/dashboard";

const StatisticsCharts = dynamic(
  () => import("@/components/statistics/StatisticsCharts").then((m) => m.StatisticsCharts),
  { ssr: false }
);

const FraudAlertsCarousel = dynamic(
  () => import("@/components/dashboard/FraudAlertsCarousel"),
  { ssr: false }
);

import { FloatingParticles } from "@/components/shared/FloatingParticles";

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
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--igac-blue-700)] border-r-transparent mb-4"></div>
          <p className="text-[var(--gray-600)] font-medium">Cargando estadísticas...</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[var(--danger-600)] font-semibold text-lg mb-2">Error al cargar los datos</div>
          <p className="text-[var(--gray-600)] text-sm">Por favor, intenta recargar la página</p>
        </div>
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

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-8">
        {/* Header premium con gradiente IGAC */}
        <header className="bg-gradient-to-r from-[var(--igac-blue-700)] via-[var(--igac-blue-600)] to-[var(--igac-blue-700)] rounded-2xl p-8 shadow-2xl border border-[var(--igac-blue-800)] relative overflow-hidden">
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Estadísticas
                </h1>
              </div>
              <p className="text-blue-100 text-base max-w-2xl font-medium">
                Análisis estadístico detallado basado en datos reales del sistema de monitoreo
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-md px-4 py-2.5 font-semibold text-white border border-white/30 shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Análisis Estadístico
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white text-[var(--igac-blue-900)] px-4 py-2.5 font-bold shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Datos Reales
              </span>
            </div>
          </div>
        </header>

        {/* Carrusel de Alertas de Fraude */}
        <section>
          <FraudAlertsCarousel />
        </section>

        <StatisticsCharts
          temporal={data.tendenciaMensual}
          tipo={data.distribucionTipo}
          geografico={data.distribucionGeografica}
        />

        {/* Análisis descriptivo con diseño premium */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="bg-white rounded-2xl border-2 border-[var(--igac-blue-100)] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[var(--igac-blue-700)] to-[var(--igac-blue-500)] group-hover:w-3 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[var(--gray-900)]">Distribución por tipo de anomalía</h2>
              </div>
              <p className="text-[var(--gray-700)] leading-relaxed text-base">
                Los datos muestran la distribución actual de los diferentes tipos de anomalías detectadas.
                Es importante monitorear las categorías con mayor incidencia para focalizar los esfuerzos de auditoría.
              </p>
            </div>
          </article>

          <article className="bg-white rounded-2xl border-2 border-[var(--igac-blue-100)] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[var(--igac-blue-500)] to-[var(--igac-blue-400)] group-hover:w-3 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--igac-blue-600)] to-[var(--igac-blue-700)] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[var(--gray-900)]">Evolución temporal</h2>
              </div>
              <p className="text-[var(--gray-700)] leading-relaxed text-base">
                La serie de tiempo permite identificar tendencias y patrones estacionales en la detección de riesgos.
                Un incremento sostenido puede indicar cambios en la dinámica del mercado o mejoras en la capacidad de detección.
              </p>
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <article className="bg-white rounded-2xl border-2 border-[var(--igac-blue-100)] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[var(--igac-blue-600)] to-[var(--igac-blue-500)] group-hover:w-3 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[var(--gray-900)]">Comparativo geográfico</h2>
              </div>
              <p className="text-[var(--gray-700)] leading-relaxed text-base">
                El análisis geográfico destaca las regiones con mayor volumen de alertas.
                Las áreas con alta concentración requieren una revisión detallada de los factores locales que pueden estar influyendo en el riesgo.
              </p>
            </div>
          </article>

          <article className="bg-white rounded-2xl border-2 border-[var(--igac-blue-100)] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[var(--igac-blue-500)] to-[var(--igac-blue-400)] group-hover:w-3 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--igac-blue-600)] to-[var(--igac-blue-700)] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[var(--gray-900)]">Conclusiones operativas</h2>
              </div>
              <ul className="list-none space-y-3 text-[var(--gray-700)] text-base">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[var(--igac-blue-600)] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Priorizar la revisión en los departamentos con mayor incidencia.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[var(--igac-blue-600)] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Analizar los tipos de anomalía predominantes para ajustar los modelos de riesgo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[var(--igac-blue-600)] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Mantener un monitoreo continuo de la tendencia temporal para alertas tempranas.</span>
                </li>
              </ul>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
