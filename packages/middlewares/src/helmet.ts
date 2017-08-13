/// <reference path="../node_modules/@types/helmet/index.d.ts" />
import * as helmet from 'helmet';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class Helmet implements Use {

    constructor(
        @Optional() public options: helmet.IHelmetConfiguration = {}
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        helmet(this.options)(req, res, next);
    }
}
