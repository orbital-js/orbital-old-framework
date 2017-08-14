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
import { Inject, Injectable } from '@orbital/core';

import { MongoClientConfig } from './mongo_client_config';
import { MongoConfig } from './mongo_config';

export type Default = any;

@Injectable()
export class Mongo {
    db: Db;

    get serverConfig(): Server | ReplSet | Mongos {
        return this.db.serverConfig;
    }
    set serverConfig(serverConfig: Server | ReplSet | Mongos) {
        this.db.serverConfig = serverConfig;
    }

    get bufferMaxEntries(): number {
        return this.db.bufferMaxEntries;
    }
    set bufferMaxEntries(bufferMaxEntries: number) {
        this.db.bufferMaxEntries = bufferMaxEntries;
    }

    get databaseName(): string {
        return this.db.databaseName;
    }
    set databaseName(databaseName: string) {
        this.db.databaseName = databaseName;
    }

    get options(): any {
        return this.db.options;
    }
    set options(options: any) {
        this.db.options = options;
    }

    get native_parser(): boolean {
        return this.db.native_parser;
    }
    set native_parser(native_parser: boolean) {
        this.db.native_parser = native_parser;
    }

    get slaveOk(): boolean {
        return this.db.slaveOk;
    }
    set slaveOk(slaveOk: boolean) {
        this.db.slaveOk = slaveOk;
    }

    get writeConcern(): any {
        return this.db.writeConcern;
    }
    set writeConcern(writeConcern: any) {
        this.db.writeConcern = writeConcern;
    }

    constructor(
        @Inject(MongoConfig) config: MongoClientConfig
    ) {
        if (config.options) {
            MongoClient.connect(config.url, config.options).then(db => this.db = db);
        } else {
            MongoClient.connect(config.url).then(db => this.db = db);
        }
    }

    addUser(username: string, password: string, options?: DbAddUserOptions): Promise<any> {
        return this.db.addUser(username, password, options);
    }

    admin(): Admin {
        return this.db.admin();
    }

    authenticate(userName: string, password: string, options?: { authMechanism: string }): Promise<any> {
        return this.db.authenticate(userName, password, options);
    }

    close(forceClose?: boolean): Promise<void> {
        return this.db.close(forceClose);
    }

    collection<TSchema = Default>(name: string, options?: DbCollectionOptions): Collection<TSchema> {
        return (<any>this.db).collection(name, options);
    }

    collections(): Promise<Collection<Default>[]> {
        return this.db.collections();
    }

    command(command: Object, options?: { readPreference: ReadPreference | string }): Promise<any> {
        return this.db.command(command, options);
    }

    createCollection<TSchema = Default>(name: string, options?: CollectionCreateOptions): Promise<Collection<TSchema>> {
        return this.db.createCollection(name, options);
    }

    createIndex(name: string, fieldOrSpec: string | Object, options?: IndexOptions): Promise<any> {
        return this.db.createIndex(name, fieldOrSpec, options);
    }

    dropCollection(name: string): Promise<boolean> {
        return this.db.dropCollection(name);
    }

    dropDatabase(): Promise<any> {
        return this.db.dropDatabase();
    }

    executeDbAdminCommand(command: Object, options?: { readPreference?: ReadPreference | string, maxTimeMS?: number }): Promise<any> {
        return this.db.executeDbAdminCommand(command, options);
    }

    indexInformation(name: string, options?: { full?: boolean, readPreference?: ReadPreference | string }): Promise<any> {
        return this.db.indexInformation(name, options);
    }

    listCollections(filter: Object, options?: { batchSize?: number, readPreference?: ReadPreference | string }): CommandCursor {
        return this.db.listCollections(filter, options);
    }

    logout(options?: { dbName?: string }): Promise<any> {
        return this.db.logout(options);
    }

    open(): Promise<Db> {
        return this.db.open();
    }

    removeUser(username: string, options?: { w?: number | string, wtimeout?: number, j?: boolean }): Promise<any> {
        return this.db.removeUser(username, options);
    }

    renameCollection<TSchema = Default>(fromCollection: string, toCollection: string, options?: { dropTarget?: boolean }): Promise<Collection<TSchema>> {
        return this.db.renameCollection(fromCollection, toCollection, options);
    }

    stats(options?: { scale?: number }): Promise<any> {
        return this.db.stats(options);
    }
}