"use server";

import fs from "fs";
import path from "path";

const CSV_PATH = path.join(process.cwd(), "files", "tablero_riesgos.csv");

// Simplified coordinate mapping for major Colombian cities/departments
// In production, use a proper geocoding service or database
const COORDINATES_MAP: Record<string, [number, number]> = {
  "BOGOTA": [4.7110, -74.0721],
  "MEDELLIN": [6.2442, -75.5812],
  "CALI": [3.4516, -76.5320],
  "BARRANQUILLA": [10.9685, -74.7813],
  "CARTAGENA": [10.3910, -75.4794],
  "CUCUTA": [7.8939, -72.5078],
  "BUCARAMANGA": [7.1254, -73.1198],
  "PEREIRA": [4.8133, -75.6961],
  "MANIZALES": [5.0689, -75.5174],
  "IBAGUE": [4.4389, -75.2322],
  "PASTO": [1.2136, -77.2811],
  "NEIVA": [2.9273, -75.2819],
  "VILLAVICENCIO": [4.1420, -73.6266],
  "ARMENIA": [4.5339, -75.6811],
  "POPAYAN": [2.4419, -76.6063],
  "VALLEDUPAR": [10.4631, -73.2532],
  "MONTERIA": [8.7479, -75.8814],
  "SINCELEJO": [9.3047, -75.3978],
  "SANTA MARTA": [11.2408, -74.2099],
  "TUNJA": [5.5353, -73.3678],
  // Add more as needed
};

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  municipio: string;
  departamento: string;
  severity: "alta" | "media" | "baja";
  type: string;
  score: number;
  year: string;
}

export interface MapData {
  points: MapPoint[];
  stats: {
    total: number;
    alta: number;
    media: number;
    baja: number;
  };
}

function getCoordinates(municipio: string, departamento: string): [number, number] | null {
  const cleanMunicipio = municipio.toUpperCase().trim();
  const cleanDepartamento = departamento.toUpperCase().trim();
  
  // Try exact match first
  if (COORDINATES_MAP[cleanMunicipio]) {
    return COORDINATES_MAP[cleanMunicipio];
  }
  
  // Try department match
  if (COORDINATES_MAP[cleanDepartamento]) {
    // Add small random offset to avoid exact overlap
    const [lat, lng] = COORDINATES_MAP[cleanDepartamento];
    return [
      lat + (Math.random() - 0.5) * 0.1,
      lng + (Math.random() - 0.5) * 0.1
    ];
  }
  
  // Default to Colombia center with random offset
  return [
    4.5709 + (Math.random() - 0.5) * 2,
    -74.2973 + (Math.random() - 0.5) * 2
  ];
}

export async function getMapData(): Promise<MapData> {
  try {
    const fileContent = await fs.promises.readFile(CSV_PATH, "utf-8");
    const lines = fileContent.split("\n");
    
    const points: MapPoint[] = [];
    let alta = 0, media = 0, baja = 0;
    
    // Skip header, process data
    for (let i = 1; i < Math.min(lines.length, 5000); i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(",");
      if (values.length < 10) continue;
      
      const municipio = values[2] || "DESCONOCIDO";
      const departamento = values[1] || "DESCONOCIDO";
      const year = values[4] || "2024";
      const score = parseFloat(values[8]) || 0;
      const tipoAnomalia = values[9] || "desconocido";
      
      // Determine severity
      let severity: "alta" | "media" | "baja" = "baja";
      if (score < -0.05) {
        severity = "alta";
        alta++;
      } else if (score < -0.01) {
        severity = "media";
        media++;
      } else {
        baja++;
      }
      
      const coords = getCoordinates(municipio, departamento);
      if (!coords) continue;
      
      points.push({
        id: `point-${i}`,
        lat: coords[0],
        lng: coords[1],
        municipio,
        departamento,
        severity,
        type: tipoAnomalia.toLowerCase().replace(/_/g, " "),
        score,
        year,
      });
    }
    
    return {
      points,
      stats: {
        total: points.length,
        alta,
        media,
        baja,
      },
    };
  } catch (error) {
    console.error("Error reading map data:", error);
    return {
      points: [],
      stats: { total: 0, alta: 0, media: 0, baja: 0 },
    };
  }
}
