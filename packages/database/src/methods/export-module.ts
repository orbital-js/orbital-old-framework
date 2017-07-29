import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { Module } from './../module/module';
import { Route } from '../route/route';
import { app } from '../server';
import * as path from 'path';


/**
 * @description The method to start up a Boat instance. 
 * This compiles all of the dependencies and prepares them to be served.
 * 
 * @export
 * @param {Module} mod 
 * @returns {void} 
 */
export function exportModule(mod: any): Module {

    /* We strip some data from the type annotation on the module. */
    let annotations: Module = Reflect.getMetadata('annotations', mod)[0];
    let config = annotations.config;

    /* If we have any middleware classes, they can be referenced here. */
    if (annotations.middlewares) {
        let pth: string;
        if (config && config.path) pth = path.join('/', config.path);
        else pth = '/';
        annotations.middlewares.forEach((middleware: any) => {
            app.use(pth, new middleware().use);
        });
    }


    if (!annotations.providers) annotations.providers = [];
    if (!annotations.routes) annotations.routes = [];
    if (!annotations.imports) annotations.imports = [];

    /* Here we inject all of the dependencies for the module. */
    let injector = ReflectiveInjector.resolveAndCreate([...annotations.providers, ...annotations.routes]);

    annotations.routes.forEach((route: Route) => {
        let rt = injector.get(route);
        let routeAnnotation = Reflect.getMetadata('annotations', route)[0];
        let pth: string;
        if (config && config.path) pth = path.join('/', config.path, routeAnnotation.path);
        else pth = path.join('/', routeAnnotation.path);
        
        if (rt.get) {
            app.get(pth, rt.get);
        }
        if (rt.post) {
            app.get(pth, rt.post);
        }
        if (rt.patch) {
            app.get(pth, rt.patch);
        }
        if (rt.put) {
            app.get(pth, rt.put);
        }
        if (rt.delete) {
            app.get(pth, rt.delete);
        }
    });

    return {
        providers: annotations.providers,
        routes: annotations.routes
    };
}