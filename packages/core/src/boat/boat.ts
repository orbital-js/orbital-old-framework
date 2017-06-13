import * as express from 'express';
import { Express } from 'express';
import { IMiddleware } from './../middlewares/middleware';
import { BoatConfig } from './boat-config';
import { FeatureConfig } from '../feature';
import { Class } from '../types/class';
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
        if (config.features) original.methods = configureRoutes(config.features);
        if (config.middlewares) original.middlewares = configureMiddlewares(config.middlewares);
        return original;
    };
}

/**
 * @description Organizes middlewares into an executable array, if middlewares are passed into the config.
 * 
 * @param {Middleware[]} middlewares 
 * @returns {Function[]} 
 */
function configureMiddlewares(middlewares: any[]): Function[] {
    let middlewareArray: Function[] = [];
    if (middlewares) {
        for (let i = 0; i < middlewares.length; i++) {
            let mw = new middlewares[i]();
            console.log(isMiddlewareInstance(mw));
            if (isMiddlewareInstance(mw)) middlewareArray.push(mw.use);
            else continue;
        }
        return middlewareArray;
    } else return [];
}

function isMiddlewareInstance(obj: any): obj is IMiddleware {
    return 'use' in obj;
}

/**
 * @description Generates routes for each feature in the module if features are imported. 
 * Also configures routes to be consumed by Express.
 *
 * @param {any[]} features
 * @returns {Method[]}
 */
function configureRoutes(features: any[]): Method[] {
    let methods: Method[] = [];
    if (features) {
        methods = generateMethods(features);
    }
    if (methods && methods[0]) return methods;
    else return [];
}

/**
 * @description Cherry picks route metadata from features
 * 
 * 
 * @param {any[]} features 
 * @returns {Method[]} 
 */
function generateMethods(features: any[]): Method[] {
    let methods: Method[] = [];
    for (let feature of features) {
        methods = methods.concat(getRoutesArray(feature));
    }
    return methods;
}

/**
 * @description Gets each route's information from the feature
 * 
 * @param {any[]} features 
 * @param {number} i 
 * @returns {Method[]} 
 */
function getRoutesArray(feature: any): Method[] {
    if (feature.feature) {
        return feature.routes;
    } else {
        throwError(feature);
    }
    return [];
}


/**
 * @description Throws us a nice little error if something goes wrong with the feature.
 * Throws a descriptive TypeError pointing to the rogue component.
 * 
 * @param {*} feature 
 * @returns {Error} 
 */
function throwError(feature: any): TypeError {
    let clsStr: string;
    if ((typeof feature).toLowerCase() === 'function') {
        clsStr = feature.toString().slice(9);
        let index = clsStr.indexOf('()');
        clsStr = clsStr.slice(0, index);
        clsStr = ', ' + clsStr + ',';
    } else {
        clsStr = ' is not a class and therefore';
    }
    throw new TypeError('A feature you imported' + clsStr + ` is not a valid feature. Remove it from your 'features' import in app.module.ts.`);
}