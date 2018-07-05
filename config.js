const config = {
    secret: "secretteste",
    debug: true,
    permissions: {
        admin: {
            get: ['/api/users/:param', '/api/users', '/api/products'],
            post: ['/api/users', '/api/products'],
            delete: ['/api/users/:param'],
            put: ['/api/users/:param']
        },
        client: {
            post: ['/api/users/:param'],
            get: ['/api/products'],
        }
    }
};

module.exports = config;