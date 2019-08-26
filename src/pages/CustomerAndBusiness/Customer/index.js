import React, { Component, Fragment } from 'react';
import { Table, Input, Menu, Dropdown, Icon, Button } from 'antd';
import AddCustomer from './AddCustomer';
import styles from './styles.less';

const { Search } = Input;

class CustomerList extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    console.log(this);
  }

  // 关闭添加客户
  closeAdd = () => {
    this.setState({
      visible: false,
    });
  };

  // 点击新建按钮
  clickAdd = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span>我负责的</span>
        </Menu.Item>
        <Menu.Item>
          <span>我跟进的</span>
        </Menu.Item>
        <Menu.Item>
          <span>我服务的</span>
        </Menu.Item>
      </Menu>
    );
    const { visible } = this.state;

    return (
      <Fragment>
        <div className={`${styles.topWrapper} clearfix`}>
          <div className={styles.left}>
            <div className="clearfix">
              <p>客户</p>
              <div className={styles.selectType}>
                <Dropdown overlay={menu}>
                  <span className="ant-dropdown-link" style={{ cursor: 'pointer' }}>
                    我负责的 <Icon type="down" />
                  </span>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className="clearfix">
              <div className={styles.search}>
                <Search
                  style={{ width: 200 }}
                  placeholder="搜索客户名称"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </div>
              <div className={styles.btnWrap}>
                <Button
                  type="primary"
                  className={styles.btn}
                  onClick={() => {
                    this.clickAdd();
                  }}
                >
                  新建
                </Button>
              </div>
            </div>
          </div>
        </div>

        <AddCustomer
          visible={visible}
          onClose={() => {
            this.closeAdd();
          }}
        />
      </Fragment>
    );
  }
}
export default CustomerList;
