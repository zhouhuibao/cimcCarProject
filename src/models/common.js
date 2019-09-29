import { queryPicture } from '@/services/goods';
import { getCityjson } from '@/services/user';

export default {
  namespace: 'common',
  state: {
    test: '123',
  },
  effects: {
    *queryPicture({ payload, callBack }, { call }) {
      const response = yield call(queryPicture, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *getCityjson({ payload, callBack }, { call }) {
      const response = yield call(getCityjson, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
