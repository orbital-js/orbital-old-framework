import * as compression from 'compression';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class Compression implements Use {

    constructor(
        @Optional() public options: compression.CompressionOptions = {}
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        compression(this.options)(req, res, next);
    }
}