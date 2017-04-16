import { RequestHandler, ErrorRequestHandler } from 'express';
import { Response } from 'express';

export interface BoatConfig {
    // database?: DatabaseConnectionConfig;
    middlewares?: (RequestHandler | ErrorRequestHandler)[];
    features?: any[];
}