import { Request, Response } from 'express';
import { Injectable, ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { Route } from '../route';

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