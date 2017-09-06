# Route

<type-card type="decorator"></type-card>

`@Route()` is a property decorator for all controller classes that declares a route. It takes an object as an optional argument, with two properties: a path, and a method. 

The name of the method property should be descriptive, but it generally does not matter, as Orbital is impartial to property names.

```ts
import { Controller, Route } from '@orbital/core';

@Controller()
export class RootHandler {
    @Route({
        method: 'post',
        path: '/hello'
    })
    sayHello(req, res) {
        res.status(200).send('Hello, ' + req.body.name);
    }
}

```


## Decorator Properties
------
| Property | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| `path`   | The child path to which the route will apply. Default: '/'            |
| `method` | The HTTP-compliant method that the route will utilize. Default: 'get' |
