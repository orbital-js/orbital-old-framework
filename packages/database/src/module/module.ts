import { Provider } from 'injection-js';
import { TypeDecorator } from '../util/decorators';
import { makeDecorator } from '../util/decorators';

export interface Module {
    imports?: any[];
    providers?: Provider[];
    routes?: any[];
    middlewares?: any[];
    config?: {
        port?: number;
        path?: string;
    };
}

export interface ModuleDecorator {
    (obj: Module): TypeDecorator;

    new(obj: Module): Module;
}


export const Module: ModuleDecorator =
    <ModuleDecorator>makeDecorator('Module', (mod: Module = {}) => mod);