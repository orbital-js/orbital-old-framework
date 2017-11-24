import { NextFunction } from 'express';
import { Injectable } from 'injection-js';

@Injectable()
export class Next {
    next: NextFunction;
}
