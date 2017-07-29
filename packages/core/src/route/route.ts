import { makeDecorator, TypeDecorator } from '../util/decorators';
import {} from 'injection-js'

export interface Route {
    path?: string;
}

export interface RouteDecorator {
    (obj: Route): TypeDecorator;

    new(obj: Route): Route;
}


export const Route: RouteDecorator =
    <RouteDecorator>makeDecorator('Route', (route: Route = {}) => route);