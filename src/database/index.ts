import { Db, MongoError } from 'mongodb';
import { Connection, Config } from './connect';
import { Errors } from '../errors';
export class Database {
    public static db: Database;
    public static connect(config: Config) {
        return Connection._open(config).then(db => {
            Database.db = db;
            return db;
        }).catch(error => {
            Errors.handle(error);
        });
    }
}
