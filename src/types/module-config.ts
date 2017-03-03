import { RequestHandler, ErrorRequestHandler } from 'express';
import { DatabaseConnectionConfig } from './database';
import { Route } from './route';
import { Response } from 'express';

export interface Config {
    database?: DatabaseConnectionConfig;
    res?: Response;
    routes: Route[];
    controllers: Function[];
    middlewares?: (RequestHandler | ErrorRequestHandler)[];
    models?: Function[];
}