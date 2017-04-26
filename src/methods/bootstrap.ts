import { Router } from 'express';
import { Request, Response } from '_debugger';
import { Boat } from '../decorators/boat';
import { BootstrapConfig } from '../types/bootstrap';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bearerToken from 'express-bearer-token';


/**
 * bootstrap
 * @param mod {Boat} The AppModule to bootstrap
 */

export function bootstrap(mod: any): void {
    let app: any = express();
    let config = mod.config;

    if (config && config.port) {
        app.listen(config.port);
        console.log("LISTENING ON PORT " + config.port);
    } else {
        app.listen(process.env.PORT | 8080);
        console.log("LISTENING ON PORT " + process.env.PORT || 8080);
    }
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(compression());
    if (config.bearerToken) {
        app.use(bearerToken());
    }
    if (mod.middlewares) {
        mod.middlewares.forEach((middleware: any) => {
            app.use(middleware);
        });
    }
    mod.methods.forEach((route: any) => {
        app[route.method](route.path, (req: Request, res: Response) => {
            route.executor(req, res);
        });
    });
}