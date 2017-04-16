import { Methods } from '../methods';
export interface RouteDescriptor {
    path: string;
    executor: Function;
    method: Methods;
    route: true;
}