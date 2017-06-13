import { Request, Response } from 'express';
import { RouteConfig, RouteDescriptor } from '../types/route';
import { MethodWithData } from '../types/route/method-with-data';


/**
 * Route
 * @description the decorator to wrap a route
 * @param config {RouteConfig} configuration on your route declaration
 * @param config.path {string} the path for your route
 * @param config.method {string} the method for your route, either 'get', 'post', 'put', 'patch', or 'delete'.
 * @returns decorator {MethodDecorator} to decorate your route method
 */

export function Route(config: RouteConfig) {
    return function (target: any, property: string, desc: any) {
        console.log(config.function);

        let executor = generateExecutor(config);

        Object.defineProperty(target, property, {
            value: {
                path: config.path,
                executor: executor,
                method: config.method,
                route: true
            }
        });

        return target;
    };
}

function generateExecutor(config: RouteConfig) {
    return (req: Request, res: Response) => {
        let args: any;
        if (config.method !== 'get' && config.method !== 'delete') {
            args.body = req.body;
        }
        config.function(args)().then((success: any) => {
            res.status(success.status | 200).json(success);
        }).catch((error: any) => {
            let otherErr: any = { 'message': 'An error has occurred.', code: 'UNCAUGHT_ERROR' };
            res.status(error.status | 500).json(error | otherErr);
        });
    };
}