import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  TypeOrmHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private configService: ConfigService,
    private typeOrm?: TypeOrmHealthIndicator,
    private mongoose?: MongooseHealthIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  @ApiResponse({ status: 503, description: 'Service is unhealthy' })
  check() {
    const checks: any[] = [
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      () =>
        this.disk.checkStorage('disk', {
          path: '/',
          thresholdPercent: 0.9,
        }),
    ];

    // Add database health checks if enabled
    if (this.configService.get<boolean>('features.typeorm') && this.typeOrm) {
      checks.push(() => this.typeOrm.pingCheck('database'));
    }

    if (this.configService.get<boolean>('features.mongoose') && this.mongoose) {
      checks.push(() => this.mongoose.pingCheck('mongodb'));
    }

    return this.health.check(checks);
  }

  @Public()
  @Get('ping')
  @ApiOperation({ summary: 'Simple ping endpoint' })
  @ApiResponse({ status: 200, description: 'Pong response' })
  ping() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'pong',
      uptime: process.uptime(),
      environment: this.configService.get<string>('NODE_ENV'),
    };
  }
}
