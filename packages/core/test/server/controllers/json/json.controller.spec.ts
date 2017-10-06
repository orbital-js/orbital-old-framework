import 'mocha';

import * as supertest from 'supertest';

import { assert, expect } from 'chai';

import { app } from '../../main';
import { check } from '../../../util';

const path = '/json';

describe('JsonController', () => {
    it('should get 200 from HTTP call', (done) => {
        supertest(app)
            .get(path)
            .expect(200, done);
    });

    it('should get JSON from HTTP call', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.body).to.be.an('object');
                }, done);
            });
    });

    it('should have a status property on the JSON', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.body).to.have.property('status');
                }, done);
            });
    });

    it('should have a value of 200 on the status property of the body', (done) => {
        supertest(app)
            .get(path)
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.body).to.include({ status: 200 });
                }, done);
            });
    });
});
