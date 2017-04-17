import { RequestHandler, ErrorRequestHandler } from 'express';
import { Response } from 'express';

export interface BoatConfig {
    /**
     * An array of Express middlewares, in the order that they are needed by your app
     */
    middlewares?: (RequestHandler | ErrorRequestHandler)[];
    /**
     * An array of each of the features you have created. Do not include controllers.
     */
    features?: any[];
}