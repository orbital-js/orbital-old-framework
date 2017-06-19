/** @module @boat/core */

/* Decorators */
export { Module } from './module/module';
export { Route } from './route/route';
export { Middleware } from './middlewares/middleware';
export {Injectable} from 'injection-js';

/* Interfaces */
export { Get } from './interfaces/get';
export { Post } from './interfaces/post';
export { Patch } from './interfaces/patch';
export { Put } from './interfaces/put';
export { Delete } from './interfaces/delete';

/* Methods */
export { bootstrap } from './methods/bootstrap';
export { exportModule } from './methods/export-module';
