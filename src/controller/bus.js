const service = require('@service/bus');

const getStatus = async (request, reply) => {
  const res = await service.getStatus();
  return res;
};

const getLineStatus = async (request, reply) => {
  const res = await service.getLineStatus(request.params.line);
  return res;
};

const hook = async (request) => {
  request.log.info(request.body);
  const { token } = request.params;
  const {
    message: { entities, text, chat },
  } = request.body;
  if (entities && entities[0] && entities[0].type === 'bot_command') {
    // validate token
    if (token !== process.env.ROBOT_TOKEN) {
      return { code: -1, message: 'Invalid Token' };
    }
    service.handleBotCommand(text, chat.id);
  }
  return { code: 0, message: 'Success' };
};

module.exports = {
  getStatus,
  getLineStatus,
  hook,
};
