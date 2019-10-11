import {
  addGoodsCategory,
  updateGoodsCategory,
  deleteGoodsCategory,
  queryGoodsCategory,
  queryCategoryParam,
  queryCategorySpecs,
  updateCategoryParam,
  updateCategorySpecs,
} from '@/services/goods';

export default {
  namespace: 'mainCategoryModel',
  state: {},
  effects: {
    *queryCategoryParam({ payload, callBack }, { call }) {
      const response = yield call(queryCategoryParam, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *queryCategorySpecs({ payload, callBack }, { call }) {
      const response = yield call(queryCategorySpecs, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateCategoryParam({ payload, callBack }, { call }) {
      const response = yield call(updateCategoryParam, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateCategorySpecs({ payload, callBack }, { call }) {
      const response = yield call(updateCategorySpecs, payload);
      if (callBack) {
        callBack(response);
      }
    },
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
