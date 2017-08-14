import * as cors from 'cors';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class Cors implements Use {

    public static options: cors.CorsOptions = {};

    constructor() { }

    static configure(options: cors.CorsOptions) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        cors(Cors.options)(req, res, next);
    }
}