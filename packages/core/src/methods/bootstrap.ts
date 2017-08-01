import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import { Injector, Provider, ReflectiveInjector } from 'injection-js';
import * as path from 'path';
import 'reflect-metadata';
import { Route } from './../decorators/route';
import { isFunction, joinPath, methods, unique } from './util';
import { Middleware } from '../decorators/middleware';
import { Module } from '../decorators/module';
import { Orbital } from '../decorators/orbital';
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
    let router: express.Router & { [propName: string]: any } = express.Router();
    /* Here, we start with some simple instantiation code.
       Orbital includes a few middlewares we suggest, just to keep you safe. */
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(compression());

    /* We strip some data from the type annotation on the module. */
    let routes: Orbital[] = cycleRoutes([mod]);
    let providers: Provider[] = cycleProviders([mod]);
    let middlewares: Middleware[] = cycleMiddlewares([mod]);
    let annotations: Module = Reflect.getMetadata('annotations', mod)[0];


    /* Use Angular's dependency injection to assosciate all providers to their respective places */
    let injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(<any[]>[...routes, ...providers, ...middlewares]);

    /* If we have any middleware classes, they can be referenced here. */

    middlewares.forEach((middleware: any) => {
        let m = injector.get(middleware);
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => m.use(req, res, next));
    });

    /* Notify express of all of the routes */
    routes.forEach((route: any) => {
        useRoute(injector, route, router);
    });
    app.use(router);

    /* Now we set up the listener and are ready to take requests. */
    const config = annotations.config;
    const port = config && config.port ? config.port : process.env.PORT ? process.env.PORT : 8080;
    app.listen(port);
    console.info('LISTENING ON PORT ' + port);
    return;
}

function useRoute(injector: Injector, route: Route, router: any) {
    const rt = injector.get(route);
    const routeAnnotation = Reflect.getMetadata('annotations', route);
    if (!routeAnnotation.path) routeAnnotation.path = '/';
    for (let method of methods) {
        if (rt[method]) {
            router[method](routeAnnotation.path, (req: express.Request, res: express.Response, next: express.NextFunction) => rt[method](req, res, next));
        }
    }
    const propAnnotation: { [propName: string]: Route }[] = Reflect.getMetadata('propMetadata', rt['constructor']);
    for (let prop in propAnnotation) {
        const method: Route = propAnnotation[prop][0];
        method.method = method.method || 'get';
        method.path = method.path || '/';
        console.log('annotation', method);
        router[method.method](path.join(routeAnnotation.path, method.path), (req: express.Request, res: express.Response, next: express.NextFunction) => rt[prop](req, res, next));

    }
}

const cycleProviders = (modules: Module[]): Provider[] => {
    let providers: Provider[] = [];
    modules.forEach(mod => {
        let annotation: Module = Reflect.getMetadata('annotations', mod)[0];
        providers = providers.concat(annotation.providers || []);
        if (annotation.imports) {
            providers = providers.concat(cycleProviders(annotation.imports));
        }
    });
    return providers;
};

const cycleMiddlewares = (modules: Module[]): Middleware[] => {
    let middlewares: Middleware[] = [];

    modules.forEach(mod => {
        let annotation: Module = Reflect.getMetadata('annotations', mod)[0];
        middlewares = middlewares.concat(annotation.middlewares || []);
        if (annotation.imports) middlewares = middlewares.concat(cycleMiddlewares(annotation.imports));
    });

    return middlewares;
};

const cycleRoutes = (modules: Module[], prefix: string = '/'): Orbital[] => {
    let routes: Orbital[] = [];

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