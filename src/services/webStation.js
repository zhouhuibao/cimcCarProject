// import { stringify } from 'qs';
import request from '@/utils/request';
import { pathRoot, projectName, projectNameSystem } from '../../configPath';

// 查询服务站列表
export async function getStationList(params) {
  return request(`${pathRoot}${projectName}/web-station/getStationList`, {
    method: 'POST',
    body: params,
  });
}

// 添加服务站
export async function addStation(params) {
  return request(`${pathRoot}${projectName}/web-station/addStation`, {
    method: 'POST',
    body: params,
  });
}

// 查询区域
export async function getRegionJoin(params) {
  return request(`${pathRoot}${projectName}/web-region/getRegionJoin`, {
    method: 'POST',
    body: params,
  });
}
