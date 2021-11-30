const axios = require('axios');

const bus = axios.create({
  baseURL: 'https://slsmartapi.step520.com/api/',
  timeout: 3000,
});

bus.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

module.exports = {
  bus,
};
