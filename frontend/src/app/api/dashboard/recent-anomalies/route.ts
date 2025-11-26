import { NextResponse } from "next/server";

// Endpoint mock: anomalías recientes para el dashboard.
// En producción, leer filtros desde query params y consultar la BD.

export async function GET() {
  const items = [
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
  ];

  return NextResponse.json({ items });
}
