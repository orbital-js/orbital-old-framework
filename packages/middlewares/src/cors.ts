import * as cors from 'cors';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class Cors implements Use {

    constructor(
        @Optional() public options: cors.CorsOptions = {}
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        cors(this.options)(req, res, next);
    }
}