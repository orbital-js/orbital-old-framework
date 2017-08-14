import * as bodyParser from 'body-parser';

import { Middleware, Module, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class BodyParserJson implements Use {

    public static options: bodyParser.OptionsJson = {};

    constructor() { }

    static configure(options: bodyParser.OptionsJson) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        bodyParser.json(BodyParserJson.options)(req, res, next);
    }
}