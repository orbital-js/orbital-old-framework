import { Module } from '@orbital/core';
import { Http } from './http';


@Module({
    providers: [Http]
})
export class HttpModule { }