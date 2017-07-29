import { Request, Response, NextFunction } from 'express';
export interface Post {
    post(req: Request, res: Response, next?: NextFunction): void;
}