import * as helmet from 'helmet';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class Helmet implements Use {

    public static options: helmet.IHelmetConfiguration = {};

    constructor() { }

    static configure(options: helmet.IHelmetConfiguration) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        helmet(Helmet.options)(req, res, next);
    }
}

export { IHelmetConfiguration } from 'helmet';