import * as morgan from 'morgan';

import { Middleware, NextFunction, Optional, Request, Response, Use } from '@orbital/core';

@Middleware()
export class Morgan implements Use {

    public static options: MorganOptions = {
        format: 'dev',
        options: {}
    };

    constructor() { }

    static configure(options: MorganOptions) {
        this.options = options;
    }

    use(req: Request, res: Response, next: NextFunction) {
        if (Morgan.options.options) {
            morgan(Morgan.options.format, Morgan.options.options)(req, res, next);
        } else {
            morgan(Morgan.options.format)(req, res, next);
        }
    }

    static format(name: string, fn: morgan.FormatFn | string | any) {
        morgan.format(name, fn);
    }

    static token(name: string, fn: morgan.TokenCallbackFn) {
        morgan.token(name, fn);
    }
}

export interface MorganOptions {
    format: 'combined' | 'common' | 'dev' | 'short' | 'tiny' | string | morgan.FormatFn | any;
    options?: morgan.Options;
}
