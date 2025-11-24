# Plan de Implementación: IMDADIC - Visualización y Predicción

Este documento define las tareas necesarias para construir el sistema de visualización y predicción de anomalías inmobiliarias.

## ✅ Fase 0: Documentación y Planificación

- [x] Revisar documentación existente del proyecto
- [x] Crear documento de arquitectura detallada
- [x] Crear plan de implementación completo
- [x] Actualizar README con instrucciones completas
- [x] Definir checklist de tareas (este documento)

## 📋 Fase 1: Infraestructura Base

- [ ] Crear archivo `docker-compose.yml` con servicios
  - [ ] PostgreSQL 17 + PostGIS
  - [ ] Redis
  - [ ] ChromaDB
  - [ ] Backend service
  - [ ] Agent service
  - [ ] Frontend service
- [ ] Crear `.env.example` con variables de entorno
- [ ] Actualizar `.gitignore` para excluir datos sensibles
- [ ] Probar que todos los servicios levanten correctamente
- [ ] Documentar comandos de inicio en README

## 🔧 Fase 2: Backend - Estructura Base

- [ ] Inicializar proyecto Python con estructura de carpetas
- [ ] Crear `requirements.txt` con dependencias
- [ ] Configurar FastAPI app en `app/main.py`
- [ ] Implementar `app/core/config.py` (settings con Pydantic)
- [ ] Implementar `app/core/database.py` (SQLAlchemy setup)
- [ ] Implementar `app/core/security.py` (JWT, hashing)
- [ ] Configurar CORS y middleware
- [ ] Verificar que Swagger UI funcione (`/docs`)

## 🗄️ Fase 3: Backend - Modelos de Base de Datos

- [ ] Crear modelo `Property` (SQLAlchemy + GeoAlchemy2)
  - [ ] Campos: id, cadastral_code, address, municipality, area_m2, location
  - [ ] Index en cadastral_code y municipality
  - [ ] GIST index en location (PostGIS)
- [ ] Crear modelo `Transaction`
  - [ ] Foreign key a Property
  - [ ] Campos: price, transaction_date, buyer_info (JSONB)
- [ ] Crear modelo `Anomaly`
  - [ ] Foreign keys a Property y Transaction
  - [ ] Campos: anomaly_type, severity, confidence_score, explanation
- [ ] Crear modelo `User`
  - [ ] Campos: email, hashed_password, role
- [ ] Crear schemas Pydantic para request/response
- [ ] Configurar Alembic para migraciones
- [ ] Crear migración inicial
- [ ] Aplicar migración y verificar schema en PostgreSQL

## 🌐 Fase 4: Backend - API Endpoints

### Auth

- [ ] `POST /api/v1/auth/login` - Autenticación con JWT
- [ ] `POST /api/v1/auth/refresh` - Refresh token
- [ ] `POST /api/v1/auth/logout` - Cerrar sesión
- [ ] Crear dependency `get_current_user` para proteger rutas

### Properties

- [ ] `GET /api/v1/properties` - Listar con paginación y filtros
- [ ] `GET /api/v1/properties/{id}` - Detalle de propiedad
- [ ] `GET /api/v1/properties/search` - Búsqueda avanzada (bbox geoespacial)
- [ ] Implementar filtros: municipality, price range, area range

### Anomalies

- [ ] `GET /api/v1/anomalies` - Listar anomalías con filtros
- [ ] `GET /api/v1/anomalies/{id}` - Detalle de anomalía
- [ ] `POST /api/v1/anomalies/predict` - Ejecutar predicción
- [ ] Implementar filtros: severity, type, date range

### Dashboard

- [ ] `GET /api/v1/dashboard/stats` - Estadísticas agregadas
- [ ] `GET /api/v1/dashboard/kpis` - Indicadores clave
- [ ] `GET /api/v1/dashboard/heatmap` - Datos GeoJSON para mapa

### Testing

- [ ] Tests unitarios para cada endpoint
- [ ] Tests de integración con base de datos de prueba
- [ ] Verificar autenticación en rutas protegidas

## 🤖 Fase 5: Backend - Detección de Anomalías

- [ ] Crear servicio `anomaly_detector.py`
  - [ ] Función para cargar modelo entrenado (pickle/joblib)
  - [ ] Función para ejecutar predicción
  - [ ] Lógica de feature engineering
- [ ] Crear servicio `ml_models.py`
  - [ ] Singleton para cargar modelo una sola vez
  - [ ] Gestión de versiones de modelo
- [ ] Implementar reglas de negocio complementarias
  - [ ] Detección de flipping rápido
  - [ ] Validación de área inconsistente
  - [ ] Análisis de concentración de compras
- [ ] Crear servicio `cache.py` con Redis
  - [ ] Decorador para cachear resultados
  - [ ] TTL configurables por tipo de query
- [ ] Tests para servicio de detección
- [ ] Integrar con endpoint `/anomalies/predict`

## 🧠 Fase 6: Agente de IA (The Brain)

- [ ] Crear estructura de carpetas `backend/agent/`
- [ ] Crear `agent/requirements.txt` con LangChain y ChromaDB
- [ ] Implementar `agent/main.py` (FastAPI independiente)
- [ ] Configurar LangChain Agent en `agent/agent.py`
  - [ ] System prompt personalizado
  - [ ] Configuración de memoria conversacional
  - [ ] Registro de tools
- [ ] Crear tool `sql_query.py`
  - [ ] Ejecutar queries SQL safe (solo SELECT)
  - [ ] Límites de resultados
  - [ ] Validación de queries peligrosas
- [ ] Crear tool `anomaly_analyzer.py`
  - [ ] Ejecutar análisis de anomalía on-demand
  - [ ] Retornar explicación detallada
- [ ] Crear tool `vector_search.py`
  - [ ] Búsqueda semántica en ChromaDB
  - [ ] Indexar documentación técnica
- [ ] Implementar endpoint `POST /chat`
  - [ ] Recibir mensaje de usuario
  - [ ] Ejecutar agent con tools
  - [ ] Retornar respuesta + tool usage
- [ ] Tests de integración del agente
- [ ] Probar queries de ejemplo manualmente

## 🎨 Fase 7: Frontend - Setup

- [ ] Crear proyecto Next.js con TypeScript

  ```bash
  npx create-next-app@latest frontend --typescript --tailwind --app
  ```

- [ ] Instalar dependencias principales
  - [ ] @tanstack/react-query
  - [ ] deck.gl y react-map-gl
  - [ ] recharts
  - [ ] zustand
  - [ ] ShadcnUI components
- [ ] Configurar `src/lib/api-client.ts`
  - [ ] Cliente HTTP con fetch wrapper
  - [ ] Interceptor para auth headers
  - [ ] Error handling centralizado
- [ ] Configurar React Query provider
- [ ] Configurar layout base con navegación
- [ ] Crear página de login (`/login`)
- [ ] Implementar autenticación en cliente
  - [ ] Guardar JWT en localStorage
  - [ ] Protected routes con middleware

## 🗺️ Fase 8: Frontend - Mapa de Visualización

- [ ] Crear componente `MapPropertyMap.tsx` (Deck.gl)
  - [ ] Configurar Mapbox como base layer
  - [ ] ScatterplotLayer para propiedades
  - [ ] HeatmapLayer para densidad de anomalías
  - [ ] Tooltips interactivos
- [ ] Crear `MapLayers.tsx`
  - [ ] Color coding por severidad
  - [ ] Clustering para alto volumen
  - [ ] Filtros de visualización
- [ ] Crear página `/map`
  - [ ] Layout con mapa principal
  - [ ] Sidebar con filtros (municipality, severity, date range)
  - [ ] Panel de detalles al seleccionar propiedad
- [ ] Integrar con API `/properties/search` (bbox)
- [ ] Implementar búsqueda geoespacial
- [ ] Optimizar rendering para 30M+ puntos
- [ ] Tests de componentes de mapa

## 📊 Fase 9: Frontend - Dashboard

- [ ] Crear página `/dashboard`
  - [ ] Grid layout responsivo
  - [ ] 4 KPI cards principales
  - [ ] Sección de gráficos
- [ ] Crear componente `KPICard.tsx`
  - [ ] Display de valor principal
  - [ ] Trend indicator (↑↓)
  - [ ] Comparación con período anterior
- [ ] Crear `AnomalyChart.tsx` con Recharts
  - [ ] Line chart: anomalías por fecha
  - [ ] Bar chart: anomalías por municipio
  - [ ] Pie chart: distribución por tipo
- [ ] Integrar con API `/dashboard/*`
- [ ] Implementar refresh automático (cada 5 min)
- [ ] Agregar filtros de fecha y ubicación
- [ ] Tests de componentes de dashboard

## 💬 Fase 10: Frontend - Chat Interface

- [ ] Crear página `/chat`
  - [ ] Layout tipo mensajería
  - [ ] Panel izquierdo: historial de conversaciones
  - [ ] Panel derecho: chat activo
- [ ] Crear componente `ChatInterface.tsx`
  - [ ] Message bubbles (user vs agent)
  - [ ] Typing indicator cuando agente está "pensando"
  - [ ] Input field con auto-resize
  - [ ] Markdown rendering para respuestas
- [ ] Crear `useChatts` (custom hook)
  - [ ] Gestión de mensajes con React Query
  - [ ] Streaming de respuestas (si el agente lo soporta)
  - [ ] Persistencia de conversaciones
- [ ] Implementar suggestion chips
  - [ ] Preguntas frecuentes predefinidas
  - [ ] Quick actions (ej: "Ver anomalías críticas")
- [ ] Integrar con API `/agent/chat`
- [ ] Tests de interfaz de chat

## 📝 Fase 11: Documentación Final

- [ ] Crear `docs/api-reference.md`
  - [ ] Documentar todos los endpoints
  - [ ] Ejemplos de request/response
  - [ ] Códigos de error
- [ ] Crear `docs/data-model.md`
  - [ ] Diagrama ER de la base de datos
  - [ ] Descripción de cada tabla
  - [ ] Ejemplos de queries comunes
- [ ] Crear `docs/deployment.md`
  - [ ] Guía de deployment a producción
  - [ ] Variables de entorno necesarias
  - [ ] Backups y disaster recovery
  - [ ] Configuración de monitoring
- [ ] Crear `docs/development-guide.md`
  - [ ] Setup de entorno local
  - [ ] Convenciones de código
  - [ ] Proceso de testing
  - [ ] Workflow de Git
- [ ] Actualizar README con secciones faltantes
- [ ] Crear CHANGELOG.md

## ✅ Fase 12: Testing y Despliegue

### Testing Integral

- [ ] Ejecutar todos los tests backend y verificar coverage > 80%
- [ ] Ejecutar todos los tests frontend
- [ ] Realizar pruebas E2E de flujos completos
  - [ ] Login → Dashboard → Ver anomalía en mapa
  - [ ] Chat con agente → Pregunta sobre anomalía
  - [ ] Búsqueda de propiedad → Predicción de anomalía
- [ ] Performance testing
  - [ ] Cargar 1M+ propiedades en mapa
  - [ ] Medir latencia de endpoints
  - [ ] Verificar que cache funciona

### Deployment

- [ ] Crear `docker-compose.prod.yml`
- [ ] Configurar variables de entorno de producción
- [ ] Setup de logs centralizados
- [ ] Configurar alertas de errores
- [ ] Realizar deployment de prueba
- [ ] Verificar salud de todos los servicios
- [ ] Ejecutar smoke tests en producción

## 🚀 Próximos Pasos (Futuro)

- [ ] Implementar sistema de reportes exportables (PDF/CSV)
- [ ] Agregar notificaciones en tiempo real (WebSockets)
- [ ] Implementar RBAC granular (admin, analyst, viewer)
- [ ] Agregar auditoría de acciones (audit log)
- [ ] Implementar versionado de modelos ML
- [ ] Configurar CI/CD pipeline (GitHub Actions)
- [ ] Migrar a Kubernetes para escalabilidad
- [ ] Implementar observabilidad (Prometheus + Grafana)

---

**Estado Actual**: Fase 0 completada ✅

**Próxima Fase**: Fase 1 - Infraestructura Base

Para comenzar la implementación, revisar el [implementation_plan.md](file:///c:/Users/carlo/.gemini/antigravity/brain/17c664cd-f310-4a26-a372-879213d0e558/implementation_plan.md) para detalles técnicos.
