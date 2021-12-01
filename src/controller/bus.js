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
  request.log.info('received hook');
  request.log.info(request.body);
  const { token } = request.params;
  // validate token
  const {
    message: { entities, text, chat },
  } = request.body;
  if (entities[0]?.type === 'bot_command') {
    // bot command
    if (token !== process.env.ROBOT_TOKEN) {
      return { code: -1, message: 'invalid token' };
    }
    service.handleBotCommand(text, chat.id);
  }
  return { code: 0 };
};

module.exports = {
  getStatus,
  getLineStatus,
  hook,
};
