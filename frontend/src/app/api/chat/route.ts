import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Endpoint mock para el chat con IA.
// En producción, aquí se integrará la llamada a Claude, GPT-4, etc., y a la BD IMDADIC.

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const mensaje: string = body.mensaje ?? "";

  const respuesta = `Esta es una respuesta mock del asistente IMDADIC. Tu consulta fue: "${mensaje}". ` +
    "En producción, aquí se consultará el backend (SQL/Elasticsearch) y la API de IA para generar un análisis con citas.";

  return NextResponse.json({
    respuesta,
    citas: [
      {
        tipo: "sql",
        descripcion: "Consulta de ejemplo utilizada para ilustrar la respuesta (mock)",
        fragmento: "SELECT * FROM anomalies WHERE id = 'A-2025-0001';",
      },
    ],
  });
}
