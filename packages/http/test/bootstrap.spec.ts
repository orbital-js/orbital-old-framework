import 'mocha';
import { expect } from 'chai';
import * as express from 'express';
import * as http from 'http';

import * as request from 'supertest';
import { bootstrap } from '../src/methods/bootstrap';
import { AppModule } from './suite/app.module';

describe('bootstrap', () => {
    let app: express.Express;
    let server: http.Server;
    beforeEach(() => {
        app = bootstrap(AppModule);
        server = http.createServer(app);
    });
    afterEach(() => {
        server.close();
    })
    it('should successfully launch a server', (done) => {
        return request(server)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })
})