import { Request, Response, NextFunction } from 'express';
export interface Use {
    use(req: Request, res: Response, next?: NextFunction): void;
}