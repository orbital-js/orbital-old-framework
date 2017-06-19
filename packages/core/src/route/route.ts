import { TypeDecorator, makeDecorator } from '../util/decorators';

export interface Route {
    path?: string;
}

export interface RouteDecorator {
    (obj: Route): TypeDecorator;

    new (obj: Route): Route;
}


export const Route: RouteDecorator =
    <RouteDecorator>makeDecorator('Route', (route: Route = {}) => route);