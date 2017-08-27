# Middleware

<type-card type="decorator"></type-card>

Middlewares are classes that perform manipulations on the request or response objects before they pass into the Orbitals. Middlewares should be added to the `middlewares` array of your module. Middlewares are fully capable of using Orbital's injector, meaning you can inject services into your middleware without issues.

Every middleware must have a method called `use`, which serves as the middleware's request handler.

```ts
import { Middleware } from '@orbital/core';

@Middleware()
export class AuthenticationChecker {

}
```