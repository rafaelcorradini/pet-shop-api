const config = {
    secret: "secretteste",
    debug: true,
    permissions: {
        admin: {
            get: ['/api/users/:param', '/api/users'],
            post: ['/api/users'],
            delete: ['/api/users/:param'],
            put: ['/api/users/:param']
        },
        client: {
            delete: ['/api/users/:param'],
            post: ['/api/users/:param']
        }
    }
};

module.exports = config;