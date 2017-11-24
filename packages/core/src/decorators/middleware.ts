import { makeDecorator, TypeDecorator } from './util';

export interface Middleware {
    path?: string;
}

export interface MiddlewareDecorator {
    (m?: Middleware): TypeDecorator;

    new(m?: Middleware): any;
}


export const Middleware: MiddlewareDecorator =
    <MiddlewareDecorator>makeDecorator('Middleware', (m: Middleware = { path: '/' }) => m);
