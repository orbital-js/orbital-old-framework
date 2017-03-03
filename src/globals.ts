import { Response } from 'express';
import { Errors, Error } from './errors';
import { Route } from './types/route';

interface Type<T> extends Function {
    new (...args: any[]): T;
}

interface TypeDecorator {
    annotations: any[];
    Class(obj: ClassDefinition): Type<any>;
}

interface ClassDefinition {
    extends: Type<any>;
    constructor: Function | any[];
}

export function Boat(annotation?: Config): Function {
    return (target: Function) => {
        let original = target;
        let error = (error: Error) => {
            Errors.handle(annotation.res, error);
        };
        return original;
    };
}
export interface Config {
    res?: Response;
    routes: Route[];

}


@Boat({

})
export class Hello { }