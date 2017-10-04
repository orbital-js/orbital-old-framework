import { Request, Response } from '../../../src/core';

import { Controller } from '../../../src/decorators/controller';
import { Route } from '../../../src/decorators/route';

@Controller()
export class RootController {
    @Route()
    main(req: Request, res: Response) {
        res.status(200).send('success');
    }
}
