import { Controller } from '../../decorators/controller';
import { RequestHandler, ErrorRequestHandler } from 'express';
import { Type } from '../../type';
import { Methods } from '../methods';

export interface RouteConfig {
    /**
     * The HTTP-compatible method for the endpoint.
     */
    method: Methods;
    /**
     * The path where the resource will be available. It will be a child of the Feature's path property.
     */
    path: string;
    /**
     * The operation to execute when the endpoint is hit. Do not call the function, just reference it by not using ()
     */
    function: () => Promise<any>;
}
