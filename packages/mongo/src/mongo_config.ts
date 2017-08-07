import { InjectionToken } from '@orbital/core';
import { MongoClientConfig } from './mongo_client_config';

export const MongoConfig = new InjectionToken<MongoClientConfig>('mongoconfig');