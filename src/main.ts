import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { WinstonLogger } from './common/logger/winston.logger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  const swaggerEnabled = configService.get<boolean>('FEATURE_SWAGGER', true);
  const loggingEnabled = configService.get<boolean>('FEATURE_LOGGING', true);

  // Custom logger
  if (loggingEnabled) {
    const logger = app.get(WinstonLogger);
    app.useLogger(logger);
  }

  // Global prefix
  app.setGlobalPrefix(apiPrefix);

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Security
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: nodeEnv === 'production' ? false : '*',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger documentation
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('NestJS Template API')
      .setDescription('Production-grade NestJS template with modular, toggleable features')
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addServer(`http://localhost:${port}`, 'Local environment')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  // Graceful shutdown
  app.enableShutdownHooks();

  await app.listen(port);

  if (loggingEnabled) {
    const logger = app.get(WinstonLogger);
    logger.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
    if (swaggerEnabled) {
      logger.log(`📚 Swagger documentation: http://localhost:${port}/api-docs`);
    }
    logger.log(`🌍 Environment: ${nodeEnv}`);
  } else {
    console.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
  }
}

bootstrap();



