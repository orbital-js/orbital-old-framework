import { Db, Collection } from 'mongodb';

export class Collections {
    get(db: Db, collection: string) {
        db.collection(collection).then((collection: Collection) => {

        })
    }
}