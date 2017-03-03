import { Db, Collection } from 'mongodb';

export class Collections {
    public collection: Collection;
    constructor(db: Db, collection: string) {
        this.collection = db.collection(collection);
    }
    find(query?: object, fields?: object, skip?: number, limit?: number, timeout?: number) {
        return this.collection.find(query, fields, skip, limit, timeout);
    }
}
