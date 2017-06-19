import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import { ReflectiveInjector } from 'injection-js';
import * as path from 'path';
import 'reflect-metadata';
import { Module } from './../module/module';
import { Route } from '../route/route';
import { app } from '../server';


/**
 * @description The method to start up a Boat instance. 
 * This compiles all of the dependencies and prepares them to be served.
 * 
 * @export
 * @param {Module} mod 
 * @returns {void} 
 */
export function bootstrap(mod: any): void {
    /* Here, we start with some simple instantiation code.
       Boat includes a few middlewares we suggest, just to keep you safe. */
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(compression());

    /* We strip some data from the type annotation on the module. */
    let annotations: Module = Reflect.getMetadata('annotations', mod)[0];

    /* If we have any middleware classes, they can be referenced here. */
    if (annotations.middlewares) {
        annotations.middlewares.forEach((middleware: any) => {
            app.use(new middleware().use);
        });
    }

    if (annotations.imports) {
        let cycled = cycleImports(annotations.imports, mod.config);
        annotations.providers = unique((annotations.providers || []).concat(cycled.providers));
        annotations.routes = unique((annotations.routes || []).concat(cycled.routes));
    }
    console.log(annotations.routes);
    /* Here we inject all of the dependencies for the module. */
    let injector = ReflectiveInjector.resolveAndCreate([...(annotations.providers || []), ...(annotations.routes || [])]);

    (annotations.routes || []).forEach((route: Route) => {
        let rt = injector.get(route);
        let routeAnnotation = Reflect.getMetadata('annotations', route);
        console.log(routeAnnotation);
        if (rt.get) {
            app.get(routeAnnotation.path, rt.get);
        }
        if (rt.post) {
            app.get(routeAnnotation.path, rt.post);
        }
        if (rt.patch) {
            app.get(routeAnnotation.path, rt.patch);
        }
        if (rt.put) {
            app.get(routeAnnotation.path, rt.put);
        }
        if (rt.delete) {
            app.get(routeAnnotation.path, rt.delete);
        }
    });

    /* Now we set up the listener and are ready to take requests. */
    let config = annotations.config;
    if (config && config.port) {
        app.listen(config.port);
        console.log('LISTENING ON PORT ' + config.port);
    } else {
        let port = process.env.PORT ? process.env.PORT : 8080;
        app.listen(port);
        console.log('LISTENING ON PORT ' + port);
    }
    return;
}

function cycleImports(mods: any[], ...config: any[]) {
    let providers: any[] = [], routes: any[] = [];
    for (let modul of mods) {
        let mod = Reflect.getMetadata('annotations', modul)[0];
        console.log(mod);
        if (mod.providers) {
            providers.concat(mod.providers);
        }
        if (mod.routes) {
            mod.routes.forEach((route: any) => {
                let rt = Reflect.getMetadata('annotations', route)[0];
                rt.path = joinPath(config, mod, rt);
                Reflect.defineMetadata('annotations', rt, route);
                routes.push(route);
            });
        }
        if (mod.imports) {
            config.push(mod.config);
            for (let imp of mod.imports) {
                cycleImports(imp, config);
            }
        }
    }
    return { providers, routes };
}

function joinPath(...config: any[]) {
    let pth = ['/'];
    config.forEach((conf: any) => {
        if (conf.path) {
            console.log(conf.path);
            pth.push(conf.path);
        }
    });
    return path.join(pth.join('/'));
}

function unique(array: any) {
    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}