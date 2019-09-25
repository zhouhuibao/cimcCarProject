import {
  addGoodsCategory,
  updateGoodsCategory,
  deleteGoodsCategory,
  queryGoodsCategory,
} from '@/services/goods';

export default {
  namespace: 'mainCategoryModel',
  state: {},
  effects: {
    *addGoodsCategory({ payload, callBack }, { call }) {
      const response = yield call(addGoodsCategory, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateGoodsCategory({ payload, callBack }, { call }) {
      const response = yield call(updateGoodsCategory, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *deleteGoodsCategory({ payload, callBack }, { call }) {
      const response = yield call(deleteGoodsCategory, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *queryGoodsCategory({ payload, callBack }, { call }) {
      const response = yield call(queryGoodsCategory, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
