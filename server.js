require('module-alias/register');
const Fastify = require('fastify');

const fastify = Fastify({
  // https: {
  //   key: fs.readFileSync(path.join(__dirname, '../test/https/fastify.key')),
  //   cert: fs.readFileSync(path.join(__dirname, '../test/https/fastify.cert')),
  // },
  logger: true,
});

fastify.register(require('@routes/bus'), {});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
