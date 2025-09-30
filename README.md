# GoalPlay Inventory API

Microservicio de inventario para la aplicación GoalPlay. Maneja los jugadores poseídos por los usuarios, sus kits y progresión.

## Características

- Gestión de jugadores poseídos
- Sistema de kits de jugadores
- Progresión y experiencia de jugadores
- Sistema de farming/entrenamiento
- Autenticación JWT
- Base de datos configurable (SQLite/PostgreSQL)
- Documentación Swagger integrada

## Instalación

```bash
# Instalar dependencias
npm install
# o
pnpm install

# Configurar variables de entorno
cp .env.example .env
```

## Configuración

Configura las variables de entorno en el archivo `.env`:

```
DB_TYPE=sqlite
DB_DATABASE=inventory.db
JWT_SECRET=your-secret-key
PORT=3001
```

## Desarrollo

```bash
# Modo desarrollo
npm run start:dev

# Construcción
npm run build

# Producción
npm run start:prod
```

## API Endpoints

### Jugadores Poseídos

- `GET /owned-players` - Obtener jugadores del usuario
- `GET /owned-players/:id/kit` - Obtener kit del jugador
- `PUT /owned-players/:id/kit` - Actualizar kit del jugador
- `GET /owned-players/:id/progression` - Obtener progresión del jugador
- `GET /owned-players/:id/farming-status` - Obtener estado de farming
- `POST /owned-players/:id/farming` - Procesar sesión de farming

## Documentación

La documentación Swagger está disponible en: `http://localhost:3001/api`

## Testing

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests e2e
npm run test:e2e
```