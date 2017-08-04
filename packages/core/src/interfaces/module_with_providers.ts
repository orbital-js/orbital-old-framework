import { Module } from '../decorators/module';
import { Provider } from 'injection-js';

export interface ModWithProviders {
    obModule: Module;
    providers: Provider[];
}

export type ModuleWithProviders = (...args: any[]) => ModWithProviders;