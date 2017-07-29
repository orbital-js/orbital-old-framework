import { Request, Response, NextFunction } from 'express';
export interface Delete {
    delete(req: Request, res: Response, next?: NextFunction): void;
}