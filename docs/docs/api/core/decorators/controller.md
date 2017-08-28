# Controller

<type-card type="decorator"></type-card>

Controllers are where the magic happens. They contain all of the routes and logic for your API. They work with dependency injection, meaning you can write reusable code in one service, and import it into your controller.

All you have to do to register the controller is to add it to your `controllers` array of your module. NOTE: controllers respect the `path` property of the module configuration, and concatenates all the path properties of parent modules.

```ts
import { Controller, Request, Response, Route } from '@orbital/core';

@Controller({
    path: '/hello'
})
export class HelloController {

    @Route({
        path: '/hello/:name',
        method: 'get'
    })
    sayHello(req: Request, res: Response) {
        const name = req.params.name || 'world';
        res.status(200).json({greeting: `Hello, ${name}!`})
    }
    
}
```

## Decorator Properties
------
| Property | Description                                      |
| -------- | -------------------------------------------------- |
| `path`   | The parent path for all the routes contained in the controller. Default: `/` |