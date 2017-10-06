import { Controller, Request, Response, Route } from '../../../../src/core';

@Controller({
    path: '/json'
})
export class JsonController {

    @Route()
    main(req: Request, res: Response) {
        res.status(200).json({ status: 200 });
    }

}
