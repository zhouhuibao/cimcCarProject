/*eslint-disable*/
// import {
//     getProjectBorrowingList,
//     borrowingReport,
//     borrowingSend,
//     borrowingBack,
//     borrowingWithdraw,
//     borrowingRead,
//     getProjectBorrowingByUserId,
//     queryInvoiceListByBizId
// } from '@/services/projectServers';
import {message} from 'antd';

import {
  queryMyExecuteTask,
} from '@/services/user';
export default {
    namespace: 'testModel',
    state: {
      borrowingPage: {},
      borrowingDetail: {},
      operationFlag: '',
      testList:[1,2,3]
    },
    effects: {
      *queryMyExecuteTask({payload, callBack}, {call, put}) {
        const response = yield call(queryMyExecuteTask, payload);
        if (callBack) callBack(response)
      },
   
    },
    reducers: {
      saveBorrowingList(state, {payload}){
        return {
          ...state,
          borrowingPage: payload,
        }
      },
    },
  };
  
  