import { Application } from 'express';
import { bootstrap } from './bootstrap/bootstrap';

export function platformServer() {
    return {
        bootstrap
    };
}
