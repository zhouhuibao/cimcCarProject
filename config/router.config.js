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
      // {
      //   path: '/',
      //   name: 'welcome',
      //   icon: 'smile',
      //   component: './Welcome',
      // },
      // {
      //   path: '/test',
      //   name: 'testPage',
      //   icon: 'smile',
      //   component: './TestPage',
      // },
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
        path: '/deal',
        name: '交易',
        icon: 'smile',
        routes: [
          {
            path: '/deal/physical-order',
            icon: 'smile',
            name: '实物订单',
            routes: [
              {
                path: '/deal/physical-order/physical-order-content',
                name: '实物订单',
                component: './Deal/PhysicalOrder/PhysicalOrderContent',
              },
              {
                path: '/deal/physical-order/after-sales-list',
                name: '售后列表',
                component: './Deal/PhysicalOrder/AfterSalesList',
              },
              {
                path: '/deal/physical-order/freight-template',
                name: '运费模板',
                component: './Deal/PhysicalOrder/FreightTemplate',
              }
            ],
          },
          {
            path: '/deal/server-order',
            icon: 'smile',
            name: '服务订单',
            routes: [
              {
                path: '/deal/server-order/server-order-content',
                name: '服务订单',
                component: './Deal/ServerOrder/ServerOrderContent',
              },
              {
                path: '/deal/server-order/service-verification-ist',
                name: '服务核销单',
                component: './Deal/ServerOrder/ServiceVerificationList',
              }
            ],
          },
          {
            path: '/deal/appointment',
            icon: 'smile',
            name: '预约',
            routes: [
              {
                path: '/deal/appointment/appointment-management',
                name: '预约管理',
                component: './Deal/Appointment/AppointmentManagement',
              },
              {
                path: '/deal/appointment/appointment-setting',
                name: '预约设置',
                component: './Deal/Appointment/AppointmentSetting',
              },
              {
                path: '/deal/appointment/appointment-form',
                name: '预约单',
                component: './Deal/Appointment/AppointmentForm',
              }
            ],
          },
          {
            path: '/deal/trading-order',
            name: '交易单',
            component: './Deal/TradingOrder',
          }
        ],
      },

      {
        name: '店铺',
        icon: 'smile',
        path: '/shop',
        routes: [
          {
            path: '/shop/shop-management',
            icon: 'smile',
            name: '店铺管理',
            routes:[
              {
                path: '/shop/shop-management/shop-list',
                name: '店铺列表',
                component: './shop/ShopManagement/ShopList',
              },
              {
                path: '/shop/shop-management/shop-product-config',
                name: '店铺商品配置',
                component: './shop/ShopManagement/ShopProductConfig',
              },
              {
                path: '/shop/shop-management/shop-guide',
                name: '店铺导购员',
                component: './shop/ShopManagement/ShopGuide',
              },
              {
                path: '/shop/shop-management/shop-order',
                name: '店铺订单',
                component: './shop/ShopManagement/ShopOrder',
              }
              
            ]
          },
          {
            path: '/shop/physical-store',
            name: '实体门店',
            component: './shop/PhysicalStore',
          }
        ]
      },

      // {
      //   name: '客户及商机管理',
      //   icon: 'smile',
      //   path: '/customer-business',
      //   routes: [
      //     {
      //       path: '/customer-business/customer',
      //       icon: 'smile',
      //       name: '客户',
      //       component: './CustomerAndBusiness/Customer',
      //     },
      //     {
      //       path: '/customer-business/customers',
      //       icon: 'smile',
      //       name: '商机',
      //       component: './CustomerAndBusiness/Customer',
      //       routes: [
      //         {
      //           path: '/test',
      //           icon: 'smile',
      //           name: '客户',
      //           component: './TestPage',
      //         },
      //       ],
      //     },
      //   ],
      // },
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
