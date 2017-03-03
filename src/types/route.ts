import { RequestHandler, ErrorRequestHandler } from 'express';

export interface Route {
    method: 'get' | 'put' | 'post' | 'delete' | 'patch';
    path: string;
    implementation: (RequestHandler | ErrorRequestHandler)[];
}