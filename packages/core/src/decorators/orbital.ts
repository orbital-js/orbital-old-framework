import { TypeDecorator, makeDecorator } from './util';

export interface Orbital {
    path?: string;
}

export interface OrbitalDecorator {
    (obj?: Orbital): TypeDecorator;

    new(obj?: Orbital): Orbital;
}


export const Orbital: OrbitalDecorator =
    <OrbitalDecorator>makeDecorator('Orbital', (orbital: Orbital = { path: '/' }) => {
        console.log(orbital);
        return orbital;
    });