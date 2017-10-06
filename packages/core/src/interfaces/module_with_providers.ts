import { Provider } from 'injection-js';
import { Module } from '../decorators/module';

export interface ModuleWithProviders {
    obModule: any;
    providers: Provider[] | any[];
}
