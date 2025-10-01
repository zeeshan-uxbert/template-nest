export default () => ({
  // Application
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api/v1',

  // Feature toggles
  features: {
    auth: process.env.FEATURE_AUTH === 'true',
    logging: process.env.FEATURE_LOGGING === 'true',
    i18n: process.env.FEATURE_I18N === 'true',
    s3: process.env.FEATURE_S3 === 'true',
    redis: process.env.FEATURE_REDIS === 'true',
    bullmq: process.env.FEATURE_BULLMQ === 'true',
    email: process.env.FEATURE_EMAIL === 'true',
    notifications: process.env.FEATURE_NOTIFICATIONS === 'true',
    typeorm: process.env.FEATURE_TYPEORM === 'true',
    mongoose: process.env.FEATURE_MONGOOSE === 'true',
    strapi: process.env.FEATURE_STRAPI === 'true',
    swagger: process.env.FEATURE_SWAGGER === 'true',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  // Database - TypeORM
  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'nest_template',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },

  // MongoDB
  mongodb: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/nest_template',
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB, 10) || 0,
  },

  // AWS S3
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Bucket: process.env.AWS_S3_BUCKET,
  },

  // Email
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    from: process.env.EMAIL_FROM || 'noreply@example.com',
  },

  // Strapi
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    token: process.env.STRAPI_TOKEN,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || 'logs',
  },
});



