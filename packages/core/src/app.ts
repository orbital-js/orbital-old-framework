import * as express from 'express';

import { Application, ApplicationRequestHandler, ErrorRequestHandler, Express, IRoute, IRouterHandler, IRouterMatcher, Request, RequestHandler, RequestParamHandler, Response } from 'express-serve-static-core';

import { Injectable } from 'injection-js';
import { Server } from 'http';

@Injectable()
export class App {
    public all: IRouterMatcher<this>;
    public checkout: IRouterMatcher<this>;
    public configure: Application['configure'];
    public connect: IRouterMatcher<this>;
    public copy: IRouterMatcher<this>;
    public defaultConfiguration: Application['defaultConfiguration'];
    public delete: IRouterMatcher<this>;
    public disable: Application['disable'];
    public disabled: Application['disabled'];
    public enable: Application['enable'];
    public enabled: Application['enabled'];
    public engine: Application['engine'];
    public get: Application['get'];
    public head: IRouterMatcher<this>;
    public init: Application['init'];
    public listen: Application['listen'];
    public locals: Application['locals'];
    public lock: IRouterMatcher<this>;
    public map: Application['map'];
    public merge: IRouterMatcher<this>;
    public mkactivity: IRouterMatcher<this>;
    public mkcol: IRouterMatcher<this>;
    public move: IRouterMatcher<this>;
    public ['m-search']: IRouterMatcher<this>;
    public notify: IRouterMatcher<this>;
    public options: IRouterMatcher<this>;
    public param: Application['param'] | any;
    public patch: IRouterMatcher<this>;
    public path: Application['path'];
    public post: IRouterMatcher<this>;
    public propfind: IRouterMatcher<this>;
    public proppatch: IRouterMatcher<this>;
    public purge: IRouterMatcher<this>;
    public put: IRouterMatcher<this>;
    public render: Application['render'];
    public report: IRouterMatcher<this>;
    public request: Request;
    public resource: Application['resource'];
    public response: Response;
    public route: Application['route'];
    public routes: Application['routes'];
    public router: Application['router'];
    public _router: Application['_router'];
    public search: IRouterMatcher<this>;
    public set: Application['set'];
    public settings: Application['settings'];
    public stack: Application['stack'];
    public subscribe: IRouterMatcher<this>;
    public trace: IRouterMatcher<this>;
    public unlock: IRouterMatcher<this>;
    public unsubscribe: IRouterMatcher<this>;
    public use: ApplicationRequestHandler<this>;
}
