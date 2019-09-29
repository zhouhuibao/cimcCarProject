import { addUser, updateUser, getUserList, getUserById, deleteUser } from '@/services/webUser';

export default {
  namespace: 'usermangmentModel',
  state: {},
  effects: {
    *addUser({ payload, callBack }, { call }) {
      const response = yield call(addUser, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *updateUser({ payload, callBack }, { call }) {
      const response = yield call(updateUser, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *getUserList({ payload, callBack }, { call }) {
      const response = yield call(getUserList, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *getUserById({ payload, callBack }, { call }) {
      const response = yield call(getUserById, payload);
      if (callBack) {
        callBack(response);
      }
    },
    *deleteUser({ payload, callBack }, { call }) {
      const response = yield call(deleteUser, payload);
      if (callBack) {
        callBack(response);
      }
    },
  },
  reducers: {},
};
