import { GraphQLDirective, GraphQLNamedType, GraphQLObjectType, SchemaDefinitionNode } from 'graphql';

export type GraphQLSchemaConfig = {
    query: GraphQLObjectType;
    mutation?: GraphQLObjectType;
    subscription?: GraphQLObjectType;
    types?: Array<GraphQLNamedType>;
    directives?: Array<GraphQLDirective>;
    astNode?: SchemaDefinitionNode;
};