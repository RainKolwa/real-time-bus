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
          ({ name }) => name.indexOf(`${line}`) > -1
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
  if (/^\/bus/.test(text)) {
    // bus command
    let lineNo = text.slice(4);
    if (!lineNo || ['6', '8', '11'].indexOf(lineNo) === -1) {
      bot.sendMessage('没有查到班车信息，只有6、8、11号线', chatId)
      return;
    }
    getLineStatus(lineNo).then((result) => {
      if (result && result.length > 0) {
        let routes = result.map(
          ({ recentBusTimes, numberCar }) =>
            `车牌：${numberCar}, 发车时间：${recentBusTimes}`
        );
        let name = result[0].name;
        bot.sendMsg(`*${name}*\n` + routes.join('\n'), chatId);
      } else {
        bot.sendMsg('没有查到信息', chatId);
      }
    });
  }
};

module.exports = {
  getStatus,
  getLineStatus,
  handleBotCommand,
};
