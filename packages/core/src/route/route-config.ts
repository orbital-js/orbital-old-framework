import { ErrorRequestHandler, RequestHandler } from 'express';
import { MethodWithData } from './method-with-data';
import { Method } from './method-without-data';
import { Controller } from '../controller';
import { HttpMethods } from '../types/http-methods';

export interface RouteConfig {
    /**
     * The HTTP-compatible method for the endpoint.
     */
    method: HttpMethods;
    /**
     * The path where the resource will be available. It will be a child of the Feature's path property.
     */
    path: string;
    /**
     * The operation to execute when the endpoint is hit. 
     */
    function: (data?: any) => () => Promise<any>;
    /**
     * Whether or not the function should take data inputs. Default true.
     */
    withData?: boolean;
}
