# Bootstrap
The bootstrap method is the entry point to your application. It injects your routes, services, and middlewares, and serves them out to the web.

This works the exact same way as it would in Angular: you simply pass in your app's root module, and bootstrap will handle the rest.

```typescript
import { bootstrap } from '@orbital/core';
import { AppModule } from './app.module';

bootstrap(AppModule);
```