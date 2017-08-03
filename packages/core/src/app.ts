import * as express from 'express';

import { Application, ApplicationRequestHandler, ErrorRequestHandler, IRoute, IRouterHandler, IRouterMatcher, Request, RequestHandler, RequestParamHandler, Response } from 'express-serve-static-core';

import { Express } from 'express';
import { Injectable } from 'injection-js';
import { Server } from 'http';

@Injectable()
export class App {
    public _app: any = express();
    constructor() { }

    public all = this._app.all;
    public lazyrouter = this._app.lazyrouter;
    public checkout = this._app.checkout;
    public configure = this._app.configure;
    public connect = this._app.connect;
    public copy = this._app.copy;
    public defaultConfiguration = this._app.defaultConfiguration;
    public delete = this._app.delete;
    public disable = this._app.disable;
    public disabled = this._app.disabled;
    public enable = this._app.enable;
    public enabled = this._app.enabled;
    public engine = this._app.engine;
    public get = this._app.get;
    public head = this._app.head;
    public init = this._app.init;
    public listen = this._app.listen;
    public locals = this._app.locals;
    public lock = this._app.lock;
    public map = this._app.map;
    public merge = this._app.merge;
    public mkactivity = this._app.mkactivity;
    public mkcol = this._app.mkcol;
    public move = this._app.move;
    public notify = this._app.notify;
    public options = this._app.options;
    public param = this._app.param;
    public patch = this._app.patch;
    public path = this._app.path;
    public post = this._app.post;
    public propfind = this._app.propfind;
    public proppatch = this._app.proppatch;
    public purge = this._app.purge;
    public put = this._app.put;
    public render = this._app.render;
    public report = this._app.report;
    public request = this._app.request;
    public resource = this._app.resource;
    public response = this._app.response;
    public route = this._app.route;
    public routes = this._app.routes;
    public search = this._app.search;
    public set = this._app.set;
    public settings = this._app.settings;
    public stack = this._app.stack;
    public subscribe = this._app.subscribe;
    public trace = this._app.trace;
    public unlock = this._app.unlock;
    public unsubscribe = this._app.unsubscribe;
    public use = this._app.use;

}