const config = {
    secret: "secretteste",
    debug: true,
    permissions: {
        admin: {
            get: '*',
            post: '*',
            delete: '*',
            put: '*'
        },
        client: {
            post: [
                '/api/login',
                '/api/register',
                '/api/schedules',
                '/api/animals',
                '/api/orders'
            ],
            get: '*',
            put: [
                '/api/users/:param',
                '/api/schedules/:param',
                '/api/animals/:param',
                '/api/orders/:param'
            ],
            delete: [
                '/api/users/:param',
                '/api/schedules/:param',
                '/api/animals/:param',
                '/api/orders/:param'
            ]
        }
    }
};

module.exports = config;