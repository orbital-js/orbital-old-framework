import { Controller, Request, Response, Route } from '../../../../../src/core';
import { TestService } from '../test.service';

@Controller({
    path: '/subchild'
})
export class HelloController {

    constructor(
        public testService: TestService
    ) { }

    @Route()
    sayHello(req: Request, res: Response) {
        res.status(200).send(this.testService.sayHello());
    }
}
