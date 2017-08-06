import 'reflect-metadata';

import * as async from 'async';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as path from 'path';

import { Injector, Provider, ReflectiveInjector } from 'injection-js';
import { getModule, isFunction, joinPath, methods, unique } from './util';

import { Middleware } from '../decorators/middleware';
import { ModWithProviders } from '../interfaces/module_with_providers';
import { Module } from '../decorators/module';
import { Orbital } from '../decorators/orbital';
import { Route } from '../decorators/route';

/**
 * @description The method to start up a Orbital instance. 
 * This compiles all of the dependencies and prepares them to be served.
 * 
 * @export
 * @param {Module} mod 
 * @returns {void} 
 */
export function bootstrap(mod: any, item?: any): void {

    /* We strip some data from the type annotation on the module. */
    let middlewares: any[] = cycleMiddlewares([mod]);
    let providers: Provider[] = cycleProviders([mod]);
    let orbitals: Orbital[] = cycleOrbitals([mod]);
    let annotations: Module = Reflect.getMetadata('annotations', mod)[0];


    /* Use Angular's dependency injection to assosciate all providers to their respective places */
    let injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(<any[]>[...orbitals, ...providers, ...middlewares]);
    const app = express();
    /* Here, we start with some simple instantiation code.
       Orbital includes a few middlewares we suggest, just to keep you safe. */

    app.use(bodyParser.json());
    app.use(helmet());
    app.use(compression());

    middlewares.forEach((middleware: any) => {
        let m = injector.get(middleware);
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => m.use(req, res, next));
    });

    /* Notify express of all of the routes */
    orbitals.forEach((route: any) => {
        useRoute(injector, route, app);
    });

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
        router[method.method](path.join(routeAnnotation.path, method.path), (req: express.Request, res: express.Response, next: express.NextFunction) => rt[prop](req, res, next));
    }
}

const cycleProviders = (modules: (Module | ModWithProviders)[] = []): Provider[] => {
    let providers: Provider[] = [];
    modules.forEach(mod => {
        let annotation: Module = getModule(mod);
        if ((<ModWithProviders>mod).obModule && (<ModWithProviders>mod).providers) {
            providers = providers.concat(mod.providers || []);
        } else {
            providers = providers.concat(annotation.providers || []);
        }

        if (annotation.imports) {
            providers = providers.concat(cycleProviders(annotation.imports));
        }
    });
    console.log(providers);
    
    return providers;
};

const cycleMiddlewares = (modules: (Module | ModWithProviders)[] = []): any[] => {
    let middlewares: any[] = [];

    modules.forEach(mod => {
        let annotation: Module = getModule(mod);
        middlewares = middlewares.concat(annotation.middlewares || []);
        if (annotation.imports) middlewares = middlewares.concat(cycleMiddlewares(annotation.imports));
    });

    return middlewares;
};

const cycleOrbitals = (modules: (Module | ModWithProviders)[] = [], prefix: string = '/'): Orbital[] => {
    let routes: Orbital[] = [];

    modules.forEach((mod) => {
        let annotation: Module = getModule(mod);

        const modPath = (annotation.config ? annotation.config.path || '/' : '/');

        if (annotation.orbitals) {
            for (let route of annotation.orbitals) {
                console.log(route);
                console.log(Reflect.getMetadata('design:paramtypes', route));
                
                let orbital: Orbital = Reflect.getMetadata('annotations', route)[0];
                orbital.path = path.join(prefix || '/', modPath || '/', orbital.path || '/');
                Reflect.defineMetadata('annotations', orbital, route);
                routes.push(route);
            }
        }

        if (annotation.imports) {
            const p = path.join(prefix, modPath);
            routes = routes.concat(cycleOrbitals(annotation.imports, p));
        }

    });

    return routes;
};