import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { Hash, UUID, createHash, randomUUID } from 'crypto';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startDate = Date.now();
    const requestId = randomUUID();
    Logger.log(`Request ${requestId} starting | ${req.method.toUpperCase()}: ${req.url.toLowerCase()}`, RequestLoggerMiddleware.name);
    next();
    Logger.log(`Request ${requestId} completed in ${(Date.now() - startDate)}ms`, RequestLoggerMiddleware.name);
  }
}
