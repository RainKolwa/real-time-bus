const service = require('@service/bus');

const getStatus = async (request, reply) => {
  const res = await service.getStatus();
  return res;
};

const getLineStatus = async (request, reply) => {
  const res = await service.getLineStatus(request.params.line);
  return res;
};

const hook = async (request, reply) => {
  //
  request.log.info('received hook');
  request.log.info(request.body);
  request.log.info(JSON.stringify(request.params));
  request.log.info(JSON.stringify(request.query));
  request.log.info(JSON.stringify(request.body));
  const { token } = request.params;
  // validate token

  return { hello: 'rainkolwa', requestBody: request.body };
};

module.exports = {
  getStatus,
  getLineStatus,
  hook,
};
