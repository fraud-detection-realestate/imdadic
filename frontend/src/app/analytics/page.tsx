import { redirect } from "next/navigation";

// Página de conveniencia para el botón "Ver Análisis Estadístico" de la landing.
// Redirige a la vista principal de estadísticas avanzadas (/statistics).

export default function AnalyticsPage() {
  redirect("/statistics");
}
