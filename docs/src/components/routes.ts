export const ROUTES = [
    {
        package: 'Core',
        urlSegment: 'core',
        groups: {
            functions: ['bootstrap'],
            decorators: ['Module', 'Orbital', 'Injectable', 'Middleware', 'Route']
        }
    },
    {
        package: 'Mongo',
        urlSegment: 'mongo',
        groups: {
            providers: ['Mongo'],
            modules: ['MongoModule']
        }
    }
]