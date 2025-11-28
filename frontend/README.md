# Frontend — IMDADIC

Aplicación web moderna para el monitoreo y análisis de anomalías en el mercado inmobiliario colombiano. Desarrollada con tecnologías de vanguardia para ofrecer una experiencia de usuario fluida y potentes capacidades de visualización de datos.

## 🚀 Características principales

- **Dashboard ejecutivo** con KPIs y gráficos interactivos
- **Mapa georreferenciado** para visualización espacial de anomalías
- **Chat con agente IA** para consultas naturales sobre los datos
- **Diseño responsive** que se adapta a cualquier dispositivo
- **Tema claro/oscuro** para mejor experiencia visual

## 🛠️ Tecnologías principales

- **Framework**: Next.js 14 (App Router) + React 18
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Visualización de datos**: Recharts (gráficos), Leaflet (mapas)
- **Mapas**: React-Leaflet + OpenStreetMap
- **Backend Integration**: FastAPI + Google Gemini
- **UI/UX**: Componentes personalizados con accesibilidad
- **Rutas**: Next.js App Router con Server Actions
- **Tipado**: TypeScript estricto

---

## 🚀 Instalación y ejecución

### Requisitos previos

- Node.js 18+ y npm 9+
- Variables de entorno configuradas (ver sección correspondiente)

### Configuración inicial

1. Instalar dependencias:

```bash
cd frontend
npm install
```

2. Configurar variables de entorno:

```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales
```

3. Iniciar servidor de desarrollo:

```bash
npm run dev
```

### Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Compila la aplicación para producción |
| `npm start` | Inicia el servidor de producción (ejecutar después de build) |
| `npm run lint` | Ejecuta ESLint para análisis de código |
| `npm run type-check` | Verificación de tipos TypeScript |
| `npm test` | Ejecuta las pruebas unitarias |
| `npm run format` | Formatea el código con Prettier |

---

## ⚙️ Configuración

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# API y servicios externos
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_AGENT_URL=http://localhost:8001
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# Configuración de la aplicación
NEXT_PUBLIC_APP_ENV=development # development | staging | production
NEXT_PUBLIC_APP_NAME=IMDADIC
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Características experimentales (opcionales)
NEXT_PUBLIC_ENABLE_EXPERIMENTAL_FEATURES=false
```

### Configuración de estilos

La aplicación utiliza Tailwind CSS con las siguientes configuraciones principales:

- **Tema claro/oscuro** basado en preferencias del sistema
- **Paleta de colores** personalizada en `tailwind.config.js`
- **Tipografía**: Inter (sistema por defecto)
- **Breakpoints** personalizados para diseño responsive

---

## 🏗️ Arquitectura

### Estructura de carpetas

```
frontend/
├── app/                    # Rutas de la aplicación (App Router)
│   ├── actions/            # Server Actions
│   │   ├── dashboard.ts    # Acciones para datos del dashboard
│   │   └── map.ts          # Acciones para datos del mapa
│   ├── api/                # API routes (Next.js)
│   │   └── chat/           # Proxy para chat con backend
│   ├── dashboard/          # Dashboard ejecutivo con datos reales
│   ├── maps/               # Mapa interactivo geoespacial
│   ├── chat/               # Interfaz de chat con IA
│   ├── statistics/         # Estadísticas avanzadas
│   ├── anomaly/            # Detalles de anomalías
│   ├── globals.css         # Estilos globales
│   └── layout.tsx          # Layout principal
│
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── shared/         # Componentes compartidos (Card, Icon)
│   │   ├── dashboard/      # Componentes del dashboard
│   │   ├── map/            # Componentes de mapas (Leaflet)
│   │   ├── statistics/     # Componentes de estadísticas
│   │   ├── chat/           # Componentes del chat
│   │   └── widgets/        # Widgets (ChatWidget)
│   │
│   ├── types/              # Tipos TypeScript
│   │   └── anomaly.ts      # Tipos de anomalías
│   │
│   └── styles/             # Estilos globales y temas
│
├── files/                  # Archivos de datos
│   └── tablero_riesgos.csv # Datos de anomalías
│
├── public/                 # Archivos estáticos
│   ├── images/             # Imágenes
│   └── icons/              # Íconos SVG
│
├── tests/                  # Pruebas
├── .eslintrc.js            # Configuración ESLint
├── tailwind.config.js      # Configuración Tailwind
├── tsconfig.json           # Configuración TypeScript
└── package.json
```

### Flujo de datos

1. **Carga inicial**:
   - La aplicación carga el layout principal
   - Se inicializan los providers (Theme, QueryClient, etc.)
   - Se cargan los datos iniciales vía React Query

2. **Navegación**:
   - El enrutamiento se maneja con Next.js App Router
   - Carga de rutas dinámicas bajo demanda
   - Prefetching de rutas frecuentes

3. **Manejo de estado**:
   - **Estado local**: `useState`, `useReducer`
   - **Estado global**: Zustand para estado compartido
   - **Datos del servidor**: React Query para caché y sincronización

### Componentes clave

- **Dashboard**: Visualización de KPIs, gráficos y tendencias con datos reales del CSV
- **Mapa Geoespacial**: Visualización interactiva con Leaflet y filtros avanzados
- **Chat**: Interfaz conversacional con agente IA (Google Gemini)
- **Estadísticas**: Análisis avanzado con gráficos de tendencias y distribuciones
- **Filtros**: Componentes reutilizables para filtrar datos
- **Tarjetas**: Presentación de datos en tarjetas interactivas

---

### Integración de Datos Reales (CSV)

Se ha integrado el archivo `tablero_riesgos.csv` en el dashboard y las estadísticas:

- **Server Actions**: `src/app/actions/dashboard.ts` procesa y agrega datos del CSV
- **Dashboard**: Muestra KPIs, tendencias temporales y distribución por severidad
- **Estadísticas**: Gráficos de evolución temporal, distribución por tipo y comparativo geográfico

### Chat con Backend

El chat está completamente integrado con el backend FastAPI:

- **API Route**: `/api/chat` actúa como proxy hacia el backend
- **Backend**: `http://127.0.0.1:8000/api/v1/chat` (Google Gemini)
- **Componentes**: Tanto `/chat` como el `ChatWidget` usan la API real

### Mapa Geoespacial Interactivo

Implementación completa de mapa interactivo en `/maps`:

**Tecnologías:**

- React-Leaflet para renderizado de mapas
- OpenStreetMap como proveedor de tiles (sin API key)
- Marcadores personalizados por severidad

**Características:**

- Visualización de anomalías con coordenadas geográficas
- Popups informativos con detalles de cada anomalía
- Filtros por ciudad, severidad y tipo
- Leyenda con estadísticas en tiempo real
- Diseño responsivo y accesible

**Datos:**

- Mapeo de coordenadas para principales ciudades colombianas
- Procesamiento de hasta 5000 puntos del CSV
- Clasificación por severidad basada en score

---

## 🔄 Integración con backend

### Endpoints principales

#### Chat API (`/api/chat`)

- `POST /api/chat` - Envía un mensaje al agente de IA

  ```typescript
  interface ChatRequest {
    message: string;
    context?: Record<string, any>;
  }
  
  interface ChatResponse {
    response: string;
    citations?: Array<{
      type: 'sql' | 'elastic' | 'document';
      description: string;
      snippet: string;
    }>;
  }
  ```

#### Dashboard API

- `GET /api/dashboard/summary` - Resumen ejecutivo
- `GET /api/dashboard/trends` - Tendencias temporales
- `GET /api/anomalies` - Lista de anomalías

### Manejo de errores

La aplicación implementa un sistema de manejo de errores consistente:

1. **Errores de red**: Mostrar mensajes amigables al usuario
2. **Errores de validación**: Resaltar campos inválidos
3. **Errores del servidor**: Notificar al usuario y registrar para análisis

## 🎨 Guía de estilos

### Convenciones de código

- **Componentes**: PascalCase (ej. `DashboardCard.tsx`)
- **Hooks**: prefijo `use` (ej. `useAnomalies.ts`)
- **Utilidades**: camelCase (ej. `formatCurrency.ts`)
- **Tipos**: PascalCase con sufijo `Type` (ej. `AnomalyType.ts`)

### Patrones de diseño

1. **Atomic Design**:
   - Átomos: Botones, inputs, etiquetas
   - Moléculas: Formularios, tarjetas
   - Organismos: Secciones completas

2. **Composición**: Componentes pequeños y reutilizables

3. **Renderizado**:
   - Server Components por defecto
   - Client Components solo cuando es necesario

## 🧪 Testing

La aplicación incluye pruebas unitarias y de integración:

```bash
# Ejecutar pruebas
npm test

# Ejecutar pruebas en modo watch
npm test -- --watch

# Generar cobertura
npm run test:coverage
```

### Estrategia de pruebas

- **Unitarias**: Componentes individuales
- **Integración**: Flujos de usuario
- **E2E**: Flujos completos (Cypress)

## 🚀 Despliegue

### Requisitos de producción

- Node.js 18+
- Servidor compatible con Next.js
- Variables de entorno configuradas

### Pasos para despliegue

1. Construir la aplicación:

   ```bash
   npm run build
   ```

2. Iniciar el servidor de producción:

   ```bash
   npm start
   ```

### Variables de entorno requeridas en producción

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.tudominio.com/v1
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_mapbox
```

## 📚 Recursos adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)
- [React Query Documentation](https://tanstack.com/query/latest)

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  Desarrollado por el equipo de IMDADIC - 2025
</div>

- La UI realiza fetches a `NEXT_PUBLIC_API_URL` para endpoints REST (propiedades, anomalías, dashboard stats).
- Las consultas de conversación / IA llaman a `NEXT_PUBLIC_AGENT_URL` para obtener respuestas del agente conversacional y acciones sugeridas.
- Geometrías y datos geoespaciales provienen del backend (GeoJSON) y se consumen con deck.gl / mapbox.

---

## Testing y calidad

- Tests unitarios y E2E (según configuración del proyecto): `npm test` (o `npm run test:e2e`)
- Linter: `npm run lint`
- Type-check: `npm run type-check`

---

## Recursos y convenciones de desarrollo

- Componentes UI: preferir componentes atómicos en `src/components/shared` y componentes de dominio en `src/components/*`.
- Estado del servidor: React Query (@tanstack/react-query) para caché, invalidación y fetching.
- Estado local/ventana: Zustand cuando se requiere estado global simple (filtros, UI state).

---
