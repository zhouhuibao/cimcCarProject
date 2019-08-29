import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { connect } from 'dva';
// import Link from 'umi/link';
import { router, Link } from 'umi';
import styles from './UserLayout.less';

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
    rootSubmenuKeys: ['welcome', 'sub2', 'sub4'],
    openKeys: ['welcome'],
  };

  componentDidMount() {
    console.log(this);
  }

  onOpenChange = openKeyss => {
    const { rootSubmenuKeys, openKeys } = this.state;
    const latestOpenKey = openKeyss.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys: openKeyss });
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

  //

  showMenu = item => {
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
              return menuitem.name ? (
                <Menu.Item key={menuitem.path}>
                  <Link to={menuitem.path ? menuitem.path : '/'} replace>
                    {menuitem.name}
                  </Link>
                </Menu.Item>
              ) : null;
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
    const { collapsed } = this.state;
    const {
      route: { routes },
      location: { pathname },
    } = this.props;
    console.log(pathname);
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
              <span>{collapsed ? 'cimc' : ' 挂车管家'}</span>
            </div>
            <Menu
              mode="inline"
              //   openKeys={pathname}
              //   openKeys={[pathname]}
              onOpenChange={this.onOpenChange}
              style={{ borderRight: 0, width: collapsed ? '79px' : '100%' }}
              selectedKeys={[pathname]}
            >
              {routes.map(item => {
                return this.showMenu(item);
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
            {children}
          </div>
        </div>
      </div>
    );
  }
}
export default BasicLayout;
