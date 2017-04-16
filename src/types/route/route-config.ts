import { Controller } from '../../decorators/controller';
import { RequestHandler, ErrorRequestHandler } from 'express';
import { Type } from '../../type';
import { Methods } from '../methods';

export interface RouteConfig {
    method: Methods;
    path: string;
    function: Function;
}
