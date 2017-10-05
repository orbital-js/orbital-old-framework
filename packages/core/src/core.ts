/**
 * @ngdoc module
 * @module core
 * @private
 */
export { Module } from './decorators/module';
export { Route } from './decorators/route';
export { Middleware } from './decorators/middleware';
export { Controller } from './decorators/controller';
export {
    ClassProvider,
    ExistingProvider,
    FactoryProvider,
    Inject,
    Injectable,
    InjectionToken,
    OpaqueToken,
    Optional,
    Provider,
    ReflectiveInjector,
    SkipSelf,
    TypeProvider,
    ValueProvider,
} from 'injection-js';


export { Request, Response, NextFunction, RequestHandler } from 'express';
export { Engines } from './engines';
export { App } from './app';

export { platformServer } from './methods/bootstrap';
