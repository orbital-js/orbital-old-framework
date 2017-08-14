import * as bodyParser from 'body-parser';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class BodyParserRaw implements Use {

    public static options: bodyParser.Options = {};

    constructor() { }

    static configure(options: bodyParser.Options) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        bodyParser.raw(BodyParserRaw.options)(req, res, next);
    }
}

