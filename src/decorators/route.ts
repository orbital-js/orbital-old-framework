import { RouteConfig } from '../types/route';

export function Route(annotation: RouteConfig): Function {
    return (constructor: Function) => {
        let original = constructor;

        return original;
    };
}

import {Ctrl} from './controller';

@Route({
    path: '/',
    method: 'put',
    controller: Ctrl
})
export class getUser {

}