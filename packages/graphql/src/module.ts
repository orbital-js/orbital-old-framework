import 'reflect-metadata';

import { GraphQL } from './graphql';
import { Module } from '@orbital/core';

@Module({
    providers: [GraphQL]
})
export class GraphQLModule {}