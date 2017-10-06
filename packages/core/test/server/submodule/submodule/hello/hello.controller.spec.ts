import { assert, expect } from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import { check } from '../../../../util';
import { app } from '../../../main';

const path = '/submodule/subchild';

describe('SubModule - child module and dependency injection', () => {
    it('should get 200 from HTTP call', (done) => {
        supertest(app)
            .get(path)
            .expect(200, done);
    });

    it('should get "Hello, World!" back from HTTP call', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.text).to.equal('Hello, World!');
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
