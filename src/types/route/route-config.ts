import { Controller } from '../../decorators/controller';
import { RequestHandler, ErrorRequestHandler } from 'express';

export interface RouteConfig {
    method: 'get' | 'put' | 'post' | 'delete' | 'patch';
    path: string;
    controller: Function;
}
