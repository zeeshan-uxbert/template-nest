import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration from './config/configuration';
import { WinstonLoggerModule } from './common/logger/winston-logger.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { HttpLoggerMiddleware } from './common/middleware/http-logger.middleware';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmDatabaseModule } from './database/typeorm/typeorm.module';
import { MongooseDatabaseModule } from './database/mongoose/mongoose.module';
import { RedisModule } from './clients/redis/redis.module';
import { S3Module } from './clients/s3/s3.module';
import { StrapiModule } from './clients/strapi/strapi.module';
import { EmailModule } from './services/email/email.module';
import { NotificationModule } from './services/notification/notification.module';
import { BullMQModule } from './queues/bullmq.module';
import { I18nCustomModule } from './common/i18n/i18n.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.env.local'],
      cache: true,
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    // Conditional modules based on feature flags
    ...(process.env.FEATURE_LOGGING === 'true' ? [WinstonLoggerModule] : []),
    ...(process.env.FEATURE_I18N === 'true' ? [I18nCustomModule] : []),
    ...(process.env.FEATURE_TYPEORM === 'true' ? [TypeOrmDatabaseModule] : []),
    ...(process.env.FEATURE_MONGOOSE === 'true' ? [MongooseDatabaseModule] : []),
    ...(process.env.FEATURE_REDIS === 'true' ? [RedisModule] : []),
    ...(process.env.FEATURE_S3 === 'true' ? [S3Module] : []),
    ...(process.env.FEATURE_STRAPI === 'true' ? [StrapiModule] : []),
    ...(process.env.FEATURE_EMAIL === 'true' ? [EmailModule] : []),
    ...(process.env.FEATURE_NOTIFICATIONS === 'true' ? [NotificationModule] : []),
    ...(process.env.FEATURE_BULLMQ === 'true' ? [BullMQModule] : []),
    ...(process.env.FEATURE_AUTH === 'true' ? [AuthModule] : []),

    // Core modules
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');

    if (process.env.FEATURE_LOGGING === 'true') {
      consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
  }
}



