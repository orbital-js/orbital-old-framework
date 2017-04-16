import { RouteConfig, RouteDescriptor } from '../types/route';
import { Request, Response } from 'express';

export function Route(config: RouteConfig) {
    return function (target: any, property: string, desc: any) {
        let executor = function (req: Request, res: Response) {
            console.log(target);
            let args;
            if (config.method == 'get' || config.method == 'delete') {
                args == null;
            } else {
                args = req.body;
            }
            console.log("CONFIG: ", config);
            config.function(args).then((success: any) => {
                res.status(success.status | 200).json(success);
            }).catch((error: any) => {
                let otherErr: any = { 'message': 'An error has occurred.' };
                res.status(error.status | 500).json(error | otherErr);
            })
        }

        Object.defineProperty(target, property, {
            value: {
                path: config.path,
                executor: executor,
                method: config.method,
                route: true
            }
        });

        return target;
        // console.log('target: ', target);
        // console.log('property: ', property);
    };
}