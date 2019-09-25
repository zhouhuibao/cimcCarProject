import { addGoodsCategory, editGoodsCategory, delGoodsCategory } from '@/services/goods';

export default {
  namespace: 'categoryModel',
  state: {
    GoodsBrandList: [],
  },
  effects: {
    *addGoodsCategory({ payload, callBack }, { call }) {
      const response = yield call(addGoodsCategory, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *editGoodsCategory({ payload, callBack }, { call }) {
      const response = yield call(editGoodsCategory, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *delGoodsCategory({ payload, callBack }, { call }) {
      const response = yield call(delGoodsCategory, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
