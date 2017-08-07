import 'reflect-metadata';

import { Http } from './http';
import { Module } from '@wbhob/core';

@Module({
    providers: [Http]
})
export class HttpModule { }