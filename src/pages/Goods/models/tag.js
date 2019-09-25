import {
  queryeGoodsLabel,
  addGoodsLabel,
  updateGoodsLabel,
  deleteGoodsLabel,
} from '@/services/goods';

export default {
  namespace: 'tagModel',
  state: {},
  effects: {
    *queryeGoodsLabel({ payload, callBack }, { call }) {
      const response = yield call(queryeGoodsLabel, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *addGoodsLabel({ payload, callBack }, { call }) {
      const response = yield call(addGoodsLabel, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateGoodsLabel({ payload, callBack }, { call }) {
      const response = yield call(updateGoodsLabel, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *deleteGoodsLabel({ payload, callBack }, { call }) {
      const response = yield call(deleteGoodsLabel, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
