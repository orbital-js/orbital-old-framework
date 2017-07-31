import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import { Injector, Provider, ReflectiveInjector } from 'injection-js';
import * as path from 'path';
import 'reflect-metadata';
import { joinPath, unique } from './util';
import { Module } from '../module/module';
import { Route } from '../route/route';
import { app } from '../server';


/**
 * @description The method to start up a Orbital instance. 
 * This compiles all of the dependencies and prepares them to be served.
 * 
 * @export
 * @param {Module} mod 
 * @returns {void} 
 */
export function bootstrap(mod: any, item?: any): void {
    /* Here, we start with some simple instantiation code.
       Orbital includes a few middlewares we suggest, just to keep you safe. */
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(compression());

    /* We strip some data from the type annotation on the module. */
    let routes: Route[] = cycleRoutes([mod]);
    let providers: Provider[] = cycleProviders([mod]);
    let annotations: Module = Reflect.getMetadata('annotations', mod)[0];

    /* If we have any middleware classes, they can be referenced here. */
    if (annotations.middlewares) {
        annotations.middlewares.forEach((middleware: any) => {
            app.use(new middleware().use);
        });
    }

    /* Use Angular's dependency injection to assosciate all providers to their respective places */
    let injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(<any[]>[...routes, ...providers]);

    /* Notify express of all of the routes */
    routes.forEach((route: any) => {
        const rt = injector.get(route);
        const routeAnnotation = Reflect.getMetadata('annotations', route);
        if (!routeAnnotation.path) routeAnnotation.path = '/';

        if (rt.get) {
            app.get(routeAnnotation.path, (req: express.Request, res: express.Response, next: express.NextFunction) => rt.get(req, res, next));
        }
        if (rt.post) {
            app.post(routeAnnotation.path, (req: express.Request, res: express.Response, next: express.NextFunction) => rt.post(req, res, next));
        }
        if (rt.patch) {
            app.patch(routeAnnotation.path, (req: express.Request, res: express.Response, next: express.NextFunction) => rt.patch(req, res, next));
        }
        if (rt.put) {
            app.put(routeAnnotation.path, (req: express.Request, res: express.Response, next: express.NextFunction) => rt.put(req, res, next));
        }
        if (rt.delete) {
            app.delete(routeAnnotation.path, (req: express.Request, res: express.Response, next: express.NextFunction) => rt.delete(req, res, next));
        }
    });

    /* Now we set up the listener and are ready to take requests. */
    const config = annotations.config;
    const port = config && config.port ? config.port : process.env.PORT ? process.env.PORT : 8080;
    app.listen(port);
    console.info('LISTENING ON PORT ' + port);
    return;
}

const cycleProviders = (modules: Module[]): Provider[] => {
    let providers: Provider[] = [];
    modules.forEach(mod => {
        let annotation: Module = Reflect.getMetadata('annotations', mod)[0];
        providers = providers.concat(annotation.providers || []);
        if (annotation.imports) {
            providers = providers.concat(cycleProviders(annotation.imports));
        }
    })
    return providers;
};

const cycleRoutes = (modules: Module[], prefix: string = '/'): Route[] => {
    let routes: Route[] = [];
    modules.forEach((mod, i) => {
        let annotation: Module = Reflect.getMetadata('annotations', mod)[0];

        const modPath = (annotation.config ? annotation.config.path || '/' : '/');

        (annotation.routes || []).forEach((route, j) => {
            let routeAnnotation = Reflect.getOwnMetadata('annotations', route)[0];
            routeAnnotation.path = path.join(prefix || '/', modPath || '/', routeAnnotation.path || '/');
            Reflect.defineMetadata('annotations', routeAnnotation, route);
            routes.push(route);
        });

        if (annotation.imports) {
            const p = path.join(prefix, modPath);
            routes = routes.concat(cycleRoutes(annotation.imports, p));
        }

    });

    return routes;
};