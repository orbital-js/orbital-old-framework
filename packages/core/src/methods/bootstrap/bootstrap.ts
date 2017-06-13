import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { Request, Response, Router } from 'express';
import * as express from 'express';
import * as helmet from 'helmet';
import { BootstrapConfig } from './bootstrap-config';
import { Boat } from '../../boat';



/**
 * bootstrap
 * @param mod {Boat} The AppModule to bootstrap
 */

let app: any = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

export function bootstrap(mod: any): any {
    let config = mod.config;

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

    if (config && config.port) {
        app.listen(config.port);
        console.log('LISTENING ON PORT ' + config.port);
    } else {
        let port = process.env.PORT ? process.env.PORT : 8080;
        app.listen(port);
        console.log('LISTENING ON PORT ' + port);
    }
    return app;
}