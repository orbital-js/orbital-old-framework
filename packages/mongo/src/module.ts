import { InjectionToken, Module } from '@orbital/core';

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
            obModule: MongoModule,
            providers: [
                { provider: MongoClientConfig, useValue: dbConfig },
                Mongo
            ]
        };
    }
}