import { Controller } from '../../decorators/controller';
import { RequestHandler, ErrorRequestHandler } from 'express';
import { Type } from '../../type';
import { HttpMethods } from '../http-methods';
import { MethodWithData } from './method-with-data';
import { Method } from './method-without-data';

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
    function: MethodWithData<object> | Method<object>;
    /**
     * Whether or not the function should take data inputs. Default true.
     */
    withData?: boolean;
}
