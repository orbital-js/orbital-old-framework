import { Provider } from 'injection-js';
export abstract class ModuleBase {
    imports?: any[];
    providers?: Provider[];
}
