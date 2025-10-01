import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLogger } from '../logger/winston.logger';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WinstonLogger) private readonly logger: WinstonLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const requestId = req['requestId'];
    const startTime = Date.now();

    this.logger.log(`→ ${method} ${originalUrl} - ${ip} [${requestId}]`);

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      const message = `← ${method} ${originalUrl} ${statusCode} - ${duration}ms [${requestId}]`;

      if (statusCode >= 500) {
        this.logger.error(message);
      } else if (statusCode >= 400) {
        this.logger.warn(message);
      } else {
        this.logger.log(message);
      }
    });

    next();
  }
}



