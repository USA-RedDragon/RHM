const auth = require('./auth');
const healthcheck = require('./healthcheck');

module.exports = [].concat(auth, healthcheck);