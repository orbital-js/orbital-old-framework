import * as express from 'express';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { Injectable } from 'injection-js';

@Injectable()
export class App {
    private _app: express.Express;

    constructor() {
        this._app = express();
    }

    use(path: string = '/', handler: RequestHandler | ErrorRequestHandler) {
        this._app.use(path, handler);
    }


}