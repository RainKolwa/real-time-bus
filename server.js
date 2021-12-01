require('module-alias/register');
require('dotenv').config();
const Fastify = require('fastify');

const fastify = Fastify({
  logger: true,
});

fastify.register(require('@routes/bus'), {});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
