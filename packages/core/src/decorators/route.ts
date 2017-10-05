import { TypeDecorator, makePropDecorator } from './util';

export type Methods = 'get' | 'post' | 'patch' | 'put' | 'delete' | 'options' | 'all' | 'head';

export interface Route {
    path?: string;
    method?: Methods;
}

export interface RouteDecorator {
    (obj?: Route): any;

    new(obj?: Route): Route;
}


export const Route: RouteDecorator =
    <RouteDecorator>makePropDecorator('Route', (route: Route = { method: 'get', path: '/' }) => route);
