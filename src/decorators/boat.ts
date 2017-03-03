import { Config } from '../types';
import * as express from 'express';
import { Express } from 'express';

let app: Express = express();

export function Boat(annotation: Config): Function {

    return (target: Function) => {
        let original = target;
        for (let i = 0; i < annotation.middlewares.length; i++) {
            app.use(annotation.middlewares[i]);
        }
        for (let i = 0; i < annotation.routes.length; i++) {
            app[annotation.routes[i].method](annotation.routes[i].path, annotation.routes[i].implementation);
        }
        return original;
    };

}



@Boat({
    controllers: [],
    routes: [],
    middlewares: [],
    database: {
        hosts: [{
            host: '',
            port: 12
        }]
    }
})
export class Hello { }