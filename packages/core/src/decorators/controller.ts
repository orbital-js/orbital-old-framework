import { TypeDecorator, makeDecorator } from './util';

export interface Controller {
    path?: string;
}

export interface ControllerDecorator {
    (obj?: Controller): TypeDecorator;

    new(obj?: Controller): Controller;
}


export const Controller: ControllerDecorator =
    <ControllerDecorator>makeDecorator('Controller', (controller: Controller = { path: '/' }) => {
        return controller;
    });