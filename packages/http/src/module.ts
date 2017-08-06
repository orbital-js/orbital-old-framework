import 'reflect-metadata';

import { Http } from './http';
import { Module } from '@orbital/core';

@Module({
    providers: [Http]
})
export class HttpModule { }