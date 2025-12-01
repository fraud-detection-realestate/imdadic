# IMDADIC: Inteligencia para el Monitoreo y Detección Avanzada de Dinámicas Inmobiliarias en Colombia

## Tabla de Contenidos

- [Visión General](#visión-general)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación](#documentación)
- [Contribuir](#contribuir)

## Visión General

El objetivo es centralizar, estandarizar y analizar más de 30 millones de registros inmobiliarios en Colombia para identificar:

- **Anomalías de Valor**: Precios fuera del mercado (posible lavado o evasión)
- **Inconsistencias de Datos**: Errores de digitación en áreas o direcciones
- **Patrones de Fraude**: "Flipping" rápido o concentraciones inusuales

El sistema expone estos hallazgos a través de un tablero interactivo asistido por un **Agente Inteligente** que explica por qué un registro es anómalo.

### Características Principales

✅ **Visualización Geoespacial**: Mapas de calor interactivos con Deck.gl/Mapbox
✅ **Detección Automática**: Modelos ML + reglas de negocio para identificar anomalías
✅ **Agente de IA**: Chat conversacional que explica hallazgos y responde consultas
✅ **Dashboard Analítico**: KPIs en tiempo real y gráficos de tendencias
✅ **API RESTful**: Backend escalable con FastAPI
✅ **Base de Datos Geoespacial**: PostgreSQL + PostGIS para análisis espacial

## Tecnologías

### Backend

- **Python 3.12** - Lenguaje principal
- **FastAPI** - Framework web asíncrono
- **PostgreSQL 17 + PostGIS** - Base de datos relacional y geoespacial
- **SQLAlchemy 2.0** - ORM
- **Redis** - Cache y sistema de colas
- **Celery** - Procesamiento asíncrono de tareas

### AI/ML

- **LangChain** - Orquestación del agente de IA
- **ChromaDB** - Base de datos vectorial para embeddings
- **Scikit-learn / XGBoost** - Modelos de detección de anomalías
- **OpenAI API** - LLM para el agente conversacional (o alternativas como Anthropic)

### Frontend

- **React 19** - Librería UI
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS + ShadcnUI** - Estilos y componentes
- **Deck.gl / Mapbox GL** - Visualización geoespacial
- **React Query** - Gestión de estado del servidor
- **Zustand** - Gestión de estado del cliente
- **Recharts** - Gráficos y visualizaciones

### DevOps

- **Docker & Docker Compose** - Contenerización
- **Node.js 22 LTS** - Runtime para frontend
- **Git** - Control de versiones

## Arquitectura

El sistema sigue una arquitectura de **microservicios** con tres componentes principales:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Dashboard   │  │   Map View   │  │  Chat with   │  │
│  │   & KPIs     │  │  (Deck.gl)   │  │  The Brain   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                    ┌───────┴────────┐
                    │                │
         ┌──────────▼─────────┐   ┌─▼──────────────────┐
         │   Backend API      │   │  Agente de IA      │
         │   (FastAPI)        │   │  (LangChain)       │
         │                    │   │                    │
         │  ┌──────────────┐  │   │  ┌──────────────┐  │
         │  │ Properties   │  │   │  │ SQL Tool     │  │
         │  │ Anomalies    │  │   │  │ Vector Search│  │
         │  │ Dashboard    │  │   │  │ ML Analyzer  │  │
         │  └──────────────┘  │   │  └──────────────┘  │
         └──────────┬─────────┘   └──────────┬─────────┘
                    │                        │
         ┌──────────┴────────────────────────┴─────────┐
         │                                              │
    ┌────▼─────────────┐  ┌────────────┐  ┌───────────▼──┐
    │ PostgreSQL +     │  │   Redis    │  │  ChromaDB    │
    │   PostGIS        │  │  (Cache)   │  │  (Vectors)   │
    └──────────────────┘  └────────────┘  └──────────────┘
```

Para más detalles, ver [docs/architecture.md](./docs/architecture.md).

## Instalación

### Prerrequisitos

- **Docker** >= 24.0
- **Docker Compose** >= 2.20
- **Python** >= 3.11 (para desarrollo local)
- **Node.js** >= 22.21.1 LTS (para desarrollo local)
- **Git**

### Inicio Rápido (con Docker)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-organizacion/imdadic.git
cd imdadic

# 2. Copiar archivo de entorno
cp .env.example .env

# 3. Editar variables de entorno necesarias
# Edita .env y configura:
# - DATABASE_URL
# - REDIS_URL
# - OPENAI_API_KEY (u otro proveedor de LLM)

# 4. Levantar todos los servicios
docker-compose up -d

# 5. Ejecutar migraciones de base de datos
docker-compose exec backend alembic upgrade head

# 6. (Opcional) Seed de datos de prueba
docker-compose exec backend python scripts/seed_data.py

# 7. Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend API Docs: http://localhost:8000/docs
# Agente: http://localhost:8001
```

### Verificar Instalación

```bash
# Verificar que todos los contenedores estén corriendo
docker-compose ps

# Debes ver 6 servicios "Up":
# - postgres
# - redis
# - chromadb
# - backend
# - agent
# - frontend

# Verificar salud de la API
curl http://localhost:8000/api/v1/health

# Debe retornar: {"status": "ok"}
```

## Desarrollo

### Backend (FastAPI)

```bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar en modo desarrollo (con hot reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Ejecutar tests
pytest tests/ -v --cov=app

# Crear nueva migración
alembic revision --autogenerate -m "descripción del cambio"

# Aplicar migraciones
alembic upgrade head
```

### Frontend (Next.js)

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar tests
npm test

# Build de producción
npm run build

# Linter
npm run lint

# Type check
npm run type-check
```

### Agente de IA

```bash
cd backend/agent

# Instalar dependencias (en el mismo venv del backend)
pip install -r requirements.txt

# Ejecutar en modo desarrollo
uvicorn main:app --reload --port 8001

# Probar herramientas del agente
python -m tools.sql_query
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (copia `.env.example`):

```bash
# Database
DATABASE_URL=postgresql://imdadic:password@localhost:5432/imdadic_db

# Redis
REDIS_URL=redis://localhost:6379/0

# ChromaDB
CHROMADB_HOST=localhost
CHROMADB_PORT=8002

# API
API_SECRET_KEY=your-secret-key-change-this-in-production
API_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# LLM (elige uno)
OPENAI_API_KEY=sk-...
# o
ANTHROPIC_API_KEY=sk-ant-...

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_AGENT_URL=http://localhost:8001

# Mapbox (para visualización de mapas)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...
```

## Estructura del Proyecto

```bash
imdadic/
├── backend/                      # Backend API (FastAPI)
│   ├── app/
│   │   ├── api/                  # Endpoints REST (v1)
│   │   │   └── v1/
│   │   │       ├── properties.py
│   │   │       ├── anomalies.py
│   │   │       ├── dashboard.py
│   │   │       └── auth.py
│   │   ├── core/                 # Configuración y seguridad
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/               # Modelos SQLAlchemy
│   │   │   ├── property.py
│   │   │   ├── transaction.py
│   │   │   ├── anomaly.py
│   │   │   └── user.py
│   │   ├── schemas/              # Schemas Pydantic
│   │   ├── services/             # Lógica de negocio
│   │   │   ├── anomaly_detector.py
│   │   │   ├── ml_models.py
│   │   │   └── cache.py
│   │   └── main.py               # Punto de entrada
│   ├── agent/                    # MICROSERVICIO DEL AGENTE
│   │   ├── tools/                # Herramientas que el agente puede usar
│   │   │   ├── sql_query.py
│   │   │   ├── anomaly_analyzer.py
│   │   │   └── vector_search.py
│   │   ├── prompts/              # Templates de instrucciones para el LLM
│   │   ├── memory/               # Historial de conversación
│   │   ├── agent.py              # Configuración de LangChain Agent
│   │   └── main.py               # Punto de entrada
│   ├── tests/                    # Tests (pytest)
│   ├── alembic/                  # Migraciones de DB
│   ├── scripts/                  # Scripts de utilidad
│   └── requirements.txt
│
├── frontend/                     # Frontend SPA (Next.js + React)
│   ├── src/
│   │   ├── app/                  # App router (Next.js 14+)
│   │   │   ├── dashboard/
│   │   │   ├── map/
│   │   │   ├── chat/
│   │   │   └── layout.tsx
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── Map/
│   │   │   ├── Dashboard/
│   │   │   ├── Chat/
│   │   │   └── ui/               # ShadcnUI components
│   │   ├── lib/                  # Utilidades y configuración
│   │   │   ├── api-client.ts
│   │   │   └── utils.ts
│   │   ├── hooks/                # Custom React hooks
│   │   │   └── useChat.ts
│   │   └── types/                # TypeScript types
│   ├── public/                   # Archivos estáticos
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                         # Documentación
│   ├── architecture.md           # Arquitectura detallada
│   ├── documentation-project.md  # Descripción del proyecto
│   ├── task.md                   # Plan de tareas
│   ├── api-reference.md          # Referencia de API
│   ├── data-model.md             # Modelo de datos
│   ├── deployment.md             # Guía de deployment
│   └── development-guide.md      # Guía de desarrollo
│
├── data/                         # Scripts de datos (ignorado en git)
│   ├── migrations/
│   └── seed/
│
├── docker-compose.yml            # Orquestación de servicios
├── .env.example                  # Template de variables de entorno
├── .gitignore
└── README.md                     # Este archivo
```

## Documentación

- **[architecture.md](./docs/architecture.md)**: Arquitectura detallada del sistema
- **[documentation-project.md](./docs/documentation-project.md)**: Descripción y objetivos del proyecto
- **[task.md](./docs/task.md)**: Plan de tareas y roadmap
- **[API Reference](http://localhost:8000/docs)**: Documentación interactiva de la API (Swagger UI)

## Uso

### Dashboard

Accede a `http://localhost:3000/dashboard` para ver:

- **KPIs**: Total de propiedades, anomalías detectadas, tasa de anomalías
- **Gráficos**: Tendencias temporales, distribución por municipio, tipos de anomalías
- **Filtros**: Por fecha, severidad, tipo de anomalía, ubicación

### Mapa de Calor

Accede a `http://localhost:3000/map` para:

- Visualizar propiedades con anomalías en el mapa
- Filtrar por tipo de anomalía, severidad, ubicación
- Hacer clic en propiedades para ver detalles
- Exportar datos filtrados

### Chat con The Brain

Accede a `http://localhost:3000/chat` para:

- Hacer preguntas sobre anomalías: *"¿Por qué la propiedad X es sospechosa?"*
- Consultar estadísticas: *"¿Cuántas anomalías hay en Bogotá?"*
- Buscar patrones: *"Muéstrame las anomalías más críticas del último mes"*

## API Endpoints

### Autenticación

- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/refresh` - Refrescar token
- `POST /api/v1/auth/logout` - Cerrar sesión

### Propiedades

- `GET /api/v1/properties` - Listar propiedades (con paginación y filtros)
- `GET /api/v1/properties/{id}` - Detalle de propiedad
- `GET /api/v1/properties/search` - Búsqueda avanzada

### Anomalías

- `GET /api/v1/anomalies` - Listar anomalías
- `GET /api/v1/anomalies/{id}` - Detalle de anomalía
- `POST /api/v1/anomalies/predict` - Predecir anomalía en nueva transacción

### Dashboard

- `GET /api/v1/dashboard/stats` - Estadísticas generales
- `GET /api/v1/dashboard/kpis` - Indicadores clave
- `GET /api/v1/dashboard/heatmap` - Datos GeoJSON para mapa

Ver documentación completa en: `http://localhost:8000/docs`

## Testing

### Backend

```bash
# Ejecutar todos los tests
cd backend
pytest

# Con coverage
pytest --cov=app --cov-report=html

# Solo tests unitarios
pytest tests/unit/

# Solo tests de integración
pytest tests/integration/

# Test específico
pytest tests/integration/test_anomalies_api.py -v
```

### Frontend

```bash
cd frontend

# Unit tests
npm test

# Con coverage
npm test -- --coverage

# E2E tests
npm run test:e2e

# Test específico
npm test -- MapPropertyMap
```

## Deployment

### Producción con Docker

```bash
# Build de imágenes
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

Ver [docs/deployment.md](./docs/deployment.md) para instrucciones detalladas de deployment en producción.

## Contribuir

### Workflow de Desarrollo

1. Crear rama desde `main`: `git checkout -b feature/descripcion`
2. Hacer commits descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
3. Ejecutar tests y linter antes de commit
4. Push y crear Pull Request
5. Esperar code review y aprobación
6. Merge a `main`

### Convenciones de Código

- **Python**: Seguir PEP 8, usar Black para formateo
- **TypeScript**: Seguir ESLint config, usar Prettier
- **Commits**: `type(scope): description` (ej: `feat(api): add anomaly prediction endpoint`)

## Troubleshooting

### Error: "Connection refused" al conectar a la base de datos

**Solución**: Verificar que PostgreSQL esté corriendo:

```bash
docker-compose ps postgres
docker-compose logs postgres
```

### Error: Frontend no carga el mapa

**Solución**: Verificar que `NEXT_PUBLIC_MAPBOX_TOKEN` esté configurado en `.env`:

```bash
grep MAPBOX .env
```

Si no existe, obtener token gratuito en [mapbox.com](https://www.mapbox.com/)

### Error: Agente no responde a queries

**Solución**: Verificar que `OPENAI_API_KEY` esté configurado y tenga crédito:

```bash
docker-compose logs agent | grep -i "api key"
```

## Licencia

[MIT License](./LICENSE)

## Contacto

- **Proyecto**: IMDADIC - Instituto de Monitoreo y Detección de Anomalías en Dinámica Inmobiliaria en Colombia
- **Institución**: Instituto Geográfico Agustín Codazzi (IGAC)
- **Repositorio**: [github.com/tu-organizacion/imdadic](https://github.com/tu-organizacion/imdadic)

---

**Nota**: Este proyecto está en desarrollo activo. Para contribuir o reportar issues, por favor usa el [issue tracker de GitHub](https://github.com/tu-organizacion/imdadic/issues).
