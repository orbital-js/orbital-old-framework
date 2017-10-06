import { Provider } from 'injection-js';
import { Engine } from '../engines';
import { ModuleBase } from '../interfaces/module_base';
import { makeDecorator, TypeDecorator } from './util';


export interface Module extends ModuleBase {
    imports?: any[];
    providers?: Provider[];
    controllers?: any[];
    middlewares?: any[];
    config?: {
        port?: number;
        path?: string;
        engine?: Engine;
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
