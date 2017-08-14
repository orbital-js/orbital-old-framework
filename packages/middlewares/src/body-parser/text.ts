import * as bodyParser from 'body-parser';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class BodyParserText implements Use {

    public static options: bodyParser.OptionsText = {};

    constructor() { }

    static configure(options: bodyParser.OptionsText) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        bodyParser.text(BodyParserText.options)(req, res, next);
    }
}
