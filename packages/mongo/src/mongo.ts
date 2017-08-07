import {
    Admin,
    Collection,
    CollectionCreateOptions,
    CommandCursor,
    Db,
    DbAddUserOptions,
    DbCollectionOptions,
    IndexOptions,
    MongoCallback,
    MongoClient,
    Mongos,
    ReadPreference,
    ReplSet,
    Server
} from 'mongodb';
import { Inject, Injectable } from '@wbhob/core';

import { MongoClientConfig } from './mongo_client_config';

export type Default = any;

@Injectable()
export class Mongo {
    serverConfig: Server | ReplSet | Mongos = this.db.serverConfig;
    bufferMaxEntries: number = this.db.bufferMaxEntries;
    databaseName: string = this.db.databaseName;
    options: any = this.db.options;
    native_parser: boolean = this.db.native_parser;
    slaveOk: boolean = this.db.slaveOk;
    writeConcern: any = this.db.writeConcern;

    addUser = this.db.addUser;
    admin = this.db.admin;
    authenticate = this.db.authenticate;
    close = this.db.close;
    collection = this.db.collection;
    collections = this.db.collections;
    command = this.db.command;
    createCollection = this.db.createCollection;
    createIndex = this.db.createIndex;
    dropCollection = this.db.dropCollection;
    dropDatabase = this.db.dropDatabase;
    executeDbAdminCommand = this.db.executeDbAdminCommand;
    indexInformation = this.db.indexInformation;
    listCollections = this.db.listCollections;
    logout = this.db.logout;
    open = this.db.open;
    removeUser = this.db.removeUser;
    renameCollection = this.db.renameCollection;
    stats = this.db.stats;


    constructor(
        private db: Db
    ) { }

    // addUser(username: string, password: string, options?: DbAddUserOptions): Promise<any>;
    // admin(): Admin;
    // authenticate(userName: string, password: string, options?: { authMechanism: string }): Promise<any>;
    // close(forceClose?: boolean): Promise<void>;
    // collection<TSchema = Default>(name: string, options?: DbCollectionOptions): Collection<TSchema>;
    // collections(): Promise<Collection<Default>[]>;
    // command(command: Object, options?: { readPreference: ReadPreference | string }): Promise<any>;
    // createCollection<TSchema = Default>(name: string, options?: CollectionCreateOptions): Promise<Collection<TSchema>>;
    // createIndex(name: string, fieldOrSpec: string | Object, options?: IndexOptions): Promise<any>;
    // dropCollection(name: string): Promise<boolean>;
    // dropDatabase(): Promise<any>;
    // executeDbAdminCommand(command: Object, options?: { readPreference?: ReadPreference | string, maxTimeMS?: number }): Promise<any>;
    // indexInformation(name: string, options?: { full?: boolean, readPreference?: ReadPreference | string }): Promise<any>;
    // listCollections(filter: Object, options?: { batchSize?: number, readPreference?: ReadPreference | string }): CommandCursor;
    // logout(options?: { dbName?: string }): Promise<any>;
    // open(): Promise<Db>;
    // removeUser(username: string, options?: { w?: number | string, wtimeout?: number, j?: boolean }): Promise<any>;
    // renameCollection<TSchema = Default>(fromCollection: string, toCollection: string, options?: { dropTarget?: boolean }): Promise<Collection<TSchema>>;
    // stats(options?: { scale?: number }): Promise<any>;
}