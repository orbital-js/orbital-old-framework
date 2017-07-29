import { NextFunction, Request, Response } from 'express';

// export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

/**
 * @description A New-able Middleware interface for internal use only
 * 
 * @private
 * @interface IMiddleware
 * @extends {Middleware}
 */
export interface IMiddleware extends Middleware {
    new (): Middleware;
}

/**
 * @description Interface for making middlewares compatible with Boat.
 * 
 * @export
 * @interface Middleware
 */
export interface Middleware {

    /**
     * @description The exact value of what you would typically pass into app.use with express
     * There is no need to nest the function as with typical Express middlewares.
     * 
     * When writing your own middlewares, be sure to pass in the `next` function to keep the app flow running.
     * 
     * You can use your own third-party middlewares simply by returning their values inside of the
     * `use` function.
     * 
     * @param {Request} [req] 
     * @param {Response} [res] 
     * @param {NextFunction} [next] 
     * 
     * @memberof Middleware
     */
    use(req?: Request, res?: Response, next?: NextFunction): void;
}