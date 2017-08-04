import * as mongo from 'mongodb';

import { Inject, Injectable } from '@orbital/core';

import { DB_URI } from './module';

@Injectable()
export class Mongo {
    constructor(
        @Inject(DB_URI) dbUri: string
    ) { }
}