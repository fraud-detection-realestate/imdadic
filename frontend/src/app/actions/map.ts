"use server";

import fs from "fs";
import path from "path";

const CSV_PATH = path.join(process.cwd(), "files", "tablero_riesgos.csv");

// Diccionario expandido de coordenadas (ejemplo, idealmente usarías un JSON externo)
// He agregado algunos departamentos para que el fallback sea mejor.
const COORDINATES_MAP: Record<string, [number, number]> = {
  // --- Ciudades Principales (Municipios) ---
  "BOGOTA": [4.7110, -74.0721],
  "BOGOTA D.C.": [4.7110, -74.0721],
  "BOGOTÁ D.C.": [4.7110, -74.0721], // Con tilde por si acaso
  "MEDELLIN": [6.2442, -75.5812],
  "CALI": [3.4516, -76.5320],
  "BARRANQUILLA": [10.9685, -74.7813],
  "CARTAGENA": [10.3910, -75.4794],
  "CUCUTA": [7.8939, -72.5078],
  "BUCARAMANGA": [7.1254, -73.1198],
  "PEREIRA": [4.8133, -75.6961],
  "MANIZALES": [5.0689, -75.5174],
  "IBAGUE": [4.4389, -75.2322],
  "VILLAVICENCIO": [4.1420, -73.6266],
  "SANTA MARTA": [11.2408, -74.2099],
  "VALLEDUPAR": [10.4631, -73.2532],
  "MONTERIA": [8.7479, -75.8814],
  "SINCELEJO": [9.3047, -75.3978],
  "POPAYAN": [2.4419, -76.6063],
  "TUNJA": [5.5353, -73.3678],
  "ARMENIA": [4.5339, -75.6811],
  "PASTO": [1.2136, -77.2811],
  "NEIVA": [2.9273, -75.2819],
  "RIOHACHA": [11.5444, -72.9072],
  "FLORENCIA": [1.6175, -75.6038],
  "YOPAL": [5.3378, -72.3959],
  "QUIBDO": [5.6947, -76.6611],
  "MOCOA": [1.1528, -76.6521],
  "ARAUCA": [7.0845, -70.7554],
  "LETICIA": [-4.2153, -69.9406],
  "SAN ANDRES": [12.5847, -81.7006],
  "MITU": [1.1983, -70.1733],
  "PUERTO CARREÑO": [6.1890, -67.4859],
  "INIRIDA": [3.8653, -67.9239],
  "SAN JOSE DEL GUAVIARE": [2.5729, -72.6459],

  // --- Coordenadas Aproximadas por DEPARTAMENTO (Centroide) ---
  "AMAZONAS": [-1.4429, -71.5724],
  "ANTIOQUIA": [6.9087, -75.6374],
  "ARAUCA DEPARTAMENTO": [6.5672, -70.9500], // "ARAUCA" ya está como municipio
  "ATLÁNTICO": [10.6966, -74.8741],
  "ATLANTICO": [10.6966, -74.8741],
  "BOLÍVAR": [8.6705, -74.0300],
  "BOLIVAR": [8.6705, -74.0300],
  "BOYACÁ": [5.7159, -73.1486],
  "BOYACA": [5.7159, -73.1486],
  "CALDAS": [5.3323, -75.3650],
  "CAQUETÁ": [0.8675, -73.8725],
  "CAQUETA": [0.8675, -73.8725],
  "CASANARE": [5.3872, -71.6266],
  "CAUCA": [2.3972, -76.7332],
  "CESAR": [9.3373, -73.6536],
  "CHOCÓ": [5.8736, -76.9257],
  "CHOCO": [5.8736, -76.9257],
  "CÓRDOBA": [8.3653, -75.7873],
  "CORDOBA": [8.3653, -75.7873],
  "CUNDINAMARCA": [4.9524, -74.0721], // Fuera de Bogotá para distinguir
  "GUAINÍA": [2.5854, -68.5247],
  "GUAINIA": [2.5854, -68.5247],
  "GUAVIARE": [2.0667, -72.0333],
  "HUILA": [2.5359, -75.5277],
  "LA GUAJIRA": [11.3548, -72.5205],
  "MAGDALENA": [10.2371, -74.3611],
  "META": [3.2720, -73.0877],
  "NARIÑO": [1.5553, -77.5231],
  "NORTE DE SANTANDER": [7.9463, -72.8988],
  "PUTUMAYO": [0.6378, -76.1583],
  "QUINDÍO": [4.4614, -75.7074],
  "QUINDIO": [4.4614, -75.7074],
  "RISARALDA": [4.9727, -75.8399],
  "SAN ANDRÉS Y PROVIDENCIA": [12.5847, -81.7006],
  "SANTANDER": [6.6437, -73.3920],
  "SUCRE": [9.1378, -74.9300],
  "TOLIMA": [4.0173, -75.1874],
  "VALLE DEL CAUCA": [3.8009, -76.6248],
  "VAUPÉS": [0.5556, -70.7554],
  "VAUPES": [0.5556, -70.7554],
  "VICHADA": [4.7333, -69.6667],
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

  // 1. Intenta municipio exacto
  if (COORDINATES_MAP[cleanMunicipio]) {
    // Pequeño jitter para que no se superpongan 100% si son del mismo municipio
    const [lat, lng] = COORDINATES_MAP[cleanMunicipio];
    return [lat + (Math.random() - 0.5) * 0.01, lng + (Math.random() - 0.5) * 0.01];
  }

  // 2. Intenta departamento
  if (COORDINATES_MAP[cleanDepartamento]) {
    const [lat, lng] = COORDINATES_MAP[cleanDepartamento];
    // Offset más grande para distribuir puntos en el departamento
    return [lat + (Math.random() - 0.5) * 0.5, lng + (Math.random() - 0.5) * 0.5];
  }

  // 3. Fallback (Centro Colombia) - Evitar en producción si es posible
  return [4.5709 + (Math.random() - 0.5) * 4, -74.2973 + (Math.random() - 0.5) * 4];
}

// --- FUNCIÓN PRINCIPAL MODIFICADA ---
// Ahora acepta un filtro opcional 'filterDepartamento'
export async function getMapData(filterDepartamento: string = "todos"): Promise<MapData> {
  try {
    const fileContent = await fs.promises.readFile(CSV_PATH, "utf-8");
    const lines = fileContent.split("\n");

    const points: MapPoint[] = [];
    let alta = 0, media = 0, baja = 0;

    // Normalizamos el filtro
    const targetDept = filterDepartamento.toUpperCase().trim();
    const isFiltering = targetDept !== "TODOS";

    // Límite de puntos A DEVOLVER (no a leer) para proteger el frontend
    const MAX_POINTS_RETURNED = 3000;

    // Iteramos sobre TODAS las líneas (saltando header)
    // NOTA: Si el archivo es >50MB, considera usar Streams o 'readline'
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(",");
      if (values.length < 10) continue;

      const departamento = (values[1] || "DESCONOCIDO").trim();

      // --- FILTRADO EN SERVIDOR (Optimización Crítica) ---
      // Si estamos filtrando y este registro no coincide, lo saltamos inmediatamente.
      if (isFiltering && departamento.toUpperCase() !== targetDept) {
        continue;
      }

      const municipio = (values[2] || "DESCONOCIDO").trim();
      const year = values[4] || "2024";
      const score = parseFloat(values[8]) || 0;
      const tipoAnomalia = values[9] || "desconocido";

      // Determinar severidad
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

      // Generar coordenadas
      const coords = getCoordinates(municipio, departamento);
      if (!coords) continue;

      points.push({
        id: `p-${i}`,
        lat: coords[0],
        lng: coords[1],
        municipio,
        departamento,
        severity,
        type: tipoAnomalia.toLowerCase().replace(/_/g, " "),
        score,
        year,
      });

      // Si ya tenemos suficientes puntos para mostrar, paramos.
      if (points.length >= MAX_POINTS_RETURNED) break;
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
