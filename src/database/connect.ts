import { MongoClient, Db, MongoError } from 'mongodb';

export class Connection {
    public static _open(config: Config): Promise<Db> {
        return MongoClient.connect(new Url(config).url);
    }
}

export interface Config {
    username?: string;
    password?: string;
    host: string;
    port?: number;
    database: string;
}

class Url {
    url: string;
    constructor(public config: Config) {
        config.port = config.port ? config.port : 27101;
        if (config.username && config.password) {
            this.url = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database;
        } else if ((config.username && !config.password) || (!config.username && config.password)) {
            throw new Error('You must have a username and password for an authenticated database. Authentication is optional, but highly recommended.');
        } else {
            console.warn('Using an authenticated database is highly recommended.');
            this.url = 'mongodb://' + config.host + ':' + config.port + '/' + config.database;
        }
    }
}