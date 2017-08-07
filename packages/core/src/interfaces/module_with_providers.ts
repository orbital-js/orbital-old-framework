import { Module } from '../metadata/module';
import { Provider } from '../di/provider';

export interface ModWithProviders {
    obModule: Module;
    providers: Provider[];
}

export type ModuleWithProviders = (...args: any[]) => ModWithProviders;