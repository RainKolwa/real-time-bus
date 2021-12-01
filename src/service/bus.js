const api = require('@lib/api');
const bot = require('@lib/bot');

const { bus } = api;

/**
 * 全部班次
 * @returns []
 */
const getStatus = () =>
  bus.get('BusH5New/BusStatus').then((res) => res.data || []);

/**
 * 获取指定线路班次
 * @param {string} line 6/11/8
 * @returns
 */
const getLineStatus = (line) => {
  return getStatus()
    .then((records) => {
      if (line) {
        const result = records.filter(
          ({ endName }) => endName.indexOf(`${line}号线`) > -1
        );
        return result;
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

const handleBotCommand = (text, chatId) => {
  switch (text) {
    case '/bus':
      bot.sendMsg('hohohohaha', chatId);
      break;
    case '/bus/11':
      getLineStatus(11).then((result) => {
        if (result && result.length > 0) {
          let routes = result.map(
            ({ recentBusTimes, numberCar }) =>
              `车牌：${numberCar}, 发车时间：${recentBusTimes}`
          );
          bot.sendMsg(routes.join('\n'), chatId);
        } else {
          bot.sendMsg('没有查到信息', chatId);
        }
      });
      break;
  }
};

module.exports = {
  getStatus,
  getLineStatus,
  handleBotCommand,
};
