import 'reflect-metadata';

import { TypeDecorator, makePropDecorator } from '../util/decorators';

import { Methods } from '../methods/util';

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