import React, { Component } from 'react';
import { Tabs } from 'antd';
import { router } from 'umi';
import { isEmpty } from '@/utils/utils';
import BasicMaterial from './BasicMaterial';
import Goods from './Goods';

const { TabPane } = Tabs;
class GoodsManagement extends Component {
  state = {
    activeKey: '0',
  };

  componentDidMount() {
    const {
      location: {
        query: { activeKey },
      },
    } = this.props;
    this.setState({
      activeKey: isEmpty(activeKey) ? activeKey : '0',
    });
  }

  tabChange = data => {
    router.push(`/goods/goods-server/goods-management?activeKey=${data}`);
    this.setState({
      activeKey: data,
    });
  };

  render() {
    const { activeKey } = this.state;
    return (
      <Tabs
        defaultActiveKey={activeKey}
        activeKey={activeKey}
        onChange={this.tabChange}
        forceRender={false}
      >
        <TabPane tab="基础物料" key="0">
          <BasicMaterial />
        </TabPane>
        <TabPane tab="商品" key="1">
          <Goods />
        </TabPane>
      </Tabs>
    );
  }
}
export default GoodsManagement;
