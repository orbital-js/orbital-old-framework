import * as graphQLHTTP from 'express-graphql';
import * as request from 'request';

import {
    ExecutionResult,
    GraphQLEnumType,
    GraphQLEnumTypeConfig,
    GraphQLInputObjectType,
    GraphQLInputObjectTypeConfig,
    GraphQLInterfaceType,
    GraphQLInterfaceTypeConfig,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
    GraphQLSchema,
    GraphQLType,
    GraphQLUnionType,
    GraphQLUnionTypeConfig,
    graphql
} from 'graphql';

import { GraphQLSchemaConfig } from './graphql-config';
import { Injectable } from '@orbital/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class GraphQL {
    constructor() { }

    useSchema(options: graphQLHTTP.Options) {
        return graphQLHTTP(options);
    }

    async query(schema: GraphQLSchema, query: string) {
        return await graphql(schema, query);
    }

    createSchema(schema: GraphQLSchemaConfig): GraphQLSchema {
        return new GraphQLSchema(schema);
    }

    createScalar(conf: GraphQLScalarTypeConfig<any, any>) {
        return new GraphQLScalarType(conf);
    }

    createObject(conf: GraphQLObjectTypeConfig<any, any>) {
        return new GraphQLObjectType(conf);
    }

    createInterface(conf: GraphQLInterfaceTypeConfig<any, any>) {
        return new GraphQLInterfaceType(conf);
    }

    createUnion(conf: GraphQLUnionTypeConfig<any, any>) {
        return new GraphQLUnionType(conf);
    }

    createEnum(conf: GraphQLEnumTypeConfig) {
        return new GraphQLEnumType(conf);
    }

    createInputObject(conf: GraphQLInputObjectTypeConfig) {
        return new GraphQLInputObjectType(conf);
    }

    createList(conf: GraphQLType) {
        return new GraphQLList(conf);
    }

    createNonNull(conf: GraphQLType) {
        return new GraphQLNonNull(conf);
    }
}