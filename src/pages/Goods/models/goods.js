import {
  selectGoodsCategory,
  selectGoodsClassify,
  goodsCategoryIdSelectParam,
  goodsCategoryIdSelect,
  selectGoodsBrand,
} from '@/services/goods';
import { getRegionJoin } from '@/services/webStation';

export default {
  namespace: 'goodsModel',
  state: {
    type: 0,
  },
  effects: {
    *getRegionJoin({ payload, callBack }, { call }) {
      const response = yield call(getRegionJoin, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *selectGoodsCategory({ payload, callBack }, { call }) {
      const response = yield call(selectGoodsCategory, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *selectGoodsClassify({ payload, callBack }, { call }) {
      const response = yield call(selectGoodsClassify, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *goodsCategoryIdSelectParam({ payload, callBack }, { call }) {
      const response = yield call(goodsCategoryIdSelectParam, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *goodsCategoryIdSelect({ payload, callBack }, { call }) {
      const response = yield call(goodsCategoryIdSelect, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *selectGoodsBrand({ payload, callBack }, { call }) {
      const response = yield call(selectGoodsBrand, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
