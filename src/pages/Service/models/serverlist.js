import { getStationList, addStation } from '@/services/webStation';

export default {
  namespace: 'serverListModel',
  state: {},
  effects: {
    *getStationList({ payload, callBack }, { call }) {
      const response = yield call(getStationList, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *addStation({ payload, callBack }, { call }) {
      const response = yield call(addStation, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
