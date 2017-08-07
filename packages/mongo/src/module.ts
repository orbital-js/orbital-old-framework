import { InjectionToken, Module } from '@orbital/core';

import { Mongo } from './mongo';
import { MongoClientConfig } from './mongo_client_config';
import { MongoConfig } from './mongo_config';

@Module({
    providers: [
        Mongo
    ]
})
export class MongoModule {
    static forRoot(dbConfig: MongoClientConfig) {
        return {
            obModule: MongoModule,
            providers: [
                { provide: MongoConfig, useValue: dbConfig },
                Mongo
            ]
        };
    }
}