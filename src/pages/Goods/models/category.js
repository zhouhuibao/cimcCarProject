import { addGoodsClassify, queryGoodsClassify, updateGoodsClassify } from '@/services/goods';

export default {
  namespace: 'categoryModel',
  state: {
    GoodsBrandList: [],
  },
  effects: {
    *addGoodsClassify({ payload, callBack }, { call }) {
      const response = yield call(addGoodsClassify, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *queryGoodsClassify({ payload, callBack }, { call }) {
      const response = yield call(queryGoodsClassify, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateGoodsClassify({ payload, callBack }, { call }) {
      const response = yield call(updateGoodsClassify, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
