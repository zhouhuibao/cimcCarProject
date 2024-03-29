import {
  queryGoodsSpecs,
  addGoodsSpecs,
  updateGoodsSpecs,
  updateOrDeleteGoodsSpecs,
} from '@/services/goods';

export default {
  namespace: 'specificationsModel',
  state: {},
  effects: {
    *queryGoodsSpecs({ payload, callBack }, { call }) {
      const response = yield call(queryGoodsSpecs, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *addGoodsSpecs({ payload, callBack }, { call }) {
      const response = yield call(addGoodsSpecs, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateGoodsSpecs({ payload, callBack }, { call }) {
      const response = yield call(updateGoodsSpecs, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateOrDeleteGoodsSpecs({ payload, callBack }, { call }) {
      const response = yield call(updateOrDeleteGoodsSpecs, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
