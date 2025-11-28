import { NextResponse } from "next/server";

// Endpoint mock: estadísticas agregadas para la vista /statistics.
// En producción, reemplazar por consultas agregadas reales (SQL/Elasticsearch).

export async function GET() {
  return NextResponse.json({
    temporal: [
      { periodo: "2016", valor: 4200 },
      { periodo: "2018", valor: 6100 },
      { periodo: "2020", valor: 7200 },
      { periodo: "2022", valor: 9800 },
      { periodo: "2024", valor: 11800 },
    ],
    tipo: [
      { name: "Sobrevaloración", value: 45 },
      { name: "Subvaloración", value: 25 },
      { name: "Flipping", value: 18 },
      { name: "Inconsistencias", value: 12 },
    ],
    geografico: [
      { nombre: "Bogotá D.C.", valor: 5200 },
      { nombre: "Antioquia", valor: 3100 },
      { nombre: "Valle del Cauca", valor: 2300 },
      { nombre: "Atlántico", valor: 1900 },
    ],
  });
}
