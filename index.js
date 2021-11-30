import 'module-alias/register.js';
import fs from 'fs';
import path from 'path';
import Fastify from 'fastify';
import bus from '@service/bus';

const fastify = Fastify({
  https: {
    key: fs.readFileSync(path.join(__dirname, '../test/https/fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '../test/https/fastify.cert')),
  },
  logger: true,
});

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.get('/bus/6', async (request, reply) => {
  const res = await bus.getStatus();
  reply.send(res);
});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
