import * as _ from 'lodash';

import { GotJSONOptions } from 'got';
import { Http } from './http';
import { RequestOptions } from 'http';

export function mergeOptions(...options: GotJSONOptions[]): GotJSONOptions {
    return _.assign({}, Http._defaults, ...options);
}
