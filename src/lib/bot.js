const axios = require('axios');

const token = process.env.ROBOT_TOKEN;
const baseURL = `https://api.telegram.org/bot${token}`;
const bot = axios.create({
  baseURL,
  timeout: 3000,
});

const pure = (text) => {
  return text.replace(/(\(|\)|-|\.)/gm, '\\$1');
};

const sendMsg = (text, chatId) => {
  bot
    .post(`/sendMessage`, {
      chat_id: chatId,
      text: pure(text),
      parse_mode: 'MarkdownV2',
    })
    .then((res) => console.log(res.data))
    .catch((err) => {
      if (err.response.status >= 400) {
        throw new Error(err.response.data.description);
      } else {
        throw err;
      }
    });
};

module.exports = {
  sendMsg,
};
