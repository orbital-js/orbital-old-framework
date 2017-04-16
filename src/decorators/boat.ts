import { BoatConfig } from '../types/boat';
import * as express from 'express';
import { Express } from 'express';
import { Method } from '../types/method';

export function Boat(config: BoatConfig): ClassDecorator {
    return (klass: any) => {
        let original = klass;
        let methods: Method[] = [];
        let middlewares: Function[] = [];
        for (let i = 0; i < config.features.length; i++) {
            let feature = config.features[i];
            if (feature.feature) {
                for (let j = 0; j < feature.routes.length; j++) {
                    let route = feature.routes[i];
                    methods.push(route);
                }
            } else {
                console.log(feature);
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
        if (methods) {
            original.methods = methods;
        }

        for (let i = 0; i < config.middlewares.length; i++) {
            middlewares.push(config.middlewares[i]);
        }
        if (middlewares) {
            original.middlewares = middlewares;
        }
        return original;
    };
}