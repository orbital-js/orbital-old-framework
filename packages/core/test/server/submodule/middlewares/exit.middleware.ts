import { Middleware, Request, Response } from '../../../../src/core';

@Middleware({
    path: '/exit'
})
export class ExitMiddleware {
    use(req: Request, res: Response) {
        res.status(401).json({'code': 'ACCESS_DENIED'});
    }
}
