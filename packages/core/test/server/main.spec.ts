import { assert, expect } from 'chai';
import * as express from 'express';
import 'mocha';
import * as supertest from 'supertest';
import { check } from '../util';
import { app } from './main';


describe('Application Bootstrap', () => {
    it('should create an instance of express', () => {
        assert.isOk(app);
    });
});
