# MongoModule

<type-card type="module"></type-card>

The MongoModule automatically injects the MongoDB provider into your app. Using the MongoModule has the advantage of automatically parsing your connection string, and injecting it into the Mongo provider for cleaner, more concise code.

```ts
import { Module } from '@orbital/core';
import { MongoModule } from '@orbital/mongo';

@Module({
    imports: [
        ...
        MongoModule.forRoot({
            url: 'mongodb://user:pass@database.com:54364/db',
            options: {/* optional config */}
        })
        ...
    ]
})
```

## Decorator Properties
------
| Property  | Description                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `url`     | **required** MongoDB connection string.                                                                              |
| `options` | [Standard MongoClient options](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html#connect) |