import { Collection, Cursor } from 'mongodb';
export class Cursors {
    constructor(collection: Collection, config: CursorConfig) {

    }
}

export interface CursorConfig {
    query?: object;
    fields?: object;
    skip?: number;
    limit?: number;
    timout?: number;
    docs: object | object[];
}