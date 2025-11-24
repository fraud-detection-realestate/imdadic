# Guía de Desarrollo - IMDADIC

## Configuración del Entorno Local

### Requisitos Previos

- Docker Desktop >= 24.0
- Python >= 3.11
- Node.js >= 22.21.1 LTS
- Git
- IDE recomendado: VS Code con extensiones:
  - Python
  - ESLint
  - Prettier
  - Docker
  - PostgreSQL Explorer

### Primera Configuration

```bash
# 1. Clonar repositorio
git clone https://github.com/your-org/imdadic.git
cd imdadic

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus claves

# 3. Levantar servicios
docker-compose up -d

# 4. Verificar que todo esté corriendo
docker-compose ps
```

## Desarrollo Backend

### Setup Inicial

```bash
cd backend

# Crear virtual environment
python -m venv venv

# Activar (Windows)
venv\Scripts\activate

# Activar (Linux/Mac)
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Instalar dependencias de desarrollo
pip install pytest pytest-cov black flake8 mypy
```

### Ejecutar Backend Localmente

```bash
# Opción 1: Con uvicorn directamente (recomendado para desarrollo)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Opción 2: Con Docker (más cercano a producción)
docker-compose up backend
```

### Crear Nueva Migración de Base de Datos

```bash
# Generar migración automáticamente desde cambios en models
alembic revision --autogenerate -m "add new column to properties"

# Revisar el archivo generado en alembic/versions/
# Editar si es necesario para agregar lógica custom

# Aplicar migración
alembic upgrade head

# Revertir última migración
alembic downgrade -1
```

### Testing Backend

```bash
# Ejecutar todos los tests
pytest

# Con coverage
pytest --cov=app --cov-report=html
# Ver reporte en htmlcov/index.html

# Solo tests unitarios
pytest tests/unit/ -v

# Solo tests de integración
pytest tests/integration/ -v

# Test específico con output detallado
pytest tests/integration/test_anomalies_api.py::test_predict_anomaly -v -s
```

### Linting y Formateo

```bash
# Formatear código con Black
black app/

# Verificar estilo con flake8
flake8 app/

# Type checking con mypy
mypy app/
```

## Desarrollo Frontend

### Setup Inicial

```bash
cd frontend

# Instalar dependencias
npm install

# Instalar tipos para TypeScript
npm install -D @types/react @types/node
```

### Ejecutar Frontend Localmente

```bash
# Modo desarrollo (hot reload)
npm run dev

# La app estará en http://localhost:3000
```

### Agregar Componentes de ShadcnUI

```bash
# Instalar un componente (ejemplo: Button)
npx shadcn-ui@latest add button

# El componente se agregará en src/components/ui/button.tsx
```

### Testing Frontend

```bash
# Unit tests con Jest
npm test

# Con coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# E2E tests con Playwright
npm run test:e2e

# E2E en modo interactivo
npm run test:e2e -- --ui
```

### Linting y Formateo

```bash
# Linter
npm run lint

# Autofix
npm run lint -- --fix

# Type check
npm run type-check

# Formatear con Prettier
npm run format
```

## Desarrollo del Agente de IA

### Setup

El agente comparte el mismo virtual environment que el backend.

```bash
cd backend/agent

# Instalar dependencias específicas del agente
pip install -r requirements.txt

# Ejecutar agente standalone
uvicorn main:app --reload --port 8001
```

### Probar Tools del Agente

```bash
# Probar SQL Query Tool
python -m tools.sql_query

# Probar Anomaly Analyzer Tool
python -m tools.anomaly_analyzer

# Probar Vector Search Tool
python -m tools.vector_search
```

### Indexar Documentación en ChromaDB

```bash
# Script para cargar documentación en ChromaDB
python scripts/index_documentation.py
```

## Git Workflow

### Branching Strategy

```
main
├── develop
│   ├── feature/backend-api-properties
│   ├── feature/frontend-map-view
│   └── fix/anomaly-detection-bug
```

### Convenciones de Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Tipos**:

- `feat`: Nueva funcionalidad
- `fix`: Bug fix
- `docs`: Cambios en documentación
- `style`: Formateo, sin cambios de código
- `refactor`: Refactorización sin cambio de funcionalidad
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

**Ejemplos**:

```bash
git commit -m "feat(api): add anomaly prediction endpoint"
git commit -m "fix(frontend): resolve map rendering issue on mobile"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(backend): add unit tests for property model"
```

### Pull Request Process

1. **Crear rama desde develop**:

   ```bash
   git checkout develop
   git pull
   git checkout -b feature/my-feature
   ```

2. **Desarrollar y commitear**:

   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

3. **Actualizar con develop antes de PR**:

   ```bash
   git checkout develop
   git pull
   git checkout feature/my-feature
   git rebase develop
   ```

4. **Push y crear PR**:

   ```bash
   git push origin feature/my-feature
   # Crear PR en GitHub hacia develop
   ```

5. **Code Review**:
   - Al menos 1 aprobación requerida
   - Todos los checks de CI deben pasar
   - Resolver comentarios de reviewers

6. **Merge**:
   - Usar "Squash and merge" para mantener historia limpia
   - Eliminar rama después del merge

## Convenciones de Código

### Python (Backend/Agent)

- **Estilo**: PEP 8
- **Formateo**: Black (line length: 100)
- **Imports**: isort
- **Docstrings**: Google style

```python
def predict_anomaly(property_data: dict) -> AnomalyResult:
    """
    Predice si una propiedad es anómala.

    Args:
        property_data: Diccionario con datos de la propiedad
            - price (float): Precio de la transacción
            - area_m2 (float): Área en metros cuadrados
            - municipality (str): Municipio

    Returns:
        AnomalyResult con is_anomaly, confidence_score y explanation

    Raises:
        ValueError: Si property_data tiene campos inválidos
    """
    pass
```

- **Type hints**: Obligatorios en funciones públicas
- **Nombres**:
  - Clases: `PascalCase`
  - Funciones y variables: `snake_case`
  - Constantes: `UPPER_SNAKE_CASE`

### TypeScript (Frontend)

- **Estilo**: ESLint config de Next.js
- **Formateo**: Prettier
- **Componentes**: Functional components con hooks

```typescript
interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
}

export function PropertyMap({ properties, onPropertyClick }: PropertyMapProps) {
  // Component logic
}
```

- **Nombres**:
  - Componentes: `PascalCase`
  - Hooks: `use` prefix, `camelCase`
  - Funciones y variables: `camelCase`
  - Tipos e interfaces: `PascalCase`
  - Archivos: Igual que el componente/función principal

### SQL

- **Keywords**: UPPERCASE
- **Nombres de tablas**: `snake_case`
- **Nombres de columnas**: `snake_case`

```sql
SELECT 
    p.cadastral_code,
    p.municipality,
    COUNT(a.id) AS anomaly_count
FROM properties p
LEFT JOIN anomalies a ON p.id = a.property_id
WHERE p.municipality = 'Bogotá'
GROUP BY p.cadastral_code, p.municipality
ORDER BY anomaly_count DESC;
```

## Debugging

### Backend

```bash
# Ejecutar con debugger de Python
python -m debugpy --listen 5678 --wait-for-client -m uvicorn app.main:app --reload

# En VS Code, usar esta configuración en .vscode/launch.json:
{
  "name": "Python: FastAPI",
  "type": "python",
  "request": "attach",
  "port": 5678,
  "host": "localhost"
}
```

### Frontend

```bash
# Next.js tiene debugging integrado al correr en dev mode
npm run dev

# En VS Code, F12 para abrir Chrome DevTools
# Usar React DevTools extension
```

### PostgreSQL

```bash
# Conectar a PostgreSQL via Docker
docker-compose exec postgres psql -U imdadic -d imdadic_db

# Ver queries lentas (habilitar en postgresql.conf)
SELECT * FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;

# Ver locks activos
SELECT * FROM pg_locks;

# Ver índices de una tabla
\d properties
```

### Redis

```bash
# Conectar a Redis CLI
docker-compose exec redis redis-cli

# Ver todas las keys
KEYS *

# Ver valor de una key
GET "anomaly_cache:property_123"

# Limpiar cache
FLUSHALL
```

## Troubleshooting Común

### Puerto ya en uso

```bash
# Error: "Address already in use"
# Encontrar proceso usando el puerto
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Linux/Mac

# Matar proceso
taskkill /PID <pid> /F        # Windows
kill -9 <pid>                 # Linux/Mac
```

### Migraciones fuera de sincronía

```bash
# Error: "Target database is not up to date"
# Ver estado actual
alembic current

# Ver historial
alembic history

# Forzar a versión específica
alembic stamp <revision>

# Recrear desde cero (CUIDADO: borra datos)
alembic downgrade base
alembic upgrade head
```

### Módulos de Python no encontrados

```bash
# Error: "ModuleNotFoundError"
# Verificar que venv esté activado
which python  # Debe apuntar a venv/bin/python

# Reinstalar dependencias
pip install -r requirements.txt

# Limpiar cache y reinstalar
pip cache purge
pip install --no-cache-dir -r requirements.txt
```

### npm install falla

```bash
# Error: "ERESOLVE unable to resolve dependency tree"
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Si persiste, usar --legacy-peer-deps
npm install --legacy-peer-deps
```

## Performance Tips

### Backend

- **Usar índices apropiados**:
  - B-tree para búsquedas exactas
  - GiST para búsquedas geoespaciales
  - GIN para búsquedas en JSONB

- **Paginar resultados**: Siempre usar `limit` y `offset`

- **Cachear queries costosas**:

  ```python
  @cache_result(ttl=3600)
  def get_dashboard_stats():
      # Query costosa
      pass
  ```

- **Usar async cuando sea posible**:

  ```python
  @router.get("/properties")
  async def list_properties(db: AsyncSession = Depends(get_db)):
      result = await db.execute(select(Property))
      return result.scalars().all()
  ```

### Frontend

- **Code splitting**:

  ```typescript
  const MapView = dynamic(() => import('./components/Map'), {
    ssr: false,
    loading: () => <LoadingSpinner />
  })
  ```

- **Memoization**:

  ```typescript
  const filteredProperties = useMemo(
    () => properties.filter(p => p.municipality === selectedMunicipality),
    [properties, selectedMunicipality]
  );
  ```

- **Virtual scrolling** para listas largas (usar react-window)

- **Lazy loading de imágenes**:

  ```typescript
  <Image 
    src={imageUrl} 
    loading="lazy" 
    alt="Property"
  />
  ```

## Security Checklist

- [ ] Nunca commitear archivos `.env` con valores reales
- [ ] Usar variables de entorno para secrets
- [ ] Validar todos los inputs de usuario (Pydantic)
- [ ] Sanitizar queries SQL (usar ORMs, no raw SQL)
- [ ] Implementar rate limiting en API
- [ ] Usar HTTPS en producción
- [ ] Mantener dependencias actualizadas
- [ ] Hacer code review de security antes de merge

## Recursos Adicionales

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [LangChain Documentation](https://python.langchain.com/)
- [PostGIS Documentation](https://postgis.net/docs/)
- [Deck.gl Documentation](https://deck.gl/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

## Contacto del Equipo

- **Tech Lead**: [nombre@igac.gov.co]
- **Backend Lead**: [nombre@igac.gov.co]
- **Frontend Lead**: [nombre@igac.gov.co]
- **Data Science**: [nombre@igac.gov.co]
