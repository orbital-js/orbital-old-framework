import * as path from 'path';

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

export const methods = ['get', 'post', 'patch', 'put', 'delete', 'options', 'all', 'head'];
export type Methods = 'get' | 'post' | 'patch' | 'put' | 'delete' | 'options' | 'all' | 'head';

export function isFunction(functionToCheck: Function) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}