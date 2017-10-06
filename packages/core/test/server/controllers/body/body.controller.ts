import { Controller, Request, Response, Route } from '../../../../src/core';

@Controller({
    path: '/'
})
export class BodyController {

    @Route({
        path: '/body',
        method: 'post'
    })
    main(req: Request, res: Response) {
        res.status(200).json({ name: req.body.name });
    }

}
