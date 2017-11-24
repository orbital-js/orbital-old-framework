import { ApplicationRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';


export abstract class Use {
    abstract use(req: Request, res: Response, next: NextFunction): any;
}
