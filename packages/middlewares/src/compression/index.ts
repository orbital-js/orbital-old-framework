import * as compression from 'compression';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class Compression implements Use {

    public static options: compression.CompressionOptions = {};

    constructor() { }

    static configure(options: compression.CompressionOptions) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        compression(Compression.options)(req, res, next);
    }
}