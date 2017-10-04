import * as supertest from 'supertest';

import { app } from './main';

describe('ROOT', () => {
    it('should return 200 from server call', (done) => {
        supertest(app)
            .get('/')
            .expect(200, done);
    });
});
