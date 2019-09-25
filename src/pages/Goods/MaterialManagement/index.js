import React, { Component } from 'react';
import { Tabs } from 'antd';
import { router } from 'umi';
import GraphicMessage from './GraphicMessage';
import { isEmpty } from '@/utils/utils';
import WeChatPic from './WeChatPic';
import LocalPic from './LocalPic';
import VideoComponent from './VideoComponent';

const { TabPane } = Tabs;

class MaterialManagement extends Component {
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
    router.push(`/goods/material-management?activeKey=${data}`);
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
        <TabPane tab="图文消息" key="0">
          <GraphicMessage />
        </TabPane>
        <TabPane tab="微信图片" key="1">
          <WeChatPic />
        </TabPane>
        <TabPane tab="本地图片" key="2">
          <LocalPic />
        </TabPane>
        <TabPane tab="视频" key="3">
          <VideoComponent />
        </TabPane>
      </Tabs>
    );
  }
}
export default MaterialManagement;
