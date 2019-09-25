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
            name: '配件',
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
              {
                path: '/goods/goods-kind/goods-management/add-goods',
                component: './Goods/GoodsInKind/GoodsManagement/AddGoods',
              },
            ],
          },
          {
            path: '/goods/goods-server',
            icon: 'smile',
            name: '服务',
            routes: [
              {
                path: '/goods/goods-server/goods-management',
                name: '商品管理',
                component: './Goods/GoodsServer/GoodsManagement',
              },
              {
                path: '/goods/goods-server/goods-management/add-goods',
                component: './Goods/GoodsServer/GoodsManagement/Goods/AddGoods',
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
            name: '配件订单',
            routes: [
              {
                path: '/deal/physical-order/physical-order-content',
                name: '配件订单',
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
              },
              {
                path: '/deal/physical-order/freight-template/add-freight-template',
                component: './Deal/PhysicalOrder/FreightTemplate/AddFrughtTemplate',
              },
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
              },
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
              },
            ],
          },
          {
            path: '/deal/trading-order',
            name: '交易单',
            component: './Deal/TradingOrder',
          },
          {
            path: '/deal/car-order',
            name: '整车订单',
            component: './Deal/CarOrder',
          },
        ],
      },

      {
        name: '代理商',
        icon: 'smile',
        path: '/agent',
        routes: [
          {
            path: '/agent/agent-list',
            name: '代理商列表',
            component: './Agent/AgentList',
          },
          {
            path: '/agent/agency-brand-region',
            name: '代理品牌及区域',
            component: './Agent/AgencyBrandRegion',
          },
          {
            path: '/agent/product-config',
            name: '商品配置',
            component: './Agent/ProductConfig',
          },
          {
            path: '/agent/agency-order',
            name: '我的订单',
            component: './Agent/AgencyOrder',
          },
          // {
          //   path: '/agent/agent-list/add-wxshop',
          //   component: './Agent/AgentList/Addwxshop',
          // }
        ],
      },
      {
        name: '服务站',
        icon: 'smile',
        path: '/service',
        routes: [
          {
            path: '/service/service-list',
            name: '服务站列表',
            component: './Service/ServiceList',
          },
          {
            path: '/service/service-catalog',
            name: '服务目录',
            component: './Service/ServiceCatalog',
          },
          {
            path: '/service/order',
            name: '我的订单',
            component: './Service/Order',
          },
        ],
      },
      {
        name: '实体门店',
        icon: 'smile',
        path: '/shop',
        routes: [
          {
            path: '/shop/shop-list',
            name: '门店列表',
            component: './Shop/ShopList',
          },
        ],
      },
      {
        name: '系统管理',
        icon: 'smile',
        path: '/sys',
        routes: [
          {
            path: '/sys/enmu',
            name: '枚举信息',
            component: './Sys/Enmu',
          },
          {
            path: '/sys/division',
            name: '行政区划',
            component: './Sys/Division',
          },
        ],
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
