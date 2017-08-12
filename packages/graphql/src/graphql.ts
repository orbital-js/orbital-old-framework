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

    useSchema(options: graphQLHTTP.Options): graphQLHTTP.Middleware {
        return graphQLHTTP(options);
    }

    async query(schema: GraphQLSchema, query: string): Promise<ExecutionResult> {
        return await graphql(schema, query);
    }

    createSchema(schema: GraphQLSchemaConfig): GraphQLSchema {
        return new GraphQLSchema(schema);
    }

    createScalar(conf: GraphQLScalarTypeConfig<any, any>): GraphQLScalarType {
        return new GraphQLScalarType(conf);
    }

    createObject(conf: GraphQLObjectTypeConfig<any, any>): GraphQLObjectType {
        return new GraphQLObjectType(conf);
    }

    createInterface(conf: GraphQLInterfaceTypeConfig<any, any>): GraphQLInterfaceType {
        return new GraphQLInterfaceType(conf);
    }

    createUnion(conf: GraphQLUnionTypeConfig<any, any>): GraphQLUnionType {
        return new GraphQLUnionType(conf);
    }

    createEnum(conf: GraphQLEnumTypeConfig): GraphQLEnumType {
        return new GraphQLEnumType(conf);
    }

    createInputObject(conf: GraphQLInputObjectTypeConfig): GraphQLInputObjectType {
        return new GraphQLInputObjectType(conf);
    }

    createList(conf: GraphQLType): GraphQLList<any> {
        return new GraphQLList(conf);
    }

    createNonNull(conf: GraphQLType): GraphQLNonNull<any> {
        return new GraphQLNonNull(conf);
    }
}