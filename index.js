require('module-alias/register');
const fs = require('fs');
const path = require('path');
const Fastify = require('fastify');
const bus = require('@service/bus');

const fastify = Fastify({
  // https: {
  //   key: fs.readFileSync(path.join(__dirname, '../test/https/fastify.key')),
  //   cert: fs.readFileSync(path.join(__dirname, '../test/https/fastify.cert')),
  // },
  logger: true,
});

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.get('/bus', async (request, reply) => {
  const res = await bus.getStatus();
  reply.send(res);
});

fastify.get('/bus/:line', async (request, reply) => {
  const res = await bus.getLineStatus(request.params.line);
  reply.send(res);
});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
