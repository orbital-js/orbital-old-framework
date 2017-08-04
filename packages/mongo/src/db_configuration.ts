import { Injectable } from '@orbital/core';
import { MongoClientOptions } from 'mongodb';

@Injectable()
export class MongoClientConfig {
    uri: string;
    options?: MongoClientOptions;
    
    constructor() { }
}