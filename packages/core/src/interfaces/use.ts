import { ApplicationRequestHandler } from 'express-serve-static-core';
export interface Use {
    use: ApplicationRequestHandler<this>;
}