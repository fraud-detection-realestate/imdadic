import { NextResponse } from "next/server";

// Endpoint mock: resumen para el dashboard ejecutivo.
// En producción, reemplazar por consultas reales a la base de datos.

export async function GET() {
  return NextResponse.json({
    kpis: {
      totalPropiedadesMonitoreadas: 2100000,
      totalAnomalias: 18400,
      tasaAnomalias: 0.0087,
      tiempoMedioAnalisisDias: 3.2,
    },
    tendenciaMensual: [
      { mes: "2025-01", anomalias: 1200 },
      { mes: "2025-02", anomalias: 1350 },
      { mes: "2025-03", anomalias: 1420 },
      { mes: "2025-04", anomalias: 1600 },
      { mes: "2025-05", anomalias: 1750 },
      { mes: "2025-06", anomalias: 1820 },
    ],
    distribucionSeveridad: [
      { severidad: "alta", conteo: 620 },
      { severidad: "media", conteo: 980 },
      { severidad: "baja", conteo: 240 },
    ],
  });
}
