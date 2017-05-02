import { HttpMethods } from './http-methods';
export interface Method {
    path: string;
    method: HttpMethods;
}