import { RouteConfig } from '../types/route';

export function Route(annotation: RouteConfig): Function {
    return (target: Function) => {
        let original = target;

        return original;
    };
}

@Route({
    path: '/',
    method: 'put',
    controller: class { }
})
export class Rte {

}