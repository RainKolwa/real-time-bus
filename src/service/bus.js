import { bus } from '@lib/api';

const getStatus = bus.get('BusH5New/BusStatus');

export default {
  getStatus,
};
