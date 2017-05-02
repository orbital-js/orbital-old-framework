import { Response } from 'express';
export class Errors {
    public static handle(res: Response, error: Error) {
        res.status(error.status).json({ message: error.message, code: error.code, status: error.status });
        throw new Error(error.message);
    }
}

type HttpCode = number | 500;

export interface Error {
    message: string;
    code: string | number;
    status?: 500 | 404 | 200 | number;
}