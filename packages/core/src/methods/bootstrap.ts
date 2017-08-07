import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as path from 'path';

import { FactoryProvider, Provider, TypeProvider } from '../di/provider';
import { getModule, isFunction, joinPath, methods, unique } from './util';

import { Injector } from '../di/injector';
import { Middleware } from '../metadata/middleware';
import { ModWithProviders } from '../interfaces/module_with_providers';
import { Module } from '../metadata/module';
import { Orbital } from '../metadata/orbital';
import { ReflectiveInjector } from '../di/reflective_injector';
import { Route } from '../metadata/route';

/**
 * @description The method to start up a Orbital instance. 
 * This compiles all of the dependencies and prepares them to be served.
 * 
 * @export
 * @param {Module} mod 
 * @returns {void} 
 */
export async function bootstrap(mod: any, item?: any): Promise<void> {

    /* We strip some data from the type annotation on the module. */
    const middlewares: any[] = cycleMiddlewares([mod]);
    const providers: Provider[] = cycleProviders(mod);
    const orbitals: Orbital[] = cycleOrbitals([mod]);
    const annotations: Module = Reflect.getMetadata('annotations', mod)[0];



    /* Use Angular's dependency injection to assosciate all providers to their respective places */

    const injector: ReflectiveInjector = await ReflectiveInjector.resolveAndCreate(<any[]>[...providers, ...orbitals, ...middlewares]);

    const app = express();

    /* Here, we start with some simple instantiation code.
       Orbital includes a few middlewares we suggest, just to keep you safe. */

    app.use(bodyParser.json());
    app.use(helmet());
    app.use(compression());


    for (const middleware of middlewares) {
        const m = await injector.get(middleware);
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => m.use(req, res, next));
    }

    /* Notify express of all of the routes */
    for (const route of orbitals) {
        await useRoute(injector, route, app);
    }


    /* Now we set up the listener and are ready to take requests. */
    const config = annotations.config;
    const port = config && config.port ? config.port : process.env.PORT ? process.env.PORT : 8080;

    app.listen(port);
    console.info('LISTENING ON PORT ' + port);
    return;
}

async function useRoute(injector: Injector, route: Route, router: any) {
    const rt = await injector.get(route);
    const routeAnnotation = Reflect.getMetadata('annotations', route);
    console.log(routeAnnotation);
    if (!routeAnnotation.path) routeAnnotation.path = '/';
    for (const method of methods) {
        if (rt[method]) {
            router[method](routeAnnotation.path, (req: express.Request, res: express.Response, next: express.NextFunction) => rt[method](req, res, next));
        }
    }
    const propAnnotation: { [propName: string]: Route }[] = Reflect.getMetadata('propMetadata', rt['constructor']);
    for (const prop in propAnnotation) {
        const method: Route = propAnnotation[prop][0];
        method.method = method.method || 'get';
        method.path = method.path || '/';
        router[method.method](path.join(routeAnnotation.path, method.path), (req: express.Request, res: express.Response, next: express.NextFunction) => rt[prop](req, res, next));
    }
}

function cycleProviders(module: (Module | ModWithProviders)): Provider[] {
    const providers: Provider[] = [];

    const annotation: Module = getModule(module);

    let moduleProviders: Provider[] = [];
    if ((<ModWithProviders>module).obModule && (<ModWithProviders>module).providers) {
        moduleProviders = (<ModWithProviders>module).providers;
    } else {
        moduleProviders = annotation.providers || [];
    }

    for (const provider of moduleProviders) {
        providers.push((<Provider>provider));
    }

    for (const mod of (annotation.imports || [])) {
        const importsProviderArray = cycleProviders(mod);
        importsProviderArray.forEach(provider => {
            providers.push(provider);
        });
    }

    return providers;
}

const cycleMiddlewares = (modules: (Module | ModWithProviders)[] = []): any[] => {
    let middlewares: any[] = [];

    modules.forEach(mod => {
        const annotation: Module = getModule(mod);
        middlewares = middlewares.concat(annotation.middlewares || []);
        if (annotation.imports) middlewares = middlewares.concat(cycleMiddlewares(annotation.imports));
    });

    return middlewares;
};

const cycleOrbitals = (modules: (Module | ModWithProviders)[] = [], prefix: string = '/'): Orbital[] => {
    let routes: Orbital[] = [];

    modules.forEach((mod) => {
        const annotation: Module = getModule(mod);

        const modPath = (annotation.config ? annotation.config.path || '/' : '/');

        if (annotation.orbitals) {
            for (const route of annotation.orbitals) {
                const orbital: Orbital = Reflect.getMetadata('annotations', route)[0];
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