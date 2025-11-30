"use server";

import fs from "fs";
import path from "path";
import { AnomalyRecord } from "@/types/anomaly";

const CSV_PATH = path.join(process.cwd(), "files", "tablero_riesgos.csv");

interface RawCsvRecord {
  VALOR_CONSTANTE_2024: string;
  DEPARTAMENTO: string;
  MUNICIPIO: string;
  COD_NATUJUR: string;
  YEAR_RADICA: string;
  NUM_ANOTACION: string;
  Dinámica_Inmobiliaria: string;
  ES_ANOMALIA: string;
  SCORE_ANOMALIA: string;
  TIPO_ANOMALIA: string;
}

export interface DashboardData {
  tendenciaMensual: Array<{ mes: string; anomalías: number }>;
  severidad: Array<{ nombre: string; valor: number }>;
  anomalías: AnomalyRecord[];
  ciudadTop: string;
  distribucionGeografica: Array<{ nombre: string; valor: number }>;
  distribucionTipo: Array<{ name: string; value: number }>;
  kpis: {
    totalPropiedades: string;
    totalAnomalias: string;
    tasaAnomalias: string;
    tiempoMedio: string; // Mocked for now as not in CSV
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const fileContent = await fs.promises.readFile(CSV_PATH, "utf-8");
    const lines = fileContent.split("\n");
    const headers = lines[0].split(",");

    const records: RawCsvRecord[] = [];

    // Parse CSV (skipping header, handling basic parsing)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Simple split by comma (assuming no commas in values for this specific dataset based on inspection)
      // For more robust parsing, a library or regex would be better, but this fits the "simple" requirement.
      const values = line.split(",");

      if (values.length >= headers.length) {
        records.push({
          VALOR_CONSTANTE_2024: values[0],
          DEPARTAMENTO: values[1],
          MUNICIPIO: values[2],
          COD_NATUJUR: values[3],
          YEAR_RADICA: values[4],
          NUM_ANOTACION: values[5],
          Dinámica_Inmobiliaria: values[6],
          ES_ANOMALIA: values[7],
          SCORE_ANOMALIA: values[8],
          TIPO_ANOMALIA: values[9],
        });
      }
    }

    // --- Aggregations ---

    // 1. Tendencia Mensual (Actually Yearly based on available data)
    const yearlyCounts = new Map<string, number>();
    records.forEach(r => {
      const year = r.YEAR_RADICA;
      if (year) {
        yearlyCounts.set(year, (yearlyCounts.get(year) || 0) + 1);
      }
    });

    const tendenciaMensual = Array.from(yearlyCounts.entries())
      .map(([year, count]) => ({ mes: year, anomalías: count }))
      .sort((a, b) => a.mes.localeCompare(b.mes));

    // 2. Severidad (Based on SCORE_ANOMALIA or TIPO_ANOMALIA)
    // Let's use TIPO_ANOMALIA for the "Severidad" chart to show distribution of types, 
    // or we can bucket SCORE_ANOMALIA. The UI says "Distribución por severidad", but usually types are more interesting.
    // Let's map TIPO_ANOMALIA to what was previously "Severidad" buckets or just use types.
    // The mock had "Alta", "Media", "Baja".
    // Let's infer severity from score: < -0.05 High (Alta), -0.05 to -0.01 Medium (Media), > -0.01 Low (Baja)
    // Note: Scores are negative in the CSV sample.

    let alta = 0;
    let media = 0;
    let baja = 0;

    records.forEach(r => {
      const score = parseFloat(r.SCORE_ANOMALIA);
      if (!isNaN(score)) {
        if (score < -0.05) alta++;
        else if (score < -0.01) media++;
        else baja++;
      }
    });

    const severidad = [
      { nombre: "Alta", valor: alta },
      { nombre: "Media", valor: media },
      { nombre: "Baja", valor: baja },
    ];

