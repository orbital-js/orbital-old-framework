import { InjectionToken } from 'injection-js';
import { Module } from '@orbital/core';
import { Mongo } from './mongo';

export const DB_URI = new InjectionToken('');

@Module({})
export class MongoModule {
    static forRoot(dbUri: string) {
        return {
            module: MongoModule,
            providers: [
                { provider: DB_URI, useValue: dbUri },
                Mongo
            ]
        };
    }
}