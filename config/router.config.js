export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/forget-password', name: 'forgetPassword', component: './User/ForgetPassword' },
      {
        path: '/user/recover-password',
        name: 'recoverPassword',
        component: './User/RecoverPassword',
      },
      //   {path: '/user/register', name: 'register', component: './User/Register'},
      //   {path: '/user/new-password', name: 'setNewPassword', component: './User/SetNewPassword'},
      //   {
      //     path: '/user/register-result',
      //     name: 'register.result',
      //     component: './User/RegisterResult',
      //   },
      //   {
      //     component: '404',
      //   },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/test',
        name: 'testPage',
        icon: 'smile',
        component: './TestPage',
      },
      {
        path: '/goods',
        name: '商品',
        icon: 'smile',
        routes: [
          {
            path: '/goods/goods-kind',
            icon: 'smile',
            name: '实物类商品',
            routes: [
              {
                path: '/goods/goods-kind/goods-management',
                name: '商品管理',
                component: './Goods/GoodsInKind/GoodsManagement',
              },
              {
                path: '/goods/goods-kind/goods-brand',
                name: '商品品牌',
                component: './Goods/GoodsInKind/GoodsBrand',
              },
              {
                path: '/goods/goods-kind/goods-specifications',
                name: '商品规格',
                component: './Goods/GoodsInKind/GoodsSpecifications',
              },
              {
                path: '/goods/goods-kind/goods-data',
                name: '商品参数',
                component: './Goods/GoodsInKind/GoodsData',
              },
              {
                path: '/goods/goods-kind/goods-main-category',
                name: '商品主目录',
                component: './Goods/GoodsInKind/GoodsMainCategory',
              },
              {
                path: '/goods/goods-kind/goods-category',
                name: '商品分类',
                component: './Goods/GoodsInKind/GoodsCategory',
              },
              {
                path: '/goods/goods-kind/physical-upload',
                name: '实体商品导入',
                component: './Goods/GoodsInKind/Physicalupload',
              },
              {
                path: '/goods/goods-kind/goods-tags',
                name: '商品标签',
                component: './Goods/GoodsInKind/GoodsTags',
              },
            ],
          },
          {
            path: '/goods/goods-server',
            icon: 'smile',
            name: '服务类商品',
            routes: [
              {
                path: '/goods/goods-server/goods-management',
                name: '商品管理',
                component: './Goods/GoodsServer/GoodsManagement',
              },
            ],
          },
          {
            path: '/goods/material-management',
            name: '素材管理',
            component: './Goods/MaterialManagement',
          },
        ],
      },
      {
        name: '客户及商机管理',
        icon: 'smile',
        path: '/customer-business',
        routes: [
          {
            path: '/customer-business/customer',
            icon: 'smile',
            name: '客户',
            component: './CustomerAndBusiness/Customer',
          },
          {
            path: '/customer-business/customers',
            icon: 'smile',
            name: '商机',
            component: './CustomerAndBusiness/Customer',
            routes: [
              {
                path: '/test',
                icon: 'smile',
                name: '客户',
                component: './TestPage',
              },
            ],
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/404',
    component: './404',
  },
];
