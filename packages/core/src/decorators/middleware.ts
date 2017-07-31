import { Provider } from 'injection-js';
import { makeDecorator, TypeDecorator } from './util';

export interface Middleware { }

export interface MiddlewareDecorator {
    (obj: Middleware): TypeDecorator;

    new(obj: Middleware): Middleware;
}


export const Middleware: MiddlewareDecorator =
    <MiddlewareDecorator>makeDecorator('Middleware', (mod: Middleware = {}) => mod);