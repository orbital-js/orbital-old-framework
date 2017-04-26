import { RequestHandler, ErrorRequestHandler } from 'express';
import { Response } from 'express';

/**
 * @interface BoatConfig
 * @description An interface to validate the input to a Boat module
 */
export interface BoatConfig {
    /**
     * An array of Express middlewares, in the order that they are needed by your app
     */
    middlewares?: (RequestHandler | ErrorRequestHandler)[];
    /**
     * An array of each of the features you have created. Do not include controllers.
     */
    features?: any[];
    /**
     * Options for built-in middlewares you can use
     */
    config?: {
        /**
         * You have the option to use bearer tokens with your methods
         */
        bearerToken?: boolean;

        /**
         * The port on which to operate your app server
         */
        port?: number;
    }
}