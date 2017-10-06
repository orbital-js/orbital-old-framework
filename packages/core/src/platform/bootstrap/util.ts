import * as path from 'path';
import 'reflect-metadata';
import { Module } from '../../decorators/module';
import { ModuleWithProviders } from '../../interfaces/module_with_providers';



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

export function getModule(mod: any): Module {
    if ((<ModuleWithProviders>mod).obModule) {
        return Reflect.getMetadata('annotations', (<ModuleWithProviders>mod).obModule)[0];
    } else {
        return Reflect.getMetadata('annotations', mod)[0];
    }

}
