# Injectable

<type-card type="decorator"></type-card>

`@Injectable()` works exactly as you would expect it to coming from an Angular background: it simply creates a reusable, injectable service. 

To use an Injectable service, add it to the `providers` array of your Module, and assign it to a type on a Middleware or Orbital.

### Example
Make an `Injectable` class like the one below. You can add as many properties or methods as you like, just remember *not* to make them `static`, or else they won't be available to the injector!
```ts
import { Injectable } from '@orbital/core';

@Injectable()
export class MyService {
    constructor() {}

    sayName(name: string = 'world') {
        return `Hello, ${name}!`;
    }
}
```
Now, we can import it into an Orbital, and have a globally-available, centralized method with which we can say "Hello"!
```ts
import { Controller } from '@orbital/core';
import { MyService } from './my-service.ts';

@Controller()
export class MyRoute {
    constructor(
        public myService: MyService
    ) {}

    get(req, res) {
        res.send(this.myService.sayName('Orbital'));
    }

    patch(req, res) {
        res.send(this.myService.sayName());
    }
}
```
