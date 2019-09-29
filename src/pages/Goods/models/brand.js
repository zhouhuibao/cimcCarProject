import {
  queryGoodsBrand,
  addGoodsBrand,
  updateGoodsBrand,
  deleteGoodsBrand,
} from '@/services/goods';

export default {
  namespace: 'brandModel',
  state: {},
  effects: {
    *queryGoodsBrand({ payload, callBack }, { call }) {
      const response = yield call(queryGoodsBrand, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *addGoodsBrand({ payload, callBack }, { call }) {
      const response = yield call(addGoodsBrand, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateGoodsBrand({ payload, callBack }, { call }) {
      const response = yield call(updateGoodsBrand, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *deleteGoodsBrand({ payload, callBack }, { call }) {
      const response = yield call(deleteGoodsBrand, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
