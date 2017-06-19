import { Response, Request } from 'express';
import { ReflectiveInjector, Injectable } from 'injection-js';
import { Route } from '../route';
import 'reflect-metadata';

@Injectable()
export class Item {
    hello = 'sup';
    collect() {
        console.log(this.hello);
    }
}

@Route({
    path: '/'
})
export class RouteTest {
    constructor(public item: Item) { }

    get(req: Request, res: Response) {
        res.send('Hello');
    }
}