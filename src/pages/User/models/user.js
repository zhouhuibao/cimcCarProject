import { login, sendCheckCode } from '@/services/webUser';

export default {
  namespace: 'userModel',
  state: {},
  effects: {
    *login({ payload, callBack }, { call }) {
      const response = yield call(login, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *sendCheckCode({ payload, callBack }, { call }) {
      const response = yield call(sendCheckCode, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
