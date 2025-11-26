"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/shared/Card";

export default function AnomalyDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "A-XXXX";

  // Datos mock mínimos; esta vista espera datos reales desde backend
  const mockProperty = {
    ubicacion: "Bogotá D.C., Colombia",
    area: 95,
    valor: 980000000,
    tipo: "Apartamento",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Anomalía {id}</h1>
            <p className="mt-1 text-sm text-slate-600">
              Vista de detalle mock. Aquí se conectarán los datos reales de la anomalía, explicación del modelo y
              comparativos geoespaciales.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ← Volver al Dashboard
          </Link>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card
            title="Datos de la propiedad"
            subtitle="Información básica consolidada"
            className="md:col-span-2"
          >
            <dl className="grid grid-cols-2 gap-3 text-xs md:text-sm text-slate-700">
              <div>
                <dt className="font-medium">Ubicación</dt>
                <dd>{mockProperty.ubicacion}</dd>
              </div>
              <div>
                <dt className="font-medium">Área construida</dt>
                <dd>{mockProperty.area} m²</dd>
              </div>
              <div>
                <dt className="font-medium">Valor transacción</dt>
                <dd>
                  {mockProperty.valor.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  })}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Tipo de inmueble</dt>
                <dd>{mockProperty.tipo}</dd>
              </div>
            </dl>
          </Card>

          <Card
            title="Estado de revisión"
            subtitle="Flujo operativo de la anomalía"
          >
            <ul className="space-y-1 text-xs md:text-sm text-slate-700">
              <li><span className="font-medium">Severidad:</span> Alta (mock)</li>
              <li><span className="font-medium">Estado:</span> Pendiente de revisión</li>
              <li><span className="font-medium">Asignado a:</span> Analista mock</li>
            </ul>
          </Card>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card
            title="Por qué fue detectada (mock)"
            subtitle="Resumen de factores de riesgo identificados por el modelo"
            className="md:col-span-2"
          >
            <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm text-slate-700">
              <li>Valor de transacción 38% por encima del rango esperado para el sector.</li>
              <li>Historial de transacciones frecuentes en un periodo corto (posible flipping).</li>
              <li>Inconsistencias entre área reportada y área catastral promedio.</li>
            </ul>
          </Card>

          <Card
            title="Acciones disponibles (mock)"
            subtitle="Estas acciones se conectarán con el backend operativo"
          >
            <div className="flex flex-col gap-2 text-xs">
              <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-white font-medium hover:bg-emerald-500">
                Marcar como revisada
              </button>
              <button className="rounded-lg bg-amber-600 px-3 py-1.5 text-white font-medium hover:bg-amber-500">
                Escalar a supervisor
              </button>
              <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-white font-medium hover:bg-slate-800">
                Exportar reporte
              </button>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
