import { assert, expect } from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import { check } from '../../../util';
import { app } from '../../main';

const path = '/submodule/exit';

describe('SubModule - middleware', () => {
    it('should get 401 from HTTP call', (done) => {
        supertest(app)
            .get(path)
            .expect(401, done);
    });

    it('should get error code from response', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.body).to.haveOwnProperty('code');
                }, done);
            });
    });

    it('should get error code from response', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.body).to.include({code: 'ACCESS_DENIED'});
                }, done);
            });
    });

    it('should not have a 200 code', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.status).to.not.equal(200);
                }, done);
            });
    });
});
