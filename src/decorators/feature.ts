import { FeatureConfig } from '../types/feature';
import { RouteDescriptor } from '../types/route';

/**
 * Feature
 * @description the decorator to wrap a feature
 * @param config {FeatureConfig} configuration on your feature declaration 
 * @param config.path {string} the parent path for your feature 
 * @returns decorator {ClassDecorator} to decorate your feature class
 */
export function Feature(config: FeatureConfig): ClassDecorator {
    return <T extends { new (...args: any[]): {} }>(klass: T) => {
        let original: any = klass;
        let routes: RouteDescriptor[] = [];

        if (config.path.substring(config.path.length - 1) == "/") {
            config.path = config.path.substring(0, config.path.length - 1);
        }


        for (let property in original) {
            let val = Object.getOwnPropertyDescriptor(original, property).value;
            if (val.route) {
                let route = val;

                if (route.path.substring(route.path.length - 1) == "/") {
                    route.path = route.path.substring(0, route.path.length - 1);
                }
                route.path = config.path + route.path;
                routes.push(route);
            } else {
                let klassStr = klass.toString().slice(9);
                let index = klassStr.indexOf('()');
                klassStr = klassStr.slice(0, index);
                throw new Error('Non-route method "' + property + '" found on feature "' + klassStr + '"');
            }
        }

        if (!routes) {
            routes = [];
        }

        let cls = {
            routes: routes,
            feature: true
        };
        return cls;
    }
}