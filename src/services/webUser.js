import { stringify } from 'qs';
import request from '@/utils/request';
import { pathRoot, projectName } from '../../configPath';

// 查看我的任务
export async function queryMyExecuteTask(params) {
  return request(`/project/costSubject/getCostSubjectByParentCode?${stringify(params)}`);
}

// 添加用户
export async function addUser(params) {
  return request(`${pathRoot}${projectName}/web-user/addUser`, {
    method: 'POST',
    body: params,
  });
}

// 修改用户
export async function updateUser(params) {
  return request(`${pathRoot}${projectName}/web-user/updateUser`, {
    method: 'POST',
    body: params,
  });
}

// 删除用户
export async function deleteUser(params) {
  return request(`${pathRoot}${projectName}/web-user/deleteUser`, {
    method: 'POST',
    body: params,
  });
}

// 用户列表
export async function getUserList(params) {
  return request(`${pathRoot}${projectName}/web-user/getUserList`, {
    method: 'POST',
    body: params,
  });
}

// 根据id获取用户
export async function getUserById(params) {
  return request(`${pathRoot}${projectName}/web-user/getUserById`, {
    method: 'POST',
    body: params,
  });
}

// 登录
export async function login(params) {
  return request(`${pathRoot}${projectName}/web-user/loginAdmin`, {
    method: 'POST',
    body: params,
    noToken: true,
  });
}

// 验证码
export async function sendCheckCode(params) {
  return request(`${pathRoot}${projectName}/web-user/sendCheckCode`, {
    method: 'POST',
    body: params,
    noToken: true,
  });
}
