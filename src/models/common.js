import { queryPicture } from '@/services/goods';

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
  },
  reducers: {},
};
