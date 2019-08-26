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
