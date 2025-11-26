import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Endpoint mock: detalle de anomalía.
// En producción, usar el id para consultar la BD y devolver datos reales.

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  return NextResponse.json({
    id,
    severidad: "alta",
    tipo: "sobrevaloracion",
    score: 0.92,
    estadoRevision: "pendiente",
    motivoPrincipal: "Valor 38% por encima del rango esperado para el sector (mock).",
    propiedad: {
      ubicacion: "Bogotá D.C., Colombia",
      departamento: "Cundinamarca",
      municipio: "Bogotá D.C.",
      barrio: "Chapinero",
      areaConstruida: 95,
      tipoInmueble: "Apartamento",
      valorTransaccion: 980000000,
      valorM2Zona: 7500000,
      coord: { lat: 4.65, lng: -74.06 },
    },
    comparativos: {
      promedioZona: 710000000,
      percentilZona: 0.97,
      similares: [
        { id: "REF-1", valorTransaccion: 760000000, areaConstruida: 90 },
        { id: "REF-2", valorTransaccion: 720000000, areaConstruida: 92 },
      ],
    },
    timeline: [
      { fecha: "2020-05-01", evento: "Compra" },
      { fecha: "2023-02-10", evento: "Venta" },
    ],
  });
}
