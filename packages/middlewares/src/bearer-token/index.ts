import * as bearerToken from 'express-bearer-token';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class BearerToken implements Use {

    public static options: BearerTokenOpts = {};

    constructor() { }

    static configure(options: BearerTokenOpts) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        bearerToken(BearerToken.options)(req, res, next);
    }
}

export interface BearerTokenOpts {
    bodyKey?: string;
    queryKey?: string;
    headerKey?: string;
    reqKey?: string;
}
