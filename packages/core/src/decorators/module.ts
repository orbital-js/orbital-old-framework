import { TypeDecorator, makeDecorator } from './util';

import { Provider } from 'injection-js';

export interface Module {
    imports?: any[];
    providers?: Provider[];
    controllers?: any[];
    middlewares?: any[];
    config?: {
        port?: number;
        path?: string;
    };
}

/**
 * @description 
 * @export
 * @interface ModuleDecorator
 */
export interface ModuleDecorator {
    (obj: Module): TypeDecorator;

    new(obj: Module): Module;
}


export const Module: ModuleDecorator =
    <ModuleDecorator>makeDecorator('Module', (mod: Module = {}) => mod);