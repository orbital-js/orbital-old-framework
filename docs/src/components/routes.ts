export const S = [
    {
        url: '/docs',
        component: 'docs-home'
    },
    /* CORE */
    {
        url: '/docs/core/methods/bootstrap',
        pages: ['core/methods/bootstrap/index.html'],
        type: 'method'
    }
]

export const ROUTES = [
    {
        package: 'Core',
        urlSegment: 'core',
        groups: {
            methods: ['bootstrap'],
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