// import request from '@/utils/request';
// export async function query() {
//   return request('/api/users');
// }
// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// export async function queryNotices() {
//   return request('/api/notices');
// }


import {stringify} from 'qs';
import request from '@/utils/request';
// import {pathRoot} from '../../configPath';
// 查看我的任务
export async function queryMyExecuteTask(params) {
  // return request(pathRoot + `/oa/task/queryMyExecuteTask?${stringify(params)}`);
  return request(`/project/costSubject/getCostSubjectByParentCode?${stringify(params)}`);
  
}