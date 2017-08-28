# Middleware

<type-card type="decorator"></type-card>

Middlewares are classes that perform manipulations on the request or response objects before they pass into the Orbitals. Middlewares should be added to the `middlewares` array of your module. Middlewares are fully capable of using Orbital's injector, meaning you can inject services into your middleware without issues.

Every middleware must have a method called `use`, which serves as the middleware's request handler.

```ts
import { Middleware, Use } from '@orbital/core';
import * as bodyParser from 'body-parser';

@Middleware()
export class AuthenticationChecker implements Use {
    use(req, res, next) {
        bodyParser.json()(req, res, next);
    }
}
```

This is a contrived example of how you can use pre-existing Express middlewares in Orbital. Fortunately, Orbital includes some popular middlewares in the `@orbital/middlewares` module.

## Decorator Properties
------
| Property | Description                                      |
| -------- | ------------------------------------------------ |
| `path`   | The path from which the middleware should apply. |