import * as _ from 'lodash';
import * as request from 'request';

import { Injectable } from '@orbital/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { mergeOptions } from './http_util';

@Injectable()
export class Http {

    private _defaults: request.Options;

    constructor() { }

    request(options: request.Options) {
        return Observable.create((observer: Observer<request.RequestResponse>) => {
            request(options, (err, response: request.RequestResponse, body) => {
                observer.next(response);
                observer.complete();
            });
        });
    }

    get(url: string, options: request.Options = <any>{}): Observable<request.RequestResponse> {
        return this.request(mergeOptions(options, { url: url, method: 'get' }));
    }

    post(url: string, body: any, options: request.Options = <any>{}): Observable<request.RequestResponse> {
        return this.request(mergeOptions(options, { url: url, method: 'post', body: body }));
    }

    put(url: string, body: any, options: request.Options = <any>{}): Observable<request.RequestResponse> {
        return this.request(mergeOptions(options, { url: url, method: 'put', body: body }));
    }

    patch(url: string, body: any, options: request.Options = <any>{}): Observable<request.RequestResponse> {
        return this.request(mergeOptions(options, { url: url, method: 'patch', body: body }));
    }

    delete(url: string, options: request.Options = <any>{}): Observable<request.RequestResponse> {
        return this.request(mergeOptions(options, { url: url, method: 'delete' }));
    }

    head(url: string, options: request.Options = <any>{}): Observable<request.RequestResponse> {
        return this.request(mergeOptions(options, { url: url, method: 'head' }));
    }

    options(url: string, options: request.Options = <any>{}): Observable<request.RequestResponse> {
        return this.request(mergeOptions(options, { url: url, method: 'options' }));
    }

    set defaults(opts: any) {
        this._defaults = mergeOptions(opts);
        request.defaults(this._defaults);
    }

    get defaults(): any {
        return this._defaults;
    }
}