import { Request, Response, NextFunction } from 'express';
export interface Patch {
    patch(req: Request, res: Response, next?: NextFunction): void;
}