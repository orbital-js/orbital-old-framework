import 'mocha';

import * as supertest from 'supertest';

import { app } from '../../main';
import { check } from '../../../util';
import { expect } from 'chai';

const path = '/body';
const body = { name: 'Allison' };
const request = () => supertest(app)
    .post(path)
    .send(body);

describe('BodyController', () => {
    it('should not return 200 from an HTTP call', (done) => {
        request()
            .expect(200, done);
    });

    it('should get JSON from HTTP call', (done) => {
        request()
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.body).to.be.an('object');
                }, done);
            });
    });

    it('should have a status property on the JSON', (done) => {
        request()
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.body).to.have.property('name');
                }, done);
            });
    });

    it('should have a value of 200 on the status property of the body', (done) => {
        request()
            .then((response: supertest.Response) => {
                check(() => {
                    expect(response.body).to.include(body);
                }, done);
            });
    });
});
