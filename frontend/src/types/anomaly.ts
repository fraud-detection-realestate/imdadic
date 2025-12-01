export type AnomalySeverity = "alta" | "media" | "baja";

export type AnomalyType =
  | "sobrevaloracion"
  | "subvaloracion"
  | "flipping"
  | "inconsistencia"
  | "otro patron"
  | "valor infimo"
  | "trafico juridico inusual"
  | "valor extremo"
  | string;

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
  revisada?: boolean; // Track if anomaly has been reviewed
}