    // 3. Top City
    const cityCounts = new Map<string, number>();
    records.forEach(r => {
      const city = r.MUNICIPIO;
      if (city) {
        cityCounts.set(city, (cityCounts.get(city) || 0) + 1);
      }
    });

    let ciudadTop = "Desconocida";
    let maxCount = 0;
    cityCounts.forEach((count, city) => {
      if (count > maxCount) {
        maxCount = count;
        ciudadTop = city;
      }
    });

    // 4. Recent Anomalies (Map to AnomalyRecord interface)
    // Taking last 50 records for the table
    const recentRecords = records.slice(-50).reverse().map((r, index) => {
      const score = parseFloat(r.SCORE_ANOMALIA);
      let severity: "alta" | "media" | "baja" = "baja";
      if (score < -0.05) severity = "alta";
      else if (score < -0.01) severity = "media";

      return {
        id: `A-${r.YEAR_RADICA}-${index}`,
        ciudad: r.MUNICIPIO,
        municipio: r.MUNICIPIO,
        departamento: r.DEPARTAMENTO,
        severidad: severity,
        tipo: r.TIPO_ANOMALIA.toLowerCase().replace(/_/g, " "),
        fecha: `${r.YEAR_RADICA}-01-01`, // Approximate date
        valorTransaccion: parseFloat(r.VALOR_CONSTANTE_2024) || 0,
        areaConstruida: 0, // Not in CSV
        estadoRevision: "pendiente" as const,
      };
    });

    // 5. KPIs
    const totalAnomalias = records.length;
    // Mocking total properties as we only have anomalies file? 
    // Or assuming this file contains ALL records and ES_ANOMALIA flag tells us.
    // Checking CSV sample: ES_ANOMALIA seems to be 1 for all shown records.
    // Let's assume the CSV is just anomalies for now or check ES_ANOMALIA column.
    // If ES_ANOMALIA is 1, it's an anomaly.

    const realAnomalies = records.filter(r => r.ES_ANOMALIA === "1").length;
    const totalRecords = records.length;
    const tasa = totalRecords > 0 ? ((realAnomalies / totalRecords) * 100).toFixed(2) + "%" : "0%";

    // 6. Distribución Geográfica (Top Departments)
    const deptCounts = new Map<string, number>();
    records.forEach(r => {
      const dept = r.DEPARTAMENTO;
      if (dept) {
        deptCounts.set(dept, (deptCounts.get(dept) || 0) + 1);
      }
    });

    const distribucionGeografica = Array.from(deptCounts.entries())
      .map(([nombre, valor]) => ({ nombre, valor }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5); // Top 5

    // 7. Distribución por Tipo (For Pie Chart)
    const typeCounts = new Map<string, number>();
    records.forEach(r => {
      let type = r.TIPO_ANOMALIA;
      if (type) {
        // Clean up type string
        type = type.replace(/_/g, " ");
        // Capitalize first letter
        type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
      }
    });

    const distribucionTipo = Array.from(typeCounts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      tendenciaMensual,
      severidad,
      anomalías: recentRecords,
      ciudadTop,
      distribucionGeografica,
      distribucionTipo,
      kpis: {
        totalPropiedades: `${(totalRecords / 1000).toFixed(1)}K`,
        totalAnomalias: `${realAnomalies}`,
        tasaAnomalias: tasa, // If file is only anomalies, this will be 100%
        tiempoMedio: "3.2 días", // Mock
      },
    };

  } catch (error) {
    console.error("Error reading dashboard data:", error);
    // Return empty/mock structure on error to prevent crash
    return {
      tendenciaMensual: [],
      severidad: [],
      anomalías: [],
      ciudadTop: "N/A",
      distribucionGeografica: [],
      distribucionTipo: [],
      kpis: {
        totalPropiedades: "0",
        totalAnomalias: "0",
        tasaAnomalias: "0%",
        tiempoMedio: "0",
      },
    };
  }
}
