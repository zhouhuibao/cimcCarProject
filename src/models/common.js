import { queryPicture, fileDownload } from '@/services/goods';
import { getCityjson } from '@/services/user';

export default {
  namespace: 'common',
  state: {
    test: '123',
    // defaultImage:null
  },
  effects: {
    *queryPicture({ payload, callBack }, { call }) {
      const response = yield call(queryPicture, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *fileDownload({ payload, callBack }, { call }) {
      const response = yield call(fileDownload, payload);
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
  reducers: {
    // setDefaultImg(state, {payload}) {
    //   return {
    //     ...state,
    //     defaultImage: payload
    //   }
    // },
  },
};
