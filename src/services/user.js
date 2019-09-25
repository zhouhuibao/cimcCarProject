import { stringify } from 'qs';
import request from '@/utils/request';
import { pathRoot } from '../../configPath';
// 查看我的任务
export async function queryMyExecuteTask(params) {
  return request(`/project/costSubject/getCostSubjectByParentCode?${stringify(params)}`);
}

export async function queryGoodsBrand(params) {
  return request(`${pathRoot}/gcgj_goods/goodsBrand/queryGoodsBrand`, {
    method: 'POST',
    body: params,
  });
}
