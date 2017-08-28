export const ROUTES = [
    {
        package: 'Core',
        urlSegment: 'core',
        groups: {
            functions: ['bootstrap'],
            decorators: ['Controller', 'Injectable', 'Middleware', 'Module', 'Route']
        }
    },
    {
        package: 'GraphQL',
        urlSegment: 'graphql',
        groups: {
            modules: ['GraphQLModule'],
            providers: ['GraphQL'],
        }
    },
    {
        package: 'HTTP',
        urlSegment: 'http',
        groups: {
            interfaces: ['HttpOptions'],
            modules: ['HttpModule'],
            providers: ['Http'],
        }
    },
    {
        package: 'Middlewares',
        urlSegment: 'middlewares',
        groups: {
            middlewares: ['BodyParser', 'Compression', 'CORS', 'Helmet']
        }
    },
    {
        package: 'Mongo',
        urlSegment: 'mongo',
        groups: {
            modules: ['MongoModule'],
            providers: ['Mongo'],
        }
    }
]