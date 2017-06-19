import { Request, Response, NextFunction } from 'express';
export interface Put {
    put(req: Request, res: Response, next?: NextFunction): void;
}