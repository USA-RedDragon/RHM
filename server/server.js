const Hapi = require('hapi');

const server = Hapi.server({
    port: process.env.PORT || 3001,
    host: '0.0.0.0',
    debug: {
        request: ['error']
    },
    routes: {cors: true}
});

const init = async () => {

    await server.register([
        {
            plugin: require('hapi-sequelizejs'),
            options: [
                {
                    name: 'database',
                    models: ['./models/*.js'],
                    sequelize: require('./config/sequelize'),
                    sync: true,
                    forceSync: false
                }
            ]
        }
    ])

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response']
        }
    });

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', require('./config/auth'));
    server.auth.default('jwt');

    const routes = require('./routes');
    server.route(routes);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();