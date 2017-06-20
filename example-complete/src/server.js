const hapi = require('hapi');
const inert = require('inert');
const server = new hapi.Server();

const router = require('./router');

server.connection({
  port: process.env.PORT || 4000,
});

server.register([inert], err => {
  if (err) throw err;

  server.route(router);
});

module.exports = server;
