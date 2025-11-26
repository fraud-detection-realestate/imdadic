"use client";

import dynamic from "next/dynamic";

const StatisticsCharts = dynamic(
  () => import("@/components/statistics/StatisticsCharts").then((m) => m.StatisticsCharts),
  { ssr: false }
);

export default function StatisticsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Estadísticas avanzadas de anomalías
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Vista mock con gráficos interactivos. Aquí se integrarán consultas agregadas reales al backend (PostgreSQL,
            Elasticsearch, etc.).
          </p>
        </header>

        <StatisticsCharts />

        {/* Análisis descriptivo mock para acompañar los gráficos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <article className="bg-white/90 rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Distribución por tipo de anomalía (mock)</h2>
            <p className="mb-2">
              A partir de los datos de ejemplo se observa una mayor participación relativa de las anomalías por
              <span className="font-semibold"> sobrevaloración</span>, seguidas por
              <span className="font-semibold"> subvaloración</span> y
              <span className="font-semibold"> flipping</span>. Las
              <span className="font-semibold"> inconsistencias</span> representan una fracción menor, pero suelen estar
              asociadas a problemas de calidad de datos que impactan directamente los procesos catastrales.
            </p>
            <p>
              En el sistema real, este módulo debería permitir comparar la distribución por tipo entre periodos
              (mensual, trimestral, anual) y por territorio (departamento, municipio) para identificar cambios abruptos
              en los patrones de riesgo.
            </p>
          </article>

          <article className="bg-white/90 rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Evolución temporal (mock)</h2>
            <p className="mb-2">
              La serie de tiempo de ejemplo muestra un crecimiento sostenido en el número de anomalías detectadas a lo
              largo de los años. Parte de este incremento puede obedecer a una mejora en los modelos de detección, a la
              ampliación de la cobertura territorial o a cambios en la dinámica del mercado inmobiliario.
            </p>
            <p>
              En producción, es clave analizar no solo el volumen absoluto de anomalías, sino la
              <span className="font-semibold"> tasa de anomalías sobre el total de transacciones</span>, así como
              identificar periodos donde se presenten picos inusuales que puedan requerir alertas tempranas.
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 pb-6">
          <article className="bg-white/90 rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Comparativo geográfico (mock)</h2>
            <p className="mb-2">
              El comparativo geográfico de ejemplo sugiere una mayor concentración de anomalías en grandes áreas
              metropolitanas como <span className="font-semibold">Bogotá D.C.</span>,
              <span className="font-semibold"> Antioquia</span> y
              <span className="font-semibold"> Valle del Cauca</span>. Esto es consistente con su peso dentro del
              mercado inmobiliario nacional.
            </p>
            <p>
              En el sistema real, este análisis debería normalizarse por volumen de transacciones y por características
              socioeconómicas de cada territorio, permitiendo identificar no solo los mayores volúmenes, sino también
              territorios con <span className="font-semibold">tasas de riesgo atípicamente altas</span>.
            </p>
          </article>

          <article className="bg-white/90 rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Conclusiones operativas (mock)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Priorizar la revisión de anomalías por sobrevaloración en áreas de alta presión inmobiliaria.</li>
              <li>
                Monitorear variaciones abruptas en la tasa de anomalías por periodo como posible señal de cambios en
                patrones de fraude o errores de captura.
              </li>
              <li>
                Implementar tableros específicos por departamento/municipio para empoderar a los equipos territoriales
                del IGAC.
              </li>
              <li>
                Integrar estos indicadores con el módulo de mapa geoespacial para identificar hotspots y corredores de
                riesgo.
              </li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
