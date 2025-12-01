# IMDADIC: Inteligencia para el Monitoreo y Detección Avanzada de Dinámicas Inmobiliarias en Colombia

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Sistema para la detección y análisis de anomalías en transacciones inmobiliarias en Colombia.

## 🚀 Características Principales

- **Visualización Geoespacial**: Mapas interactivos con Deck.gl/Mapbox

## Tecnologías

### Backend

- **Python 3.12** con FastAPI
- **PostgreSQL 17 + PostGIS**
- **Redis** para caché
- **SQLAlchemy 2.0** como ORM
- **Celery** para tareas asíncronas

### Frontend

- **Next.js 14** con TypeScript
- **Tailwind CSS** + **Shadcn/ui**
- **Deck.gl** / **Mapbox GL**
- **React Query** y **Zustand**

### Inteligencia Artificial

- **LangChain** para orquestación
- **ChromaDB** para búsqueda vectorial
- **Scikit-learn/XGBoost**
- **OpenAI API**

## Estructura del Proyecto

```bash
imdadic/
├── backend/             # Backend en FastAPI
│   ├── app/             
│   │   ├── api/         # Endpoints
│   │   ├── core/        # Configuraciones
│   │   ├── models/      # Modelos de BD
│   │   ├── schemas/     # Esquemas Pydantic
│   │   └── services/    # Lógica de negocio
│   └── requirements.txt
│
├── docs/                # Documentacion del proyecto
│
├── frontend/            # Frontend en Next.js
│   ├── src/
│   │   ├── app/         # Rutas
│   │   ├── components/  # Componentes
│   │   └── lib/         # Utilidades
│
├── ml_models/           # Modelos de ML
│   └── v1/              # Análisis
├── .gitignore
├── LICENSE              #  MIT
└── README.md
```

## Empezando

### Requisitos

- Docker y Docker Compose
- Python 3.12 (para desarrollo)
- Node.js 18+ (para desarrollo)

### Instalación Rápida con Docker

```bash
git clone https://github.com/tu-organizacion/imdadic.git
cd imdadic
cp .env.example .env
docker-compose up -d
```

### Desarrollo Local

1. **Backend**:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

2. **Frontend**:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Documentación

- [API Docs](http://localhost:8000/docs)
- [Arquitectura](./docs/ARCHITECTURE.md)
- [Guía de Desarrollo](./docs/DEVELOPMENT.md)

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

## Autores

- Juan Carlos Charfuelan
- Keyla Daniela Cartagena
- Dylber Denylson Cabrera

---

**Nota**: Este proyecto está en desarrollo activo. Para contribuir o reportar issues, por favor usa el [Correo del Lider](cartagenadiazkeyladaniela@gmail.com).
