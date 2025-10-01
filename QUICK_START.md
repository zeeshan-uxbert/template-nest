# Quick Start Guide

Get up and running with the NestJS template in under 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Docker (optional, for local databases)

## Installation Steps

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Configure Environment (1 min)

The template includes a pre-configured `.env.example` file. Copy it:

```bash
cp .env.example .env
```

For quick testing, the default values work out of the box!

### 3. Start Local Databases (Optional - 1 min)

If you have Docker installed and want to use databases:

```bash
npm run docker:up
```

This starts PostgreSQL, MongoDB, and Redis containers.

### 4. Initialize Database (Optional - 1 min)

If using TypeORM (enabled by default):

```bash
npm run db:setup
```

This creates the database and runs migrations.

### 5. Start the Server (30 seconds)

```bash
npm run dev
```

That's it! 🎉

## Test Your Setup

### Check the Server

Open your browser and visit:
- API: http://localhost:3000/api/v1/health/ping
- Swagger Docs: http://localhost:3000/api-docs

### Test Authentication

**1. Register a new user:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**2. Login:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Copy the `accessToken` from the response.

**3. Access protected endpoint:**

```bash
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Using Swagger UI (Easiest!)

1. Visit http://localhost:3000/api-docs
2. Click "Authorize" button
3. Test the `/auth/register` endpoint
4. Copy the accessToken from response
5. Click "Authorize" again and paste: `Bearer YOUR_TOKEN`
6. Now test the `/auth/me` endpoint

## What's Enabled by Default?

✅ Authentication (JWT)
✅ Logging (Winston)
✅ i18n (Internationalization)
✅ TypeORM (PostgreSQL)
✅ Swagger Documentation

❌ S3 (AWS)
❌ Redis
❌ BullMQ
❌ Email
❌ Notifications
❌ MongoDB
❌ Strapi

## Enable Additional Features

Edit `.env` and set features to `true`:

```bash
# Enable Redis
FEATURE_REDIS=true

# Enable Email
FEATURE_EMAIL=true
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-user
SMTP_PASS=your-pass
```

Restart the server to apply changes.

## Common Commands

```bash
# Development
npm run dev              # Start with hot-reload
npm run build            # Build for production
npm run start:prod       # Run production build

# Database
npm run db:setup         # Init DB and run migrations
npm run typeorm:migrate  # Run migrations

# Code Quality
npm run lint             # Check code
npm run lint:fix         # Fix issues
npm run format           # Format code

# Docker
npm run docker:up        # Start services
npm run docker:down      # Stop services
```

## Next Steps

1. **Read the main README.md** for detailed documentation
2. **Explore the Swagger UI** at http://localhost:3000/api-docs
3. **Add your own modules** using NestJS CLI
4. **Configure feature toggles** in `.env` as needed
5. **Review security settings** before deploying

## Troubleshooting

**Port 3000 already in use?**
```bash
PORT=4000 npm run dev
```

**Database connection failed?**
- Check Docker is running: `docker ps`
- Restart services: `npm run docker:down && npm run docker:up`

**Import errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Need help?**
Check the full README.md for detailed documentation!

---

Happy coding! 🚀


