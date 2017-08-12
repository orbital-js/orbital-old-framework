import * as bodyParser from 'body-parser';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';
import { Options, OptionsJson, OptionsText, OptionsUrlencoded } from 'body-parser';

@Middleware()
export class BodyParserJson implements Use {

    constructor(
        @Optional() public options: OptionsJson = {}
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        bodyParser.json(this.options)(req, res, next);
    }
}

@Middleware()
export class BodyParserRaw implements Use {

    constructor(
        @Optional() public options: Options = {}
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        bodyParser.raw(this.options)(req, res, next);
    }
}

@Middleware()
export class BodyParserText implements Use {

    constructor(
        @Optional() public options: OptionsText = {}
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        bodyParser.text(this.options)(req, res, next);
    }
}

@Middleware()
export class BodyParserUrlEncoded implements Use {

    constructor(
        @Optional() public options: OptionsUrlencoded = {}
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        bodyParser.urlencoded(this.options)(req, res, next);
    }
}
