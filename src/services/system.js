import { stringify } from 'qs';
import request from '@/utils/request';
import { pathRoot } from '../../configPath';
// // 查看我的任务
export async function queryMyExecuteTask(params) {
  return request(`/project/costSubject/getCostSubjectByParentCode?${stringify(params)}`);
}

// 添加用户
// export async function addUser(params) {
//     return request(`${pathRoot}/gcgj/pc-goodsBrand/queryGoodsBrand`, {
//       method: 'POST',
//       body: params,
//     });
// }
