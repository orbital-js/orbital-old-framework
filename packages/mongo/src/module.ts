import { AsyncFactoryProvider, InjectionToken, Module } from '@wbhob/core';
import { Db, MongoClient } from 'mongodb';

import { Mongo } from './mongo';
import { MongoClientConfig } from './mongo_client_config';
import { MongoFactory } from './mongo_factory';

export const MongoConfigProvider = new InjectionToken<MongoClientConfig>('config');

@Module({
    providers: [
        Mongo
    ]
})
export class MongoModule {
    static async forRoot(config: MongoClientConfig) {
        return {
            obModule: MongoModule,
            providers: [
                {
                    provide: MongoConfigProvider,
                    useValue: config
                },
                {
                    provide: Mongo,
                    useAsyncFactory: await MongoFactory,
                    deps: [MongoConfigProvider]
                }
            ]
        };
    }
}