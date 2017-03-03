import { Response } from 'express';
import { Errors, Error } from './errors';
export function Boat(config: Config) {
    return (constructor: Function) => {
        let original = constructor;
        let error = (error: Error) => {
            Errors.handle(config.res, error);
        };
        return original;
    };
}
interface Config {
    res?: Response;
}