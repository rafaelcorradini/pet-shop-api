const config = {
    secret: "secretteste",
    debug: true,
    permissions: {
        admin: {
            get: ['/api/users/:param', '/api/users'],
            post: ['/api/users'],
            delete: ['/api/users/:param'],
            put: ['/api/users/:param'],
            get: ['/api/products'],
            post: ['/api/products']
        },
        client: {
            delete: ['/api/users/:param'],
            post: ['/api/users/:param'],
            get: ['/api/products'],
        }
    }
};

module.exports = config;