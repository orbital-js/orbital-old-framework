import { Provider } from 'injection-js';
import { makeDecorator, TypeDecorator } from './util';

export interface Middleware { }

export interface MiddlewareDecorator {
    (): TypeDecorator;

    new(): Middleware;
}


export const Middleware: MiddlewareDecorator =
    <MiddlewareDecorator>makeDecorator('Middleware');