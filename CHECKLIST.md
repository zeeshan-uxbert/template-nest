# Production Readiness Checklist

Use this checklist before deploying to production.

## 🔒 Security

- [ ] **Change JWT Secrets**
  - [ ] Update `JWT_SECRET` to a strong, random value
  - [ ] Update `JWT_REFRESH_SECRET` to a different strong value
  - [ ] Never commit secrets to version control

- [ ] **Database Security**
  - [ ] Set `DB_SYNCHRONIZE=false` in production
  - [ ] Use strong database passwords
  - [ ] Restrict database network access
  - [ ] Enable SSL/TLS for database connections

- [ ] **Environment Variables**
  - [ ] Review all `.env` variables
  - [ ] Remove `.env` from git (check `.gitignore`)
  - [ ] Use secret management (AWS Secrets Manager, HashiCorp Vault)
  - [ ] Never log sensitive data

- [ ] **CORS Configuration**
  - [ ] Update CORS origin in `main.ts` (don't use `*`)
  - [ ] Specify exact allowed origins
  - [ ] Test CORS with your frontend

- [ ] **Helmet Configuration**
  - [ ] Review Helmet default policies
  - [ ] Adjust CSP headers if needed
  - [ ] Test with your application

- [ ] **Rate Limiting**
  - [ ] Adjust throttle limits in `app.module.ts`
  - [ ] Consider per-endpoint limits
  - [ ] Monitor for abuse

- [ ] **Authentication**
  - [ ] Implement proper password reset flow
  - [ ] Add email verification
  - [ ] Consider 2FA for sensitive operations
  - [ ] Implement account lockout after failed attempts

## 🚀 Performance

- [ ] **Compression**
  - [x] Gzip compression enabled
  - [ ] Test compression with large responses

- [ ] **Caching**
  - [ ] Enable Redis for session/data caching
  - [ ] Configure cache TTLs appropriately
  - [ ] Implement cache invalidation strategy

- [ ] **Database**
  - [ ] Add indexes to frequently queried fields
  - [ ] Review and optimize slow queries
  - [ ] Configure connection pooling
  - [ ] Set up read replicas if needed

- [ ] **Logging**
  - [ ] Set appropriate log levels (INFO in prod, not DEBUG)
  - [ ] Configure log rotation
  - [ ] Set up log aggregation (ELK, CloudWatch)
  - [ ] Remove excessive logging

- [ ] **Monitoring**
  - [ ] Set up APM (New Relic, DataDog)
  - [ ] Configure health check endpoints
  - [ ] Set up uptime monitoring
  - [ ] Configure alerts for errors/downtime

## 🧪 Testing

- [ ] **Unit Tests**
  - [ ] Write tests for critical services
  - [ ] Aim for >80% code coverage
  - [ ] Run: `npm run test:cov`

- [ ] **E2E Tests**
  - [ ] Test critical user flows
  - [ ] Test authentication flow
  - [ ] Run: `npm run test:e2e`

- [ ] **Load Testing**
  - [ ] Perform load tests with realistic data
  - [ ] Identify bottlenecks
  - [ ] Test rate limiting behavior

- [ ] **Security Testing**
  - [ ] Run security audit: `npm audit`
  - [ ] Fix high/critical vulnerabilities
  - [ ] Test for SQL injection, XSS, CSRF

## 🗄️ Database

- [ ] **Migrations**
  - [ ] Review all migrations
  - [ ] Test migrations on staging
  - [ ] Have rollback plan
  - [ ] Backup database before migrations

- [ ] **Backups**
  - [ ] Set up automated backups
  - [ ] Test backup restoration
  - [ ] Define backup retention policy
  - [ ] Store backups securely

- [ ] **Seeds**
  - [ ] Remove test/seed data from production
  - [ ] Create production seed data if needed
  - [ ] Document seeding process

## 🐳 Docker & Deployment

- [ ] **Docker Image**
  - [x] Multi-stage build implemented
  - [x] Non-root user configured
  - [ ] Scan image for vulnerabilities
  - [ ] Optimize image size
  - [ ] Tag images properly (semantic versioning)

- [ ] **Environment**
  - [ ] Set `NODE_ENV=production`
  - [ ] Use production-ready database
  - [ ] Configure proper resource limits
  - [ ] Set up health checks

- [ ] **CI/CD**
  - [x] GitHub Actions workflow created
  - [ ] Configure deployment secrets
  - [ ] Test CI/CD pipeline
  - [ ] Set up staging environment
  - [ ] Implement rollback strategy

## 📊 Monitoring & Observability

- [ ] **Logging**
  - [x] Winston logger configured
  - [x] Request ID tracking enabled
  - [ ] Set up centralized logging
  - [ ] Configure log retention

- [ ] **Metrics**
  - [ ] Set up Prometheus/Grafana
  - [ ] Track key business metrics
  - [ ] Monitor response times
  - [ ] Track error rates

- [ ] **Alerts**
  - [ ] Configure error alerts
  - [ ] Set up downtime alerts
  - [ ] Configure performance alerts
  - [ ] Set up on-call rotation

- [ ] **Health Checks**
  - [x] Basic health endpoint implemented
  - [x] Database connectivity check
  - [ ] Set up external monitoring
  - [ ] Configure load balancer health checks

## 📝 Documentation

- [ ] **API Documentation**
  - [x] Swagger documentation implemented
  - [ ] Review all endpoints documented
  - [ ] Add request/response examples
  - [ ] Document error codes

- [ ] **README**
  - [x] Comprehensive README created
  - [ ] Update with deployment instructions
  - [ ] Document environment variables
  - [ ] Add troubleshooting guide

- [ ] **Runbooks**
  - [ ] Create deployment runbook
  - [ ] Document rollback procedure
  - [ ] Create incident response guide
  - [ ] Document common issues and solutions

## 🔧 Configuration

- [ ] **Feature Flags**
  - [ ] Review enabled features
  - [ ] Disable unused features in production
  - [ ] Document feature dependencies

- [ ] **Rate Limits**
  - [ ] Configure appropriate limits
  - [ ] Test rate limiting
  - [ ] Add per-user rate limiting if needed

- [ ] **Timeouts**
  - [x] Request timeout configured (30s)
  - [ ] Adjust based on requirements
  - [ ] Configure database query timeouts

## 🌐 Infrastructure

- [ ] **Load Balancing**
  - [ ] Set up load balancer
  - [ ] Configure sticky sessions if needed
  - [ ] Test failover

- [ ] **Scaling**
  - [ ] Plan horizontal scaling strategy
  - [ ] Configure auto-scaling
  - [ ] Test scaling up/down

- [ ] **DNS**
  - [ ] Configure domain name
  - [ ] Set up SSL/TLS certificates
  - [ ] Test DNS propagation

- [ ] **CDN**
  - [ ] Set up CDN for static assets
  - [ ] Configure cache headers
  - [ ] Test CDN integration

## 🔄 Post-Deployment

- [ ] **Monitoring**
  - [ ] Monitor error rates
  - [ ] Check response times
  - [ ] Verify health checks passing
  - [ ] Review logs for issues

- [ ] **Testing**
  - [ ] Smoke test critical paths
  - [ ] Test authentication flow
  - [ ] Verify database connectivity
  - [ ] Test external integrations

- [ ] **Communication**
  - [ ] Notify team of deployment
  - [ ] Update status page
  - [ ] Document any issues encountered

## 📱 Optional Enhancements

- [ ] **Email**
  - [ ] Configure production SMTP
  - [ ] Set up email templates
  - [ ] Test email delivery

- [ ] **File Upload**
  - [ ] Configure S3 buckets
  - [ ] Set up proper permissions
  - [ ] Test file uploads

- [ ] **Background Jobs**
  - [ ] Configure BullMQ workers
  - [ ] Set up job monitoring
  - [ ] Test job processing

- [ ] **Notifications**
  - [ ] Implement push notifications
  - [ ] Set up notification preferences
  - [ ] Test notification delivery

---

## Quick Commands

```bash
# Security audit
npm audit
npm audit fix

# Run all tests
npm run test
npm run test:cov
npm run test:e2e

# Linting
npm run lint
npm run lint:fix
npm run format

# Build for production
npm run build

# Database
npm run db:setup
npm run typeorm:migrate

# Docker
docker build -t nestjs-template .
docker run -p 3000:3000 nestjs-template

# Start production
NODE_ENV=production npm run start:prod
```

---

## Common Issues

### Issue: Port already in use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=4000 npm run dev
```

### Issue: Database connection failed
- Check database is running
- Verify credentials in `.env`
- Check network connectivity
- Review firewall rules

### Issue: Migration failed
- Check database schema
- Review migration files
- Ensure database exists
- Run `npm run db:init` first

---

**Remember**: Test everything in staging before production! 🚨

