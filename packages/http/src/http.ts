import 'rxjs/add/observable/fromPromise';

import * as got from 'got';

import { IncomingMessage, RequestOptions } from 'http';

import { GotJSONOptions } from 'got';
import { Injectable } from '@orbital/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { mergeOptions } from './http_util';

@Injectable()
export class Http {

    static _defaults: GotJSONOptions = <GotJSONOptions>{};

    constructor() { }

    request(url: string, options: RequestOptions): Observable<got.Response<any>> {
        return Observable.fromPromise(got(url, options));
    }

    get(url: string, options: GotJSONOptions) {
        return this.request(url, mergeOptions(options, <GotJSONOptions>{ method: 'get' }));
    }

    post(url: string, body: any, options: GotJSONOptions) {
        return this.request(url, mergeOptions(options, { json: body, method: 'post' }));
    }

    put(url: string, body: any, options: GotJSONOptions) {
        return this.request(url, mergeOptions(options, { json: body, method: 'put' }));
    }

    patch(url: string, body: any, options: GotJSONOptions) {
        return this.request(url, mergeOptions(options, { json: body, method: 'patch' }));
    }

    delete(url: string, options: GotJSONOptions) {
        return this.request(url, mergeOptions(options, <GotJSONOptions>{ method: 'delete' }));
    }

    head(url: string, options: GotJSONOptions) {
        return this.request(url, mergeOptions(options, <GotJSONOptions>{ method: 'head' }));
    }

    set defaults(opts: GotJSONOptions) {
        Http._defaults = mergeOptions(opts);
    }

    get defaults(): GotJSONOptions {
        return Http._defaults;
    }
}
