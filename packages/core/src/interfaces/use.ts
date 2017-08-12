import { ApplicationRequestHandler, RequestHandler } from 'express-serve-static-core';

export interface Use {
    use: ApplicationRequestHandler<any> | RequestHandler;
}