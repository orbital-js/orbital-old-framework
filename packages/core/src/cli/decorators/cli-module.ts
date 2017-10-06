import { Provider } from 'injection-js';
import { makeDecorator, TypeDecorator } from '../../decorators/util';
import { ModuleBase } from '../../interfaces/module_base';


export interface CliModule extends ModuleBase {
    imports?: any[];
    providers?: Provider[];
    commands?: any[];
    config?: {
        version: string;
    };
}

export interface CliModuleDecorator {
    (obj: CliModule): TypeDecorator;

    new(obj: CliModule): CliModule;
}


export const CliModule: CliModuleDecorator =
    <CliModuleDecorator>makeDecorator('CliModule', (mod: CliModule = {}) => mod);
