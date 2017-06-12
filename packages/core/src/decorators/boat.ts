import * as express from 'express';
import { Express } from 'express';
import { FeatureConfig } from './../../../../dist/packages/core/src/types/feature/feature-config.d';
import { BoatConfig } from '../types/boat';
import { Method } from '../types/method';

/**
 * Boat
 * @description The parent decorator that wraps all of your project dependencies
 * @param config {BoatConfig} arrays of dependencies used by your project
 * @param config.middlewares {Array} array of your express middlewares in the order that you need them
 * @param config.features {Array} array of each of the features you declare
 * @returns decorator {ClassDecorator} to decorate your AppModule class
 */

export function Boat(config: BoatConfig): ClassDecorator {
    return (cls: any) => {
        let original = cls;
        original.methods = configureRoutes(config.features);
        original.middlewares = configureMiddlewares(config.middlewares);
        return original;
    };
}

function configureMiddlewares(middlewares: Function[]): Function[] {
    let middlewareArray = [];
    if (middlewares) {
        for (let i = 0; i < middlewares.length; i++) {
            middlewareArray.push(middlewares[i]);
        }
        return middlewareArray;
    } else return [];
}

function configureRoutes(features: any[]): Method[] {
    let methods: Method[] = [];
    if (features) {
        for (let i = 0; i < features.length; i++) {
            let feature = features[i];
            if (feature.feature) {
                feature.routes.forEach((route: any) => {
                    methods.push(route);
                });
            } else {
                let clsStr: string;
                if ((typeof feature).toLowerCase() === 'function') {
                    clsStr = feature.toString().slice(9);
                    let index = clsStr.indexOf('()');
                    clsStr = clsStr.slice(0, index);
                    clsStr = ', ' + clsStr + ',';
                } else {
                    clsStr = ' is not a class and therefore';
                }
                throw new Error('A feature you imported' + clsStr + ` is not a valid feature. Remove it from your 'features' import in app.module.ts.`);
            }
        }
    }
    if (methods && methods[0]) {
        return methods;
    } else {
        return [];
    }

}