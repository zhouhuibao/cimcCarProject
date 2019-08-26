/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);

const amapKay = '7456de5e90a1be2a58600fa5c714d63b';

const rules = type => {
  let rule = '';
  switch (type) {
    case 'mobile': // 验证手机号
      rule = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
      break;
    case 'number': // 判断是不是数字
      rule = /^[0-9]*$/;
      break;
    case 'password': // 判断密码是不是数字加字母组合
      rule = /\w{6,17}$/;
      break;

    default:
      break;
  }

  return rule;
};

const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

export { isAntDesignProOrDev, isAntDesignPro, isUrl, rules, amapKay };
