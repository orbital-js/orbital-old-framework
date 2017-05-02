import { BoatConfig } from '../types/boat';
import * as express from 'express';
import { Express } from 'express';
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
    return (klass: any) => {
        let original = klass;
        let methods: Method[] = [];
        let middlewares: Function[] = [];
        if (config.features) {
            for (let i = 0; i < config.features.length; i++) {
                let feature = config.features[i];
                if (feature.feature) {
                    feature.routes.forEach((route: any) => {
                        methods.push(route);
                    });
                } else {
                    let klassStr: string;
                    if ((typeof feature).toLowerCase() == 'function') {
                        klassStr = feature.toString().slice(9);
                        let index = klassStr.indexOf('()');
                        klassStr = klassStr.slice(0, index);
                        klassStr = ', ' + klassStr + ','
                    } else {
                        klassStr = ' is not a class and therefore'
                    }
                    throw new Error('A feature you imported' + klassStr + ` is not a valid feature. Remove it from your 'features' import in app.module.ts.`);
                }
            }
        }

        if (methods) {
            original.methods = methods;
        }
        if (config.middlewares) {
            for (let i = 0; i < config.middlewares.length; i++) {
                middlewares.push(config.middlewares[i]);
            }
        }
        if (middlewares) {
            original.middlewares = middlewares;
        }
        return original;
    };
}