import { Injectable } from '@wbhob/core';
import { MongoClientOptions } from 'mongodb';

export interface MongoClientConfig {
    uri: string;
    options?: MongoClientOptions;
}