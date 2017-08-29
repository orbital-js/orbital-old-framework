import { TypeDecorator, makeDecorator } from './util';

import { Provider } from 'injection-js';

export interface CliModule {
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