import { Provider } from 'injection-js';
import * as path from 'path';
import { ModuleBase } from './interfaces/module_base';
import { ModuleWithProviders } from './interfaces/module_with_providers';

export function looseIdentical(a: any, b: any): boolean {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}

export function stringify(token: any): string {
    if (typeof token === 'string') {
        return token;
    }

    if (token == null) {
        return '' + token;
    }

    if (token.overriddenName) {
        return `${token.overriddenName}`;
    }

    if (token.name) {
        return `${token.name}`;
    }

    const res = token.toString();

    if (res == null) {
        return '' + res;
    }

    const newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}



export function cycleProviders<T extends ModuleBase>(modules: (T | ModuleWithProviders)[] = []): Provider[] {
    let providers: Provider[] = [];
    modules.forEach(mod => {
        let annotation: T = getModule<T>(mod);
        if ((<ModuleWithProviders>mod).obModule && (<ModuleWithProviders>mod).providers) {
            providers = providers.concat((<ModuleWithProviders>mod).providers || []);
        } else {
            providers = providers.concat(annotation.providers || []);
        }

        if (annotation.imports) {
            providers = providers.concat(cycleProviders(annotation.imports));
        }
    });

    return providers;
}

export function getModule<T>(mod: any): T {
    if ((<ModuleWithProviders>mod).obModule) {
        return Reflect.getMetadata('annotations', (<ModuleWithProviders>mod).obModule)[0];
    } else {
        return Reflect.getMetadata('annotations', mod)[0];
    }

}


export function unique(array: any) {
    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}
export function joinPath(...config: any[]) {
    let pth = ['/'];
    config.forEach((conf: any) => {
        if (conf.path) {
            pth.push(conf.path);
        }
    });
    return path.join(pth.join('/'));
}

export function isFunction(functionToCheck: Function) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
export const methods = ['get', 'post', 'patch', 'put', 'delete', 'options', 'all', 'head'];
export type Methods = 'get' | 'post' | 'patch' | 'put' | 'delete' | 'options' | 'all' | 'head';
