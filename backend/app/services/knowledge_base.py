"""
Knowledge base for the IMDADIC chat assistant
Contains structured information about the system, capabilities, and data
"""

# Sistema Overview
SYSTEM_INFO = {
    "name": "IMDADIC",
    "full_name": "Sistema de Monitoreo y Detección de Anomalías en Dinámica Inmobiliaria en Colombia",
    "institution": "Instituto Geográfico Agustín Codazzi (IGAC)",
    "purpose": "Detectar y analizar anomalías en transacciones inmobiliarias en Colombia",
    "coverage": {
        "records": "34+ millones de transacciones",
        "period": "2015 - 2025",
        "municipalities": "1,105 municipios cubiertos",
        "departments": "32 departamentos de Colombia",
    },
}

# Capacidades del Sistema
CAPABILITIES = {
    "detection": {
        "name": "Detección de Anomalías",
        "description": "Analiza transacciones inmobiliarias para detectar posibles fraudes, lavado de activos o errores",
        "models": [
            "LightGBM Classifier (clasificación de precio)",
            "Isolation Forest (detección de anomalías)",
        ],
        "outputs": [
            "Clasificación de rango de precio: BAJO, MEDIO, ALTO, LUJO",
            "Detección de anomalías: NORMAL o ANOMALÍA DETECTADA",
            "Score de anomalía (valores negativos indican mayor probabilidad de fraude)",
            "Probabilidades para cada rango de precio",
        ],
        "use_cases": [
            "Verificar si un precio de venta es sospechoso",
            "Detectar posible lavado de activos",
            "Identificar errores de registro en transacciones",
            "Analizar patrones inusuales en el mercado",
        ],
    },
    "dashboard": {
        "name": "Dashboard Ejecutivo",
        "description": "Visualización de KPIs y métricas del sistema",
        "features": [
            "Total de propiedades analizadas",
            "Total de anomalías detectadas",
            "Tasa de anomalías (%)",
            "Tendencias temporales por año",
            "Distribución por severidad (Alta, Media, Baja)",
            "Top ciudades con más anomalías",
            "Distribución geográfica por departamento",
            "Tipos de anomalías detectadas",
        ],
    },
    "maps": {
        "name": "Mapas Geoespaciales",
        "description": "Visualización geográfica interactiva de anomalías",
        "features": [
            "Mapa de Colombia con todas las anomalías",
            "Marcadores por severidad (colores: rojo=crítica, naranja=alta, amarillo=media, verde=baja)",
            "Filtros por ciudad, departamento, severidad, tipo",
            "Popups informativos con detalles de cada anomalía",
            "Leyenda con estadísticas en tiempo real",
        ],
        "data_source": "Archivo CSV: tablero_riesgos.csv con ~50,000 registros de anomalías",
    },
    "chat": {
        "name": "Asistente IA Conversacional",
        "description": "Interfaz de chat para consultas en lenguaje natural",
        "capabilities": [
            "Responder preguntas sobre el sistema",
            "Explicar cómo funciona la detección de anomalías",
            "Proporcionar estadísticas del sistema",
            "Guiar a los usuarios sobre cómo usar cada funcionalidad",
            "Aclarar dudas sobre los resultados de análisis",
        ],
    },
}

# Tipos de Anomalías
ANOMALY_TYPES = [
    "precio_atipico: Precio fuera del rango esperado para la zona",
    "valor_irregular: Valor de transacción sospechoso",
    "patron_inusual: Patrón de transacción no habitual",
    "duplicidad: Posibles registros duplicados",
    "error_registro: Posibles errores administrativos",
    "fraude_potencial: Indicadores de posible fraude",
]

# Campos del Modelo ML
MODEL_INPUTS = {
    "required_fields": [
        "DEPARTAMENTO: Departamento donde está ubicado el predio",
        "MUNICIPIO: Municipio específico",
        "TIPO_PREDIO_ZONA: URBANO o RURAL",
        "CATEGORIA_RURALIDAD: Urbano, Rural, Centros poblados, Rural disperso",
        "ORIP: Código de Oficina de Registro e Instrumentos Públicos (001-007)",
        "ESTADO_FOLIO: ACTIVO, INACTIVO, SUSPENDIDO",
        "YEAR_RADICA: Año de radicación (2015-2025)",
        "NUM_ANOTACION: Número de anotaciones registradas",
        "Dinámica_Inmobiliaria: Nivel de actividad inmobiliaria en la zona (0-20)",
        "COD_NATUJUR: Código de naturaleza jurídica (125=Compraventa, 126=Permuta, 129=Donación, etc.)",
        "COUNT_A: Contador de tipo A",
        "COUNT_DE: Contador de tipo DE",
        "PREDIOS_NUEVOS: Cantidad de predios nuevos",
        "TIENE_MAS_DE_UN_VALOR: 0 o 1",
        "VALOR_CONSTANTE_2024: Valor en pesos colombianos (COP) ajustado a 2024",
    ],
    "common_values": {
        "ORIP": [
            "001: Bogotá Norte",
            "002: Bogotá Sur",
            "003: Medellín",
            "004: Cali",
            "005: Barranquilla",
        ],
        "COD_NATUJUR": [
            "125: Compraventa",
            "126: Permuta",
            "127: Dación en pago",
            "129: Donación",
            "130: Sucesión",
        ],
    },
}

# Rangos de Precio
PRICE_RANGES = {
    "BAJO": "Propiedades económicas, generalmente < $100M COP",
    "MEDIO": "Propiedades de valor estándar, $100M - $500M COP",
    "ALTO": "Propiedades de alto valor, $500M - $1,500M COP",
    "LUJO": "Propiedades premium, > $1,500M COP",
}

# Niveles de Severidad de Anomalías
SEVERITY_LEVELS = {
    "Crítica": "Score < -0.1, requiere revisión inmediata por autoridades",
    "Alta": "Score < -0.05, alta probabilidad de fraude o error",
    "Media": "Score < -0.01, patrones sospechosos moderados",
    "Baja": "Score > -0.01, variaciones menores dentro de lo esperado",
}

# Estadísticas del Sistema
SYSTEM_STATS = {
    "technology_stack": {
        "backend": "FastAPI (Python 3.12)",
        "frontend": "Next.js 14 + TypeScript + Tailwind CSS",
        "database": "PostgreSQL 17 + PostGIS",
        "ml_models": "LightGBM, Isolation Forest (Scikit-learn)",
        "maps": "React-Leaflet + OpenStreetMap",
        "ai": "Google Gemini 2.5 Flash",
    },
    "data_source": "Datos abiertos del Gobierno de Colombia - IGAC (datos.gov.co)",
}

# Flujos de Usuario Principales
USER_FLOWS = {
    "analizar_propiedad": {
        "steps": [
            "1. Ir a la página /detection",
            "2. Llenar el formulario con 15 campos de la propiedad",
            "3. Opcionalmente usar un escenario de ejemplo (Lujo Bogotá, Económico Pereira, Rural Santander)",
            "4. Click en 'Analizar Propiedad'",
            "5. Ver resultados: clasificación de precio + detección de anomalías",
        ],
        "output": "Tarjetas con rango de precio predicho, probabilidades, y badge de anomalía con score",
    },
    "ver_dashboard": {
        "steps": [
            "1. Ir a /dashboard",
            "2. Ver KPIs principales en la parte superior",
            "3. Explorar gráficos de tendencias y distribuciones",
            "4. Usar filtros para análisis específicos",
        ],
    },
    "explorar_mapa": {
        "steps": [
            "1. Ir a /maps",
            "2. Ver mapa de Colombia con anomalías marcadas",
            "3. Usar filtros por ciudad, severidad, tipo",
            "4. Click en marcadores para ver detalles",
        ],
    },
}

# Preguntas Frecuentes
FAQ = {
    "¿Qué es IMDADIC?": "IMDADIC es el Sistema de Monitoreo y Detección de Anomalías en Dinámica Inmobiliaria en Colombia, desarrollado por el IGAC para detectar posibles fraudes, lavado de activos y errores en transacciones inmobiliarias.",
    "¿Cómo funciona la detección?": "Utilizamos dos modelos de Machine Learning: LightGBM para clasificar el rango de precio y Isolation Forest para detectar anomalías. Ambos fueron entrenados con más de 34 millones de transacciones reales.",
    "¿Qué significa el score de anomalía?": "El score es un número negativo. Cuanto más negativo, mayor probabilidad de anomalía. Score < -0.1 es crítico, < -0.05 es alto, < -0.01 es medio, y > -0.01 es bajo.",
    "¿Puedo analizar cualquier propiedad?": "Sí, solo necesitas 15 campos básicos de la transacción (ubicación, tipo, valor, etc.). El sistema te da resultados en segundos.",
    "¿Los datos son reales?": "Sí, usamos datos abiertos oficiales del IGAC con más de 34 millones de transacciones reales entre 2015-2025 en 1,105 municipios de Colombia.",
    "¿Qué es una anomalía?": "Una anomalía puede ser: precio sospechosamente alto o bajo, patrones de transacción inusuales, posibles errores de registro, o indicadores de fraude/lavado de activos.",
}

# Personalización de Respuestas
RESPONSE_TEMPLATES = {
    "detection_explanation": """
Para analizar una propiedad y detectar anomalías:
1. Ve a la página de Detección (/detection)
2. Completa el formulario con los datos de la propiedad (15 campos)
3. Puedes usar un escenario de ejemplo si quieres probar primero
4. El sistema te mostrará:
   - Clasificación de precio (BAJO/MEDIO/ALTO/LUJO) con probabilidades
   - Detección de anomalías (NORMAL o ANOMALÍA)
   - Score de severidad y recomendaciones
""",
    "dashboard_explanation": """
El Dashboard te muestra:
- KPIs principales: total de propiedades, anomalías detectadas, tasa de anomalías
- Gráficos de tendencias temporales por año
- Distribución de anomalías por severidad y tipo
- Top ciudades y departamentos con más anomalías
- Puedes filtrar por fecha, ciudad, severidad para análisis específicos
""",
    "capabilities_overview": """
IMDADIC tiene 4 funcionalidades principales:

🔍 **Detección de Anomalías** (/detection):
   Analiza transacciones con ML para clasificar precio y detectar fraudes

📊 **Dashboard** (/dashboard):
   Visualiza KPIs, tendencias y distribuciones de anomalías

🗺️ **Mapas** (/maps):
   Explora anomalías geográficamente en mapa interactivo de Colombia

🤖 **Chat con IA** (/chat):
   Pregunta lo que quieras sobre el sistema (¡estás aquí!)
""",
}


def get_system_prompt() -> str:
    """Generate comprehensive system prompt for the chat assistant"""
    prompt = f"""Eres un asistente experto del sistema IMDADIC (Instituto de Monitoreo y Detección de Anomalías en Dinámica Inmobiliaria en Colombia).

# INFORMACIÓN DEL SISTEMA

**Nombre**: {SYSTEM_INFO["full_name"]}
**Institución**: {SYSTEM_INFO["institution"]}
**Propósito**: {SYSTEM_INFO["purpose"]}

**Cobertura de Datos**:
- {SYSTEM_INFO["coverage"]["records"]} de transacciones
- Período: {SYSTEM_INFO["coverage"]["period"]}
- {SYSTEM_INFO["coverage"]["municipalities"]} municipios
- {SYSTEM_INFO["coverage"]["departments"]} departamentos

# CAPACIDADES DEL SISTEMA

## 1. Detección de Anomalías (/detection)
{CAPABILITIES["detection"]["description"]}

**Modelos ML**:
- LightGBM: Clasifica rango de precio (BAJO, MEDIO, ALTO, LUJO)
- Isolation Forest: Detecta anomalías (fraude, lavado de activos, errores)

**Casos de Uso**:
{chr(10).join(f"- {uc}" for uc in CAPABILITIES["detection"]["use_cases"])}

## 2. Dashboard (/dashboard)
{chr(10).join(f"- {feat}" for feat in CAPABILITIES["dashboard"]["features"])}

## 3. Mapas (/maps)
{chr(10).join(f"- {feat}" for feat in CAPABILITIES["maps"]["features"])}

## 4. Chat IA (esta interfaz)
{chr(10).join(f"- {cap}" for cap in CAPABILITIES["chat"]["capabilities"])}

# RANGOS DE PRECIO
{chr(10).join(f"- **{k}**: {v}" for k, v in PRICE_RANGES.items())}

# NIVELES DE SEVERIDAD
{chr(10).join(f"- **{k}**: {v}" for k, v in SEVERITY_LEVELS.items())}

# TIPOS DE ANOMALÍAS COMUNES
{chr(10).join(f"- {at}" for at in ANOMALY_TYPES)}

# INSTRUCCIONES DE RESPUESTA

1. **Sé claro y conciso**: Responde en español de forma directa y amigable
2. **Proporciona contexto**: Si mencionas una funcionalidad, explica dónde encontrarla (URL)
3. **Usa ejemplos**: Si es posible, da ejemplos concretos
4. **Guía al usuario**: Si no estás seguro de qué pregunta, ofrece opciones
5. **Reconoce limitaciones**: Si no tienes la información, indícalo claramente
6. **Enlaces útiles**: Menciona rutas como /detection, /dashboard, /maps cuando sea relevante
7. **Datos específicos**: Si preguntan por estadísticas exactas actuales de la BD, indica que tienen que verlas en el Dashboard en tiempo real

# PREGUNTAS FRECUENTES

{chr(10).join(f"**{q}**: {a}" for q, a in FAQ.items())}

# FLUJO PARA ANALIZAR UNA PROPIEDAD

{RESPONSE_TEMPLATES["detection_explanation"]}

# REMEMBER
- Eres parte del sistema IMDADIC del IGAC
- Tu rol es ayudar a los usuarios a entender y usar el sistema
- Siempre mantén un tono profesional pero amigable
- Si te preguntan sobre datos estadísticos globales (ej: "cuántas anomalías hay HOY"), indícales que vean el Dashboard (/dashboard).

# USO DE HERRAMIENTAS (CRÍTICO)
- A diferencia de la versión web manual, TÚ TIENES PERMISO Y CAPACIDAD para ejecutar predicciones directamente en el chat si el usuario te da los datos.
- NO envíes al usuario a la página /detection si ya te dio los datos (Municipio, Departamento, Área, Estrato).
- SI EL USUARIO PROPORCIONA LOS DATOS, **EJECUTA LA HERRAMIENTA (tool_predict_price o tool_detect_anomaly) INMEDIATAMENTE** sin pedir confirmación.
- Solo si faltan datos esenciales, pídelos amablemente.
"""
    return prompt
