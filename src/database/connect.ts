import { MongoClient, Db } from 'mongodb';
import { DatabaseConnectionConfig } from '../types/database';

export class Connection {
    public static _open(config: DatabaseConnectionConfig): Promise<Db> {
        return MongoClient.connect(new Url(config).url);
    }
}

class Url {
    url: string;
    constructor(public config: DatabaseConnectionConfig) {
        let connectionString: string = 'mongodb://';
        if (config.username && config.password) {
            connectionString = connectionString + config.username + ':' + config.password + '@';
        } else {
            console.warn('Database authentication is not required, but highly recommended. Read more: https://www.mongodb.com/blog/post/how-to-avoid-a-malicious-attack-that-ransoms-your-data');
        }
        let hostString: string;
        for (let i = 0; i < config.hosts.length; i++) {
            hostString = hostString + config.hosts[i].host;
            if (config.hosts[i].port) {
                hostString = hostString + ':' + config.hosts[i].port;
            }
            if (i + 1 < config.hosts.length) {
                hostString = hostString + ',';
            }
        }
        connectionString = connectionString + hostString + '/';
        if (config.database) {
            connectionString = connectionString + config.database;
        }
        if (config.options) {
            connectionString = connectionString + '?';
            for (let option in config.options) {
                connectionString = connectionString + option + '=' + config.options[option] + '&';
            }
        }
        this.url = connectionString;
    }
}