import { Injectable } from '../../../../src/core';

@Injectable()
export class TestService {
    sayHello() {
        return 'Hello, World!';
    }
}
