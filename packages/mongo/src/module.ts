import { InjectionToken } from 'injection-js';
import { Module } from '@orbital/core';
import { Mongo } from './mongo';
import { MongoClientConfig } from './db_configuration';

@Module({
    providers: [
        MongoClientConfig,
        Mongo
    ]
})
export class MongoModule {
    static forRoot(dbConfig: MongoClientConfig) {
        return {
            module: MongoModule,
            providers: [
                { provider: MongoClientConfig, useValue: dbConfig },
                Mongo
            ]
        };
    }
}