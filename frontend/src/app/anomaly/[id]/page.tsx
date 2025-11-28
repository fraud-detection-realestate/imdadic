"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/shared/Card";
import { FloatingParticles } from "@/components/shared/FloatingParticles";

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

  // Función para exportar PDF
  const handleExportPDF = async () => {
    // Importación dinámica de jsPDF para evitar problemas con SSR
    const { jsPDF } = await import('jspdf');

    const doc = new jsPDF();

    // Configuración de colores IGAC
    const igacBlue: [number, number, number] = [0, 56, 118]; // #003876
    // const igacLightBlue = [0, 102, 204]; // #0066CC - Unused

    // Header con branding IGAC
    doc.setFillColor(...igacBlue);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", 'bold');
    doc.text('IGAC - Instituto Geográfico Agustín Codazzi', 105, 15, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont("helvetica", 'normal');
    doc.text('Sistema de Monitoreo de Dinámica Inmobiliaria', 105, 25, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Reporte de Anomalía: ${id}`, 105, 33, { align: 'center' });

    // Resetear color de texto
    doc.setTextColor(0, 0, 0);

    // Sección: Datos de la propiedad
    let yPos = 50;
    doc.setFontSize(16);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(...igacBlue);
    doc.text('Datos de la Propiedad', 20, yPos);

    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", 'normal');
    doc.setTextColor(0, 0, 0);

    doc.text(`Ubicación: ${mockProperty.ubicacion}`, 20, yPos);
    yPos += 7;
    doc.text(`Área construida: ${mockProperty.area} m²`, 20, yPos);
    yPos += 7;
    doc.text(`Valor transacción: ${mockProperty.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}`, 20, yPos);
    yPos += 7;
    doc.text(`Tipo de inmueble: ${mockProperty.tipo}`, 20, yPos);

    // Sección: Estado de revisión
    yPos += 15;
    doc.setFontSize(16);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(...igacBlue);
    doc.text('Estado de Revisión', 20, yPos);

    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", 'normal');
    doc.setTextColor(0, 0, 0);

    doc.text('Severidad: Alta (mock)', 20, yPos);
    yPos += 7;
    doc.text('Estado: Pendiente de revisión', 20, yPos);
    yPos += 7;
    doc.text('Asignado a: Analista mock', 20, yPos);

    // Sección: Factores de riesgo
    yPos += 15;
    doc.setFontSize(16);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(...igacBlue);
    doc.text('Factores de Riesgo Identificados', 20, yPos);

    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", 'normal');
    doc.setTextColor(0, 0, 0);

    const riskFactors = [
      'Valor de transacción 38% por encima del rango esperado para el sector.',
      'Historial de transacciones frecuentes en un periodo corto (posible flipping).',
      'Inconsistencias entre área reportada y área catastral promedio.'
    ];

    riskFactors.forEach((factor, index) => {
      const lines = doc.splitTextToSize(`• ${factor}`, 170);
      doc.text(lines, 20, yPos);
      yPos += lines.length * 7;
    });

    // Footer
    yPos = 280;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado: ${new Date().toLocaleString('es-CO')}`, 20, yPos);
    doc.text('IMDADIC - Sistema de Monitoreo de Anomalías', 105, yPos, { align: 'center' });
    doc.text(`Página 1 de 1`, 190, yPos, { align: 'right' });

    // Guardar PDF
    doc.save(`Anomalia_${id}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--igac-blue-50)] via-white to-[var(--gray-50)] relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-[var(--igac-blue-900)] opacity-5 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-[var(--igac-blue-700)] opacity-5 rounded-full mix-blend-multiply filter blur-3xl" />
        <FloatingParticles />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6 relative z-10">
        {/* Header con diseño IGAC */}
        <header className="bg-gradient-to-r from-[var(--igac-blue-900)] to-[var(--igac-blue-800)] rounded-2xl p-8 shadow-2xl border border-[var(--igac-blue-900)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Anomalía {id}</h1>
              <p className="mt-2 text-blue-100 text-base max-w-2xl">
                Detalle completo de la anomalía detectada por el sistema de monitoreo IMDADIC
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/30 transition-all shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Dashboard
            </Link>
          </div>
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
            title="Acciones disponibles"
            subtitle="Gestionar el estado de la anomalía"
          >
            <div className="flex flex-col gap-3">
              <button className="rounded-xl bg-gradient-to-r from-[var(--igac-blue-700)] to-[var(--igac-blue-800)] px-4 py-3 text-white font-semibold hover:from-[var(--igac-blue-800)] hover:to-[var(--igac-blue-900)] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Marcar como revisada
              </button>
              <button className="rounded-xl bg-gradient-to-r from-[var(--igac-blue-600)] to-[var(--igac-blue-700)] px-4 py-3 text-white font-semibold hover:from-[var(--igac-blue-700)] hover:to-[var(--igac-blue-800)] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Escalar a supervisor
              </button>
              <button
                onClick={handleExportPDF}
                className="rounded-xl bg-gradient-to-r from-[var(--igac-blue-900)] to-[var(--igac-blue-800)] px-4 py-3 text-white font-bold hover:from-[var(--gray-900)] hover:to-[var(--igac-blue-900)] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar Reporte PDF
              </button>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
