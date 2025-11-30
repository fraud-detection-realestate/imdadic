/**
 * Default values and constants for the prediction form
 */

import { PredioInput } from "@/types/prediction";

export const DEPARTAMENTOS_COLOMBIA = [
    "AMAZONAS",
    "ANTIOQUIA",
    "ARAUCA",
    "ATLÁNTICO",
    "BOGOTÁ D.C.",
    "BOLÍVAR",
    "BOYACÁ",
    "CALDAS",
    "CAQUETÁ",
    "CASANARE",
    "CAUCA",
    "CESAR",
    "CHOCÓ",
    "CÓRDOBA",
    "CUNDINAMARCA",
    "GUAINÍA",
    "GUAVIARE",
    "HUILA",
    "LA GUAJIRA",
    "MAGDALENA",
    "META",
    "NARIÑO",
    "NORTE DE SANTANDER",
    "PUTUMAYO",
    "QUINDÍO",
    "RISARALDA",
    "SAN ANDRÉS Y PROVIDENCIA",
    "SANTANDER",
    "SUCRE",
    "TOLIMA",
    "VALLE DEL CAUCA",
    "VAUPÉS",
    "VICHADA",
];

export const MUNICIPIOS_PRINCIPALES: { [key: string]: string[] } = {
    ANTIOQUIA: [
        "MEDELLIN",
        "ENVIGADO",
        "ITAGUI",
        "BELLO",
        "RIONEGRO",
        "LA ESTRELLA",
        "SABANETA",
        "CALDAS",
    ],
    "BOGOTÁ D.C.": ["BOGOTÁ"],
    CUNDINAMARCA: [
        "SOACHA",
        "FUSAGASUGÁ",
        "CHÍA",
        "ZIPAQUIRÁ",
        "FACATATIVÁ",
        "MOSQUERA",
        "MADRID",
        "FUNZA",
    ],
    "VALLE DEL CAUCA": [
        "CALI",
        "PALMIRA",
        "BUENAVENTURA",
        "TULUA",
        "CARTAGO",
        "BUGA",
        "JAMUNDÍ",
        "YUMBO",
    ],
    ATLÁNTICO: ["BARRANQUILLA", "SOLEDAD", "MALAMBO", "PUERTO COLOMBIA", "SABANALARGA"],
    SANTANDER: [
        "BUCARAMANGA",
        "FLORIDABLANCA",
        "GIRÓN",
        "PIEDECUESTA",
        "BARRANCABERMEJA",
    ],
};

export const TIPO_PREDIO_OPTIONS = ["URBANO", "RURAL"];

export const CATEGORIA_RURALIDAD_OPTIONS = [
    "Urbano",
    "Rural",
    "Centros poblados",
    "Rural disperso",
];

export const ESTADO_FOLIO_OPTIONS = ["ACTIVO", "INACTIVO", "SUSPENDIDO"];

// Códigos de Naturaleza Jurídica más comunes
export const COD_NATUJUR_OPTIONS = [
    { value: 125, label: "125 - Compraventa" },
    { value: 126, label: "126 - Permuta" },
    { value: 127, label: "127 - Dación en pago" },
    { value: 128, label: "128 - Adjudicación" },
    { value: 129, label: "129 - Donación" },
    { value: 130, label: "130 - Sucesión" },
    { value: 131, label: "131 - Remate" },
    { value: 132, label: "132 - Aporte a sociedad" },
];

// Códigos ORIP (Oficinas de Registro) principales
export const ORIP_OPTIONS = [
    { value: "001", label: "001 - Bogotá Zona Norte" },
    { value: "002", label: "002 - Bogotá Zona Sur" },
    { value: "003", label: "003 - Medellín" },
    { value: "004", label: "004 - Cali" },
    { value: "005", label: "005 - Barranquilla" },
    { value: "006", label: "006 - Bucaramanga" },
    { value: "007", label: "007 - Cartagena" },
];

/**
 * Default values for a new property input form
 * Based on a typical urban property transaction in Medellín
 */
export const DEFAULT_PREDIO_INPUT: PredioInput = {
    DEPARTAMENTO: "ANTIOQUIA",
    MUNICIPIO: "MEDELLIN",
    TIPO_PREDIO_ZONA: "URBANO",
    CATEGORIA_RURALIDAD: "Urbano",
    ORIP: "003",
    ESTADO_FOLIO: "ACTIVO",
    YEAR_RADICA: new Date().getFullYear(),
    NUM_ANOTACION: 1,
    Dinámica_Inmobiliaria: 5,
    COD_NATUJUR: 125, // Compraventa
    COUNT_A: 1,
    COUNT_DE: 1,
    PREDIOS_NUEVOS: 0,
    TIENE_MAS_DE_UN_VALOR: 0,
    VALOR_CONSTANTE_2024: 250000000, // 250 millones COP
};

/**
 * Example presets for testing different scenarios
 */
export const EXAMPLE_SCENARIOS: { [key: string]: PredioInput } = {
    lujo_bogota: {
        DEPARTAMENTO: "BOGOTÁ D.C.",
        MUNICIPIO: "BOGOTÁ",
        TIPO_PREDIO_ZONA: "URBANO",
        CATEGORIA_RURALIDAD: "Urbano",
        ORIP: "001",
        ESTADO_FOLIO: "ACTIVO",
        YEAR_RADICA: 2024,
        NUM_ANOTACION: 3,
        Dinámica_Inmobiliaria: 15,
        COD_NATUJUR: 125,
        COUNT_A: 2,
        COUNT_DE: 1,
        PREDIOS_NUEVOS: 1,
        TIENE_MAS_DE_UN_VALOR: 0,
        VALOR_CONSTANTE_2024: 1500000000, // 1,500 millones - Lujo
    },
    economico_pereira: {
        DEPARTAMENTO: "RISARALDA",
        MUNICIPIO: "PEREIRA",
        TIPO_PREDIO_ZONA: "URBANO",
        CATEGORIA_RURALIDAD: "Urbano",
        ORIP: "007",
        ESTADO_FOLIO: "ACTIVO",
        YEAR_RADICA: 2024,
        NUM_ANOTACION: 1,
        Dinámica_Inmobiliaria: 3,
        COD_NATUJUR: 125,
        COUNT_A: 1,
        COUNT_DE: 1,
        PREDIOS_NUEVOS: 0,
        TIENE_MAS_DE_UN_VALOR: 0,
        VALOR_CONSTANTE_2024: 80000000, // 80 millones - Económico
    },
    rural_santander: {
        DEPARTAMENTO: "SANTANDER",
        MUNICIPIO: "BUCARAMANGA",
        TIPO_PREDIO_ZONA: "RURAL",
        CATEGORIA_RURALIDAD: "Rural disperso",
        ORIP: "006",
        ESTADO_FOLIO: "ACTIVO",
        YEAR_RADICA: 2023,
        NUM_ANOTACION: 2,
        Dinámica_Inmobiliaria: 2,
        COD_NATUJUR: 129, // Donación
        COUNT_A: 1,
        COUNT_DE: 1,
        PREDIOS_NUEVOS: 0,
        TIENE_MAS_DE_UN_VALOR: 0,
        VALOR_CONSTANTE_2024: 50000000, // 50 millones
    },
};
