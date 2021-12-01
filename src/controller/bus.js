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
  request.log.info(request);
  return { hello: 'rainkolwa' };
};

module.exports = {
  getStatus,
  getLineStatus,
  hook,
};
