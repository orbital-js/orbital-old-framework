# Module

<type-card type="decorator"></type-card>

The `@Module()` decorator functions similarly to an Angular `NgModule`. It is a centralized place to deposit your routes, providers, and middlewares. You can then import that module into another module, or you can use [bootstrap()](/docs/core/methods/bootstrap) it and serve the module as an entry point to the application.

```ts
import { Module } from '@orbital/core';
...

@Module({
    imports: [HttpModule],
    orbitals: [MainRoute],
    providers: [DatabaseService],
    middlewares: [BodyParserJson]
})
export class AppModule { }
```

## Decorator Properties
------
| Property      | Description                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `imports`     | Allows you to import other modules into your app, and use their providers, orbitals, or middlewares.     |
| `orbitals`    | Injects routes for your application decorated with `@Orbital()`.                                         |
| `providers`   | Injects providers/services decorated with `@Injectable()`, similarly to Angular.                         |
| `middlewares` | Injects middleware classes into `app.use()` from express.                                                |
| `config`      | Global app configuration properties                                                                      |
| `config.path` | Root path of the module. This is useful for splitting your app into submodules by feature. Default `'/'` |
| `config.port` | Assign a port off of which to run your app. Default `process.env.PORT  ‖ 8080`                           |