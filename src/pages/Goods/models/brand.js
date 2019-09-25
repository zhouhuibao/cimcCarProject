import { message } from 'antd';
import {
  queryGoodsBrand,
  addGoodsBrand,
  updateGoodsBrand,
  deleteGoodsBrand,
} from '@/services/goods';

export default {
  namespace: 'brandModel',
  state: {
    GoodsBrandList: [],
    addStatus: false,
    delStatus: false,
    editStatus: false,
  },
  effects: {
    *queryGoodsBrand({ payload }, { call, put }) {
      const response = yield call(queryGoodsBrand, payload);

      if (response.success) {
        yield put({
          type: 'GoodsBrandList',
          payload: response.data,
        });
      } else {
        message.warning(response.message);
      }
    },
    *addGoodsBrand({ payload }, { call, put }) {
      const response = yield call(addGoodsBrand, payload);
      if (response.success) {
        message.success('新增品牌成功');
        yield put({
          type: 'add_GoodsBrand',
          payload: response.success,
        });
      } else {
        message.warning(response.message);
      }
    },
    *updateGoodsBrand({ payload }, { call, put }) {
      const response = yield call(updateGoodsBrand, payload);
      if (response.success) {
        message.success('品牌更新成功');
        yield put({
          type: 'edit_GoodsBrand',
          payload: response.success,
        });
      } else {
        message.warning(response.message);
      }
    },
    *deleteGoodsBrand({ payload }, { call, put }) {
      const response = yield call(deleteGoodsBrand, payload);
      if (response.success) {
        yield put({
          type: 'del_GoodsBrand',
          payload: response.success,
        });
      } else {
        message.warning(response.message);
      }
    },
  },
  reducers: {
    GoodsBrandList(state, { payload }) {
      return {
        ...state,
        GoodsBrandList: payload,
      };
    },
    add_GoodsBrand(state, { payload }) {
      return {
        ...state,
        addStatus: payload,
      };
    },
    edit_GoodsBrand(state, { payload }) {
      return {
        ...state,
        editStatus: payload,
      };
    },
    del_GoodsBrand(state, { payload }) {
      return {
        ...state,
        delStatus: payload,
      };
    },
  },
};
