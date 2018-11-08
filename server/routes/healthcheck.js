'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/healthcheck',
        handler: async (request, h) => {
            return h.response().code(200);
        },
        options: {
            auth: false
        }
    }
];