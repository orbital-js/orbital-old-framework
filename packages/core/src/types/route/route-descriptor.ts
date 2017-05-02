import { HttpMethods } from '../http-methods';
/**
 * @name route-descriptor
 */
export interface RouteDescriptor {
    /**
    * The path where the resource will be available. It will be a child of the Feature's path property.
    */
    path: string;
    /**
     * The fancy name for the function after it's been manipulated.
     */
    executor: Function;
    /**
    * The HTTP-compatible method for the endpoint.
    */
    method: HttpMethods;
    /**
    * A boolean recognizing a class as a route.
    */
    route: true;
}