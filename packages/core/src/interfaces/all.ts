import { Request, Response, NextFunction } from 'express';
export interface All {
    all(req: Request, res: Response, next?: NextFunction): void;
}