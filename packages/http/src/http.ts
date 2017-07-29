import { Injectable } from '@boat/core';
import * as _ from 'lodash';
import * as request from 'request';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class Http {

    constructor() { }

    get(url: string, options: request.Options): Observable<request.RequestResponse> {
        return Observable.create((observer: Observer<request.RequestResponse>) => {
            request.get(url, options, (err, response: request.RequestResponse, body) => {
                observer.next(response);
                observer.complete();
            });
        });
    }

    post(url: string, options: request.Options): Observable<request.RequestResponse> {
        return Observable.create((observer: Observer<request.RequestResponse>) => {
            request.post(url, options, (err, response: request.RequestResponse, body) => {
                observer.next(response);
                observer.complete();
            });
        });
    }
}