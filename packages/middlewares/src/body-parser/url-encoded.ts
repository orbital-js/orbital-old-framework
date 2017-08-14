import * as bodyParser from 'body-parser';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class BodyParserUrlEncoded implements Use {

    public static options: bodyParser.OptionsUrlencoded = {};

    constructor() { }

    static configure(options: bodyParser.OptionsUrlencoded) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        bodyParser.urlencoded(BodyParserUrlEncoded.options)(req, res, next);
    }
}
