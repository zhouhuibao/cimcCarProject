import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, ConfigProvider } from 'antd';
import { connect } from 'dva';
// import Link from 'umi/link';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { router, Link } from 'umi';
import { isEmpty } from '@/utils/utils';
import styles from './UserLayout.less';
import logoMaxImg from '@/assets/logo-max.png';
import logoMinImg from '@/assets/logo-min.png';

console.log(logoMinImg);
const rootSubmenuKeysArr = [];
const newArr = [];
function fun(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (Array.isArray(arr[i].routes)) {
      newArr.push(arr[i]);

      fun(arr[i].routes);
    }
    // else{
    //     newArr.push(arr[i]);
    // }
  }
}

function copyArr(obj) {
  const out = [];
  for (let i = 0; i < obj.length; i += 1) {
    // console.log(obj[i].path)
    if (obj[i].routes instanceof Array) {
      out.push(obj[i].path);
      out[i] = copyArr(obj[i].routes);
    } else if (isEmpty(obj[i].path)) {
      out[i] = obj[i].path;
    }
  }
  return out;
}

const { Sider } = Layout;
const { SubMenu } = Menu;
const imgPath =
  'https://a9.fspage.com/FSR/frontend/html/base-dist/assets/images/employee_default_120_120-dc73603d24.png';

@connect(({ global, settings }) => ({
  global,
  settings,
}))
class BasicLayout extends Component {
  state = {
    collapsed: false,
    rootSubmenuKeys: [],
    openKeys: ['/goods'],
  };

  componentDidMount() {
    const {
      route: { routes },
    } = this.props;
    fun(routes);

    const keysArr = [];
    newArr.forEach(item => {
      if (isEmpty(item.path)) {
        keysArr.push(item.path);
      }
    });

    // this.setState({
    //   rootSubmenuKeys:keysArr
    // })

    // this.setRootSubmenuKeys(routes)
  }

  setRootSubmenuKeys = routes => {
    // const {
    //   route: { routes },
    // } = this.props;
    const arrKey = [];
    routes.forEach(item => {
      if (isEmpty(item.path)) {
        arrKey.push(item.path);
        // if(isEmpty(routes)){

        // }
      }
    });
  };

  // 创建子节点
  createSubMenu = item => {
    if (item.name) {
      if (item.routes) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {item.routes.map(menuitem => {
              return this.createMenuItem(menuitem);
            })}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path ? item.path : '/'} replace>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    }
    return null;
  };

  // 判断子节点中是否有子节点
  isChilder = () => {};

  createMenuItem = item => {
    if (item.name) {
      if (item.routes) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {item.routes.map(menuitem => {
              return this.createSubMenu(menuitem);
            })}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path ? item.path : '/'} replace>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    }
    return null;
  };

  filterkeys = keys => {
    const arr = [];
    rootSubmenuKeysArr.forEach(item => {
      arr.push(JSON.stringify(item));
    });
    console.log(arr);
    console.log(keys);

    // console.log(arr.indexOf(keys))

    arr.forEach(item => {
      console.log(item.indexOf(JSON.stringify(keys)));
    });
  };

  // onOpenChange = openKeyss => {
  //   console.log(openKeyss);
  //   const { rootSubmenuKeys, openKeys } = this.state;
  //   rootSubmenuKeysArr.push(openKeyss);
  //   console.log(rootSubmenuKeysArr)
  //   const latestOpenKey = openKeyss.find(key => openKeys.indexOf(key) === -1);

  //     // console.log(latestOpenKey)
  //     if (rootSubmenuKeysArr.indexOf(latestOpenKey) === -1) {
  //       this.setState({ openKeys: openKeyss });
  //     } else {
  //       this.setState({
  //         openKeys: latestOpenKey ? [latestOpenKey] : [],
  //       });
  //     }
  // };

  onOpenChange = openKeys => {
    console.log(openKeys);
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    console.log(latestOpenKey);
    rootSubmenuKeysArr.push(openKeys);

    if (rootSubmenuKeysArr.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  toggle = () => {
    const { collapsed } = this.state;
    console.log(collapsed);

    this.setState({
      collapsed: !collapsed,
    });
  };

  loginOut = () => {
    router.push('/user/login');
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span
            onClick={() => {
              this.loginOut();
            }}
          >
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    );
    const { children } = this.props;
    const { collapsed, openKeys } = this.state;
    const {
      route: { routes },
      location: { pathname },
    } = this.props;
    console.log(pathname);
    console.log(openKeys);
    return (
      <div className={styles.basicLayout}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={styles.silder}
          width={256}
          theme="light"
        >
          <div className={styles.menuWrap}>
            <div className={styles.logoTitle}>
              <img
                src={collapsed ? logoMinImg : logoMaxImg}
                alt="logo"
                style={{ width: collapsed ? 'auto' : 130 }}
              />
              {/* <span>{collapsed ? 'cimc' : ' 挂车管家'}</span> */}
            </div>
            <Menu
              mode="inline"
              // openKeys={dataType(pathname) === 'Array' ? pathname[pathname.length-1] : pathname }
              openKeys={openKeys}
              onOpenChange={this.onOpenChange}
              style={{ borderRight: 0, width: collapsed ? '79px' : '100%' }}
              selectedKeys={[pathname]}
            >
              {routes.map(item => {
                return this.createSubMenu(item);
              })}
            </Menu>
          </div>
        </Sider>

        <div className={styles.layoutContent}>
          <div className={`${styles.layoutHeader} clearfix`}>
            <div className={styles.headerIcon}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                style={{
                  height: '64px',
                  padding: '19px 24px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all .3s,padding 0s',
                }}
              />
            </div>
            <div className={styles.headerNav}>
              <div className={styles.headerNavItem}>
                <Dropdown overlay={menu} placement="bottomRight">
                  <div>
                    <img src={imgPath} alt="" />
                    &ensp;
                    <Icon type="caret-down" style={{ color: '#ccc' }} />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className={styles.layoutContainer}>
            {/* {
                        list.map((item)=>{
                            return <p key={item}>{item}</p>
                        })
                    } */}
            <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
          </div>
        </div>
      </div>
    );
  }
}
export default BasicLayout;
