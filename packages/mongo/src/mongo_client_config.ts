import { Injectable } from '@orbital/core';
import { MongoClientOptions } from 'mongodb';

export class MongoClientConfig {
    url: string;
    options?: MongoClientOptions;
}