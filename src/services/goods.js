import { stringify } from 'qs';
import request from '@/utils/request';
import { pathRoot, projectName, projectNameSystem } from '../../configPath';

// 查看商品品牌列表
export async function queryGoodsBrand(params) {
  return request(`${pathRoot}${projectName}/pc-goodsBrand/queryGoodsBrand`, {
    method: 'POST',
    body: params,
  });
}

// 查看商品品牌列表(不分页)
export async function selectGoodsBrand(params) {
  return request(`${pathRoot}${projectName}/pc-goodsBrand/selectGoodsBrand`, {
    method: 'POST',
    body: params,
  });
}

// 添加商品
export async function addGoodsSpu(params) {
  return request(`${pathRoot}${projectName}/pc-goodsSpu/addGoodsSpu`, {
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

// 主目录查询关联参数
export async function queryCategoryParam(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/queryCategoryParam`, {
    method: 'POST',
    body: params,
  });
}

// 主目录查询关联规格
export async function queryCategorySpecs(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/queryCategorySpecs`, {
    method: 'POST',
    body: params,
  });
}

// 主目录添加或修改关联参数
export async function updateCategoryParam(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/updateCategoryParam`, {
    method: 'POST',
    body: params,
  });
}

// 主目录添加或修改关联规格
export async function updateCategorySpecs(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/updateCategorySpecs`, {
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

// 规格失效或恢复
export async function updateOrDeleteGoodsSpecs(params) {
  return request(`${pathRoot}${projectName}/pc-goodsSpecs/updateOrDeleteGoodsSpecs`, {
    method: 'POST',
    body: params,
  });
}

// 查询目录不分页
export async function selectGoodsCategory(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/selectGoodsCategory`, {
    method: 'POST',
    body: params,
  });
}

// 查询分类不分页
export async function selectGoodsClassify(params) {
  return request(`${pathRoot}${projectName}/pc-goodsGoodsClassify/selectGoodsClassify`, {
    method: 'POST',
    body: params,
  });
}

// 根据主目录id查询参数
export async function goodsCategoryIdSelectParam(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/goodsCategoryIdSelectParam`, {
    method: 'POST',
    body: params,
  });
}

// 根据主目录id查询规格
export async function goodsCategoryIdSelect(params) {
  return request(`${pathRoot}${projectName}/pc-goodsCategory/goodsCategoryIdSelect`, {
    method: 'POST',
    body: params,
  });
}

// 查询商品参数
export async function queryGoodsParam(params) {
  return request(`${pathRoot}${projectName}/pc-goodsParam/queryGoodsParam`, {
    method: 'POST',
    body: params,
  });
}

// 添加商品参数
export async function addGoodsParam(params) {
  return request(`${pathRoot}${projectName}/pc-goodsParam/addGoodsParam`, {
    method: 'POST',
    body: params,
  });
}

// 修改商品参数
export async function updateGoodsParam(params) {
  return request(`${pathRoot}${projectName}/pc-goodsParam/updateGoodsParam`, {
    method: 'POST',
    body: params,
  });
}

// 修改商品失效与有效状态
export async function updateGoodsParamStatus(params) {
  return request(`${pathRoot}${projectName}/pc-goodsParam/updateGoodsParamStatus`, {
    method: 'POST',
    body: params,
  });
}
