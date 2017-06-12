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
    return <T extends { new (...args: any[]): {} }>(cls: T) => {
        let original: T = cls;
        let routes: RouteDescriptor[] = [];

        config.path = removeLeadingSlashes(config.path);

        routes = getRoutes(cls, config.path);

        if (!routes) routes = [];

        return {
            routes: routes,
            feature: true
        };
    };
}

function removeLeadingSlashes(path: string): string {
    if (path.substring(path.length - 1) === '/') {
        return path.substring(0, path.length - 1);
    }
}

function getRoutes(cls: any, path: string): RouteDescriptor[] {
    let routes: RouteDescriptor[] = [];
    for (let property in cls) {
        const val = Object.getOwnPropertyDescriptor(cls, property).value;
        if (val.route) {
            let route = val;
            if (route.path.substring(route.path.length - 1) === '/') {
                route.path = route.path.substring(0, route.path.length - 1);
            }
            route.path = path + route.path;
            routes.push(route);
        } else {
            let klassStr = cls.toString().slice(9);
            let index = klassStr.indexOf('()');
            klassStr = klassStr.slice(0, index);
            throw new Error('Non-route method "' + property + '" found on feature "' + klassStr + '"');
        }
    }
    return routes;
}