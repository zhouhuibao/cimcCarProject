import {
  queryGoodsParam,
  addGoodsParam,
  updateGoodsParam,
  updateGoodsParamStatus,
} from '@/services/goods';

export default {
  namespace: 'goodsDataModel',
  state: {
    type: 0,
  },
  effects: {
    *queryGoodsParam({ payload, callBack }, { call }) {
      const response = yield call(queryGoodsParam, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *addGoodsParam({ payload, callBack }, { call }) {
      const response = yield call(addGoodsParam, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateGoodsParam({ payload, callBack }, { call }) {
      const response = yield call(updateGoodsParam, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateGoodsParamStatus({ payload, callBack }, { call }) {
      const response = yield call(updateGoodsParamStatus, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
