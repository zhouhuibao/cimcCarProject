import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
import styles from './UserLayout.less';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends Component {
  state = {
    collapsed: false,
    list: [],
    rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
    openKeys: ['sub1'],
  };

  componentDidMount() {
    console.log(this);
    const arr = [];
    for (let i = 0; i < 100; i += 1) {
      arr.push(i);
    }
    this.setState({
      list: arr,
    });
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  showMenu = () => {
    const {
      route: { routes },
    } = this.props;
    let dom = null;

    routes.forEach(item => {
      if (item.routes) {
        dom += (
          <SubMenu
            key={item.name}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {/* {item.routes.map(menuItem)=>
                return(<Menu.Item key={menuItem.name}>
                    <Link to={menuItem.path} replace>
                    {item.name}
                    </Link>
                </Menu.Item>)
                    
                } */}
          </SubMenu>
        );
      } else {
        dom += (
          <Menu.Item key={item.name}>
            <Link to={item.path} replace>
              {item.name}
            </Link>
          </Menu.Item>
        );
      }
    });

    return dom;
  };

  render() {
    const { dispatch, children, settings } = this.props;
    const { list, openKeys } = this.state;
    const {
      route: { routes },
    } = this.props;
    return (
      <div className={styles.basicLayout}>
        <div className={styles.layoutMenuWrap}>
          <div className={styles.logo}>logo</div>
          <div className={styles.layoutMenu}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={this.onOpenChange}
              style={{ width: 256 }}
            >
              {routes.map(item => {
                return item.routes ? (
                  <SubMenu
                    key={item.name}
                    title={
                      <span>
                        <Icon type={item.icon} />
                        <span>{item.name}</span>
                      </span>
                    }
                  >
                    {item.routes.map(menuitem => {
                      return (
                        <Menu.Item key={menuitem.name}>
                          <Link to={menuitem.path ? menuitem.path : '/'} replace>
                            {menuitem.name}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                ) : (
                  <Menu.Item key={item.name}>
                    <Link to={item.path ? item.path : '/'} replace>
                      {item.name}
                    </Link>
                    {item.name}
                  </Menu.Item>
                );
              })}
              {/* <SubMenu
                          key="sub1"
                          title={
                            <span>
                            <Icon type="mail" />
                            <span>Navigation One</span>
                            </span>
                        }
                        >
                        <Menu.Item key="1">
                            <Link to='/' replace>
                                Option 2
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to='/test' replace>
                                Option 2
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu
                          key="sub2"
                          title={
                            <span>
                            <Icon type="appstore" />
                            <span>Navigation Two</span>
                            </span>
                        }
                        >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        </SubMenu>
                        <SubMenu
                          key="sub4"
                          title={
                            <span>
                            <Icon type="setting" />
                            <span>Navigation Three</span>
                            </span>
                        }
                        >
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu> */}
            </Menu>
          </div>
        </div>
        <div className={styles.layoutContent}>
          <div className={styles.layoutHeader}>1</div>
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
