import { Response } from 'express';
export class Errors {
    public static handle(error: Error, res?: Response) {
        res.status(error.httpCode).json({ message: error.message, code: error.code });
        throw new Error(error.message);
    }
}

type HttpCode = number | 500;

export interface Error {
    message: string;
    code: string | number;
    httpCode?: 500 | 404 | 200 | number;
}