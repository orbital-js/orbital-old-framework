import 'reflect-metadata';

import { TypeDecorator, makeDecorator } from '../util/decorators';

// export interface Middleware { }

export interface MiddlewareDecorator {
    (): TypeDecorator;

    new(): any;
}


export const Middleware: MiddlewareDecorator =
    <MiddlewareDecorator>makeDecorator('Middleware');