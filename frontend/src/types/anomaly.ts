export type AnomalySeverity = "alta" | "media" | "baja";

export type AnomalyType =
  | "sobrevaloracion"
  | "subvaloracion"
  | "flipping"
  | "inconsistencia";

export interface AnomalyRecord {
  id: string;
  ciudad: string;
  municipio: string;
  departamento: string;
  severidad: AnomalySeverity;
  tipo: AnomalyType;
  fecha: string; // ISO
  valorTransaccion: number;
  areaConstruida: number;
  estadoRevision: "pendiente" | "en_revision" | "cerrada";
}
