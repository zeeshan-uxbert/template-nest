# NestJS Plug-and-Play Template

Production-grade NestJS template with modular, toggleable features. Enable only what you need via environment flags.

## Features

- **Authentication** - JWT-based auth with guards, login/register/refresh endpoints
- **Logging** - Winston logger with daily rotation and HTTP request logging
- **Centralized Error Handling** - Global exception filters and response interceptors
- **Localization** - i18next integration with multiple language support
- **S3 Integration** - AWS S3 client for file operations
- **Redis Client** - Full-featured Redis service with caching support
- **BullMQ Queues** - Background job processing with Redis
- **Databases** - Both SQL (TypeORM) and NoSQL (Mongoose) support
- **Strapi Client** - Ready-to-use Strapi API integration
- **Email Service** - Interface-based email service with Nodemailer implementation
- **Notification Service** - Interface-based notification system
- **Swagger/OpenAPI** - Interactive API documentation
- **Linting & Formatting** - ESLint + Prettier with Husky git hooks
- **Rate Limiting** - Built-in request throttling
- **Health Checks** - Memory and system health monitoring

## Project Structure

```
src/
  main.ts                           # Application entry point
  app.module.ts                     # Root module with feature toggles
  config/
    configuration.ts                # Centralized configuration
  common/
    filters/
      http-exception.filter.ts      # Global error handler
    interceptors/
      response.interceptor.ts       # Response wrapper
    middleware/
      request-id.middleware.ts      # Request ID tracking
      http-logger.middleware.ts     # HTTP request logging
    decorators/
      public.decorator.ts           # Public route decorator
      current-user.decorator.ts     # User extraction decorator
    logger/
      winston.logger.ts             # Winston logger service
      winston-logger.module.ts
    i18n/
      i18n.module.ts                # Internationalization
  auth/
    auth.module.ts
    auth.controller.ts
    auth.service.ts
    strategies/
      jwt.strategy.ts               # JWT Passport strategy
    guards/
      jwt-auth.guard.ts             # JWT authentication guard
    dto/
      login.dto.ts
      register.dto.ts
  health/
    health.module.ts
    health.controller.ts            # Health check endpoints
  database/
    typeorm/
      typeorm.module.ts
      data-source.ts                # TypeORM configuration
      entities/
        user.entity.ts
      migrations/
        1700000000000-CreateUsers.ts
    mongoose/
      mongoose.module.ts
      schemas/
        user.schema.ts
  clients/
    s3/
      s3.module.ts
      s3.service.ts                 # AWS S3 operations
    redis/
      redis.module.ts
      redis.service.ts              # Redis operations
    strapi/
      strapi.module.ts
      strapi.service.ts             # Strapi API client
  services/
    email/
      email.module.ts
      email.service.ts              # Email interface
      nodemailer-email.service.ts   # Nodemailer implementation
    notification/
      notification.module.ts
      notification.service.ts       # Notification interface
      log-notification.service.ts   # Log-based implementation
  queues/
    bullmq.module.ts
    processors/
      email-queue.processor.ts
  scripts/
    init-db.ts                      # Database initialization
  i18n/
    en/common.json
    es/common.json
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` to configure your features and credentials.

### 3. Start Local Services (Optional)

Use Docker Compose to start PostgreSQL, MongoDB, and Redis:

```bash
npm run docker:up
```

### 4. Initialize Database (If using TypeORM)

```bash
# Create database if it doesn't exist
npm run db:init

# Run migrations
npm run typeorm:migrate

# Or do both at once
npm run db:setup
```

### 5. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`

Access Swagger documentation at: `http://localhost:3000/api-docs`

## Environment Flags (Feature Toggles)

Control which features are enabled by setting these environment variables to `true` or `false`:

| Variable | Description | Default |
|----------|-------------|---------|
| `FEATURE_AUTH` | JWT authentication system | `true` |
| `FEATURE_LOGGING` | Winston logging | `true` |
| `FEATURE_I18N` | Internationalization | `true` |
| `FEATURE_S3` | AWS S3 integration | `false` |
| `FEATURE_REDIS` | Redis client | `false` |
| `FEATURE_BULLMQ` | BullMQ job queues | `false` |
| `FEATURE_EMAIL` | Email service | `false` |
| `FEATURE_NOTIFICATIONS` | Notification service | `false` |
| `FEATURE_TYPEORM` | TypeORM SQL database | `true` |
| `FEATURE_MONGOOSE` | Mongoose MongoDB | `false` |
| `FEATURE_STRAPI` | Strapi CMS client | `false` |
| `FEATURE_SWAGGER` | API documentation | `true` |

## Key Environment Variables

### Application
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `API_PREFIX` - API route prefix (default: api/v1)

### JWT Authentication
- `JWT_SECRET` - Secret key for access tokens
- `JWT_EXPIRES_IN` - Access token expiration (default: 7d)
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: 30d)

### TypeORM Database
- `DB_TYPE` - Database type (postgres/mysql)
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_DATABASE` - Database name
- `DB_SYNCHRONIZE` - Auto-sync schema (use false in production)
- `DB_LOGGING` - Enable query logging

### MongoDB
- `MONGO_URI` - MongoDB connection string

### Redis
- `REDIS_HOST` - Redis host
- `REDIS_PORT` - Redis port
- `REDIS_PASSWORD` - Redis password (optional)
- `REDIS_DB` - Redis database number

### AWS S3
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_S3_BUCKET` - S3 bucket name

### Email (SMTP)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `EMAIL_FROM` - Default sender email

### Strapi
- `STRAPI_URL` - Strapi instance URL
- `STRAPI_TOKEN` - Strapi API token

### Logging
- `LOG_LEVEL` - Log level (info/debug/warn/error)
- `LOG_DIR` - Log files directory

## Available Scripts

### Development
```bash
npm run dev          # Start with watch mode
npm run start:debug  # Start with debug mode
npm run build        # Build for production
npm run start:prod   # Run production build
```

### Database
```bash
npm run db:init              # Create database if it doesn't exist
npm run db:setup             # Initialize DB and run migrations
npm run typeorm:migrate      # Run all pending migrations
npm run typeorm:revert       # Revert last migration
npm run typeorm:create       # Create new migration file
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Run tests with coverage
npm run test:e2e     # Run end-to-end tests
```

### Docker
```bash
npm run docker:up    # Start Docker services
npm run docker:down  # Stop Docker services
```

## API Documentation (Swagger)

When `FEATURE_SWAGGER=true`, interactive API documentation is available at `/api-docs`.

### Available Endpoints

#### Health
- `GET /api/v1/health` - Health check with memory metrics
- `GET /api/v1/health/ping` - Simple ping endpoint

#### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user (requires JWT)

### Testing Authenticated Endpoints

1. Login or register to get an access token
2. Click "Authorize" button in Swagger UI
3. Enter: `Bearer <your-access-token>`
4. Now you can test protected endpoints

## Authentication

All routes are protected by default using the global JWT guard. To make a route public, use the `@Public()` decorator:

```typescript
@Public()
@Get('public-route')
async publicRoute() {
  return { message: 'This is accessible without authentication' };
}
```

To get the current authenticated user:

```typescript
@Get('profile')
async getProfile(@CurrentUser() user: any) {
  return user;
}
```

## Git Hooks (Husky)

### Pre-commit
Automatically runs on `git commit`:
- Formats staged files with Prettier
- Lints staged files with ESLint
- Prevents commit if linting fails

### Pre-push
Automatically runs on `git push`:
- Runs full lint check on entire codebase
- Prevents push if linting fails

To skip hooks (not recommended):
```bash
git commit --no-verify
git push --no-verify
```

## Extending the Template

### Adding a New Module

1. Generate module:
```bash
nest g module modules/my-feature
nest g controller modules/my-feature
nest g service modules/my-feature
```

2. Add Swagger documentation to controller
3. Import in `app.module.ts`

### Adding a New Migration

```bash
npm run typeorm:create src/database/typeorm/migrations/MyMigration
```

### Swapping Service Implementations

Services like Email and Notification use the interface pattern. To add a new implementation:

1. Create a new service that extends the abstract class
2. Update the provider in the module:

```typescript
{
  provide: EmailService,
  useClass: YourNewEmailService,
}
```

### Adding New Database Entities

1. Create entity in `src/database/typeorm/entities/`
2. Add to entities array in `typeorm.module.ts`
3. Create migration for the entity

## Operational Features

### Request Correlation
Every request automatically receives an `X-Request-Id` header for tracking across logs.

### Graceful Shutdown
The application handles `SIGINT` and `SIGTERM` signals to gracefully close:
- HTTP server
- Database connections (TypeORM, Mongoose)
- Redis connections
- Queue workers

### Response Format
All successful responses follow this format:
```json
{
  "success": true,
  "statusCode": 200,
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/endpoint"
}
```

Error responses:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/endpoint",
  "requestId": "uuid"
}
```

### Logging
When `FEATURE_LOGGING=true`:
- Console logs with colors
- Daily rotating file logs in `logs/` directory
- Automatic log rotation (14 days retention, 20MB max file size)
- Separate error log files

## Security Notes

### Before Production

1. **Change JWT Secrets**: Update `JWT_SECRET` and `JWT_REFRESH_SECRET`
2. **Disable Synchronize**: Set `DB_SYNCHRONIZE=false`
3. **Configure CORS**: Update CORS settings in `main.ts`
4. **Use Environment Variables**: Never commit `.env` file
5. **Update Helmet**: Configure Helmet policies for your needs
6. **Review Rate Limits**: Adjust throttler settings in `app.module.ts`

### Authentication Security
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with expiration
- Refresh token rotation support
- Global JWT guard (opt-out with `@Public()`)

## Troubleshooting

### Database Connection Issues
```bash
# Check if database exists
npm run db:init

# Check database credentials in .env
# Ensure Docker services are running
npm run docker:up
```

### Port Already in Use
Change `PORT` in `.env` or:
```bash
PORT=4000 npm run dev
```

### TypeORM Migration Issues
```bash
# Revert last migration
npm run typeorm:revert

# Check migration status
npm run typeorm -- migration:show -- -d src/database/typeorm/data-source.ts
```

## Performance Tips

1. **Enable Redis** for caching
2. **Use BullMQ** for background jobs
3. **Enable compression** in production
4. **Use CDN** for static assets
5. **Implement query optimization** in TypeORM
6. **Add database indexes** for frequently queried fields

## Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

## Deployment

### Building for Production
```bash
npm run build
```

### Running Production Build
```bash
NODE_ENV=production npm run start:prod
```

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
CMD ["node", "dist/main"]
```

## License

MIT

## Support

For issues and questions:
- Check the [NestJS Documentation](https://docs.nestjs.com)
- Review this README
- Check environment variables in `.env.example`

---

**Built with ❤️ using NestJS**


