const api = require('@lib/api');

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

module.exports = {
  getStatus,
  getLineStatus,
};
