import { Db, MongoClient } from 'mongodb';

import { Mongo } from './mongo';
import { MongoClientConfig } from './mongo_client_config';
import { TypeProvider } from '@wbhob/core';

export async function MongoFactory(config: MongoClientConfig): Promise<any> {
    const conf = await config;
    console.log('mongoconf', conf);
    const db: Db = await MongoClient.connect(conf.uri, conf.options = {});
    return new Mongo(db);
}
