import { Request, Response, NextFunction } from 'express';
export interface Get {
    get(req: Request, res: Response, next?: NextFunction): void;
}