const bus = require('@controller/bus');

module.exports = function (fastify, opts, done) {
  fastify.get('/bus', bus.getStatus);

  fastify.get('/bus/:line', bus.getLineStatus);

  fastify.post('/bushook', bus.hook);

  done();
};
