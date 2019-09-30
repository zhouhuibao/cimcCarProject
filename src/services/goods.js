import { stringify } from 'qs';
import request from '@/utils/request';
import { pathRoot, projectName, projectNameSystem } from '../../configPath';
// // 查看我的任务
export async function queryMyExecuteTask(params) {
  return request(`/project/costSubject/getCostSubjectByParentCode?${stringify(params)}`);
}

// 查看商品品牌列表
export async function queryGoodsBrand(params) {
  return request(`${pathRoot}${projectName}/pc-goodsBrand/queryGoodsBrand`, {
    method: 'POST',
    body: params,
  });
}

// 添加商品品牌
export async function addGoodsBrand(params) {
  return request(`${pathRoot}${projectName}/pc-goodsBrand/addGoodsBrand`, {
    method: 'POST',
    body: params,
  });
}

// 修改商品品牌
export async function updateGoodsBrand(params) {
  return request(`${pathRoot}${projectName}/pc-goodsBrand/updateGoodsBrand`, {
    method: 'POST',
    body: params,
  });
}

// 删除商品品牌
export async function deleteGoodsBrand(params) {
  return request(`${pathRoot}${projectName}/pc-goodsBrand/deleteGoodsBrand`, {
    method: 'POST',
    body: params,
  });
}

// 上传文件
export async function fileUpload(params) {
  return request(`${pathRoot}${projectName}/pc-picture/fileUpload`, {
    method: 'POST',
    body: params,
  });
}

// 查询上传图片
export async function queryPicture(params) {
  return request(`${pathRoot}${projectName}/pc-picture/queryPicture`, {
    method: 'POST',
    body: params,
  });
}

// 下载图片
export async function fileDownload(params) {
  return request(`${pathRoot}${projectNameSystem}/file/fileDownload?${stringify(params)}`);
}

// 查询目录
export async function queryGoodsCategory(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/queryGoodsCategory`, {
    method: 'POST',
    body: params,
  });
}

// 添加目录
export async function addGoodsCategory(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/addGoodsCategory`, {
    method: 'POST',
    body: params,
  });
}

// 修改目录
export async function updateGoodsCategory(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/updateGoodsCategory`, {
    method: 'POST',
    body: params,
  });
}

// 删除目录
export async function deleteGoodsCategory(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/deleteGoodsCategory`, {
    method: 'POST',
    body: params,
  });
}

// 新增分类
export async function addGoodsClassify(params) {
  return request(`${pathRoot}${projectName}/pc-goodsGoodsClassify/addGoodsClassify`, {
    method: 'POST',
    body: params,
  });
}

// 查看分类
export async function queryGoodsClassify(params) {
  return request(`${pathRoot}${projectName}/pc-goodsGoodsClassify/queryGoodsClassify`, {
    method: 'POST',
    body: params,
  });
}

// 修改分类
export async function updateGoodsClassify(params) {
  return request(`${pathRoot}${projectName}/pc-goodsGoodsClassify/updateGoodsClassify`, {
    method: 'POST',
    body: params,
  });
}

// 添加标签
export async function addGoodsLabel(params) {
  return request(`${pathRoot}${projectName}/pc-goodsLabel/addGoodsLabel`, {
    method: 'POST',
    body: params,
  });
}

// 查询标签
export async function queryeGoodsLabel(params) {
  return request(`${pathRoot}${projectName}/pc-goodsLabel/queryGoodsLabel`, {
    method: 'POST',
    body: params,
  });
}

// 修改标签
export async function updateGoodsLabel(params) {
  return request(`${pathRoot}${projectName}/pc-goodsLabel/updateGoodsLabel`, {
    method: 'POST',
    body: params,
  });
}

// 删除标签
export async function deleteGoodsLabel(params) {
  return request(`${pathRoot}${projectName}/pc-goodsLabel/deleteGoodsLabel`, {
    method: 'POST',
    body: params,
  });
}

// 查询规格
export async function queryGoodsSpecs(params) {
  return request(`${pathRoot}${projectName}/pc-goodsSpecs/queryGoodsSpecs`, {
    method: 'POST',
    body: params,
  });
}

// 添加规格
export async function addGoodsSpecs(params) {
  return request(`${pathRoot}${projectName}/pc-goodsSpecs/addGoodsSpecs`, {
    method: 'POST',
    body: params,
  });
}

// 修改规格
export async function updateGoodsSpecs(params) {
  return request(`${pathRoot}${projectName}/pc-goodsSpecs/updateGoodsSpecs`, {
    method: 'POST',
    body: params,
  });
}
