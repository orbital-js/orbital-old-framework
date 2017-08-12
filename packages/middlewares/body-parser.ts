import * as bodyParser from 'body-parser';

import { Middleware, NextFunction, Request, Response, Use } from '@orbital/core';

@Middleware()
export class BodyParserJson implements Use {
    use(req: Request, res: Response, next: NextFunction) { 
        bodyParser.json()(req, res, next);
    }
}

@Middleware()
export class BodyParserRaw implements Use {
    use(req: Request, res: Response, next: NextFunction) { 
        bodyParser.raw()(req, res, next);
    }
}

@Middleware()
export class BodyParserText implements Use {
    use(req: Request, res: Response, next: NextFunction) { 
        bodyParser.text()(req, res, next);
    }
}

@Middleware()
export class BodyParserUrlEncoded implements Use {
    use(req: Request, res: Response, next: NextFunction) { 
        bodyParser.urlencoded()(req, res, next);
    }
}
