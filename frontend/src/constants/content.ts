// Tipos para los iconos
export type IconName = 'chart' | 'map' | 'clock' | 'lightbulb' | 'target' | 'checklist' | 'trending' | 'database';

export const SITE_CONFIG = {
  name: "IGAC",
  fullName: "Instituto Geográfico Agustín Codazzi",
  subtitle: "Sistema Inteligente de Monitoreo Inmobiliario",
  description: "Garantizando la transparencia del mercado inmobiliario en Colombia a través de análisis avanzado de datos y detección inteligente de anomalías en transacciones de propiedad raíz",
  location: "Bogotá D.C., Colombia",
  year: "2024",
} as const;

export const NAVIGATION_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/detection", label: "Detectar Anomalías" },
  { href: "/maps", label: "Mapas" },
  { href: "/chat", label: "Asistente IA" },
] as const;

export const HERO_CONTENT = {
  badge: "Innovación en Análisis Territorial",
  title: {
    highlight: "IMDADIC",
    prefix: "",
    suffix: "\nInteligencia para el Monitoreo y Detección Avanzada de Dinámicas Inmobiliarias en Colombia",
  },
  description: "Plataforma avanzada para el análisis de más de 34 millones de transacciones inmobiliarias distribuidas en 1,105 municipios entre 2015 y 2025",
  cta: {
    primary: {
      label: "Detectar Anomalías Ahora",
      href: "/detection",
    },
    secondary: {
      label: "Ver Dashboard",
      href: "/dashboard",
    },
  },
} as const;

// ✅ CORREGIDO: Tipar icon como IconName
export const FEATURE_CARDS: Array<{
  id: string;
  icon: IconName;
  bgColor: string;
  iconColor: string;
  title: string;
  description: string;
}> = [
    {
      id: "analysis",
      icon: "chart",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-900",
      title: "Análisis Avanzado",
      description: "Modelos de detección basados en estadísticas, reglas y machine learning",
    },
    {
      id: "visualization",
      icon: "map",
      bgColor: "bg-green-100",
      iconColor: "text-green-700",
      title: "Visualización Geoespacial",
      description: "Mapas interactivos con análisis territorial de todo el país",
    },
    {
      id: "realtime",
      icon: "clock",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-700",
      title: "Tiempo Real",
      description: "Monitoreo y detección de anomalías en tiempo real o periódico",
    },
  ];

export const CHALLENGE_CONTENT = {
  title: "Descripción del Reto",
  icon: "lightbulb" as IconName,
  paragraphs: [
    {
      text: "Colombia concentra más de",
      highlight: "34 millones de registros de transacciones inmobiliarias",
      textContinue: "únicas entre 2015 y 2025, distribuidas en 1,105 municipios. Esta información es crítica para procesos de planeación territorial, análisis de mercado, supervisión operativa y evaluación de riesgos.",
    },
    {
      text: "Sin embargo, el volumen, la heterogeneidad y las posibles inconsistencias de los datos generan limitaciones para",
      highlight: "detectar errores o anomalías, identificar patrones de fraude, controlar riesgos operativos y financieros",
      textContinue: ", validar la calidad de los datos y aprovechar la integración con otras fuentes públicas.",
    },
  ],
} as const;

export const OBJECTIVES_CONTENT = {
  general: {
    title: "Objetivo General",
    icon: "target" as IconName,
    description: "Diseñar e implementar un sistema automatizado de monitoreo, análisis y detección de anomalías en la dinámica inmobiliaria del país, que permita identificar riesgos operativos, financieros, de fraude y problemas de calidad de datos en tiempo real o mediante procesos periódicos.",
  },
  specific: {
    title: "Objetivos Específicos",
    icon: "checklist" as IconName,
    items: [
      "Integrar y estandarizar los registros de transacciones inmobiliarias",
      "Construir modelos de detección de anomalías basados en estadísticas, reglas y machine learning",
      "Identificar patrones de fraude, valores atípicos, duplicidades y errores de anotación",
      "Desarrollar un tablero de monitoreo con indicadores clave de riesgo y calidad",
      "Integrar fuentes públicas complementarias",
      "Documentar la metodología, procesos y arquitectura de datos",
    ],
  },
} as const;

export const IMPACT_CONTENT = {
  title: "Impacto Esperado",
  icon: "trending" as IconName,
  items: [
    "Mejor control operativo sobre registros inmobiliarios",
    "Identificación temprana de fraude y anomalías",
    "Reducción de errores administrativos",
    "Mayor confianza en la calidad de los datos",
    "Fortalecimiento de la planeación territorial",
    "Ahorro de tiempo y recursos",
    "Capacidad analítica nacional y municipal para entender la dinámica inmobiliaria",
  ],
} as const;

export const DATASET_CONTENT = {
  title: "Conjuntos de Datos Asociados",
  icon: "database" as IconName,
  dataset: {
    name: "Registro de transacciones inmobiliarias en Colombia IGAC 2015 - 2023",
    source: "Datos abiertos del gobierno de Colombia",
    url: "https://www.datos.gov.co/Vivienda-Ciudad-y-Territorio/Registro-de-transacciones-inmobiliarias-en-Colombi/7y2j-43cv/about_data",
  },
} as const;

export const CTA_SECTION = {
  title: "Transformando Datos en Inteligencia Territorial",
  description: "Acceda a la plataforma más avanzada de análisis inmobiliario en Colombia. Más de 34 millones de transacciones, visualización geoespacial en tiempo real y detección inteligente de anomalías.",
  buttons: {
    primary: {
      label: "Analizar Transacción",
      href: "/detection",
    },
    secondary: {
      label: "Ver Dashboard",
      href: "/dashboard",
    },
  },
} as const;

export const FOOTER_CONTENT = {
  organization: "Instituto Geográfico Agustín Codazzi",
  systemName: "Sistema de Monitoreo de Dinámica Inmobiliaria",
  copyright: "© 2025 IGAC. Todos los derechos reservados.",
  location: "Bogotá D.C., Colombia",
} as const;