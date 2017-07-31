import * as _ from 'lodash';
import * as request from 'request';

export function mergeOptions(...options: request.Options[]): request.Options {
    let opts: request.Options = _.assign({}, <any>request.defaults, ...options);
    return opts;
}