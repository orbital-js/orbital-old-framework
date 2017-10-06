import { assert, expect } from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import { check } from '../../../../util';
import { app } from '../../../main';

const path = '/submodule';

describe('SubModule - child paths', () => {
    it('should get 200 from HTTP call', (done) => {
        supertest(app)
            .get(path)
            .expect(200, done);
    });

    it('should get "success" back from HTTP call', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.text).to.equal('success');
                }, done);
            });
    });

    it('should not have a value of hello', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.text).to.not.equal('hello');
                }, done);
            });
    });

    it('should not have an HTTP code of 404', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.status).to.not.equal('404');
                }, done);
            });
    });
});
