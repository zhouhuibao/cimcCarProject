import React, { Component } from 'react';
import { Tabs, Table, Alert, Button, Select, Switch, Tag } from 'antd';
import { router } from 'umi';
import data from './dplist.json';

const { Option } = Select;
const { TabPane } = Tabs;
class PhysicalStore extends Component {
  state = {
    dpData: data,
    dpColumns: [
      {
        title: '门店名称',
        dataIndex: 'storeName',
        render: text => {
          return <a>{text}</a>;
        },
      },
      {
        title: '直营店',
        dataIndex: 'isDirectStore',
        render: text => {
          return text === 1 ? <Tag color="green">直营</Tag> : <Tag color="blue">非直营</Tag>;
        },
      },
      {
        title: '地理位置',
        dataIndex: 'address',
      },
      {
        title: '状态',
        dataIndex: 'isOpen',
        render: text => {
          return <Switch defaultChecked={text} />;
        },
      },
      {
        title: '到期时间',
        dataIndex: 'expiredAt',
      },
      {
        title: '设为默认',
        dataIndex: 'isDefault',
        render: text => {
          return <Switch defaultChecked={text} disabled={text || false} />;
        },
      },
      {
        title: '操作',
        render: () => {
          return <a>编辑</a>;
        },
      },
    ],
    columns: [
      {
        title: '资源名称',
        dataIndex: 'name',
      },
      {
        title: '包含门店数',
        dataIndex: 'number',
      },
      {
        title: '剩余门店数',
        dataIndex: 'numbers',
      },
      {
        title: '激活时间',
        dataIndex: 'openTime',
      },
      {
        title: '到期时间',
        dataIndex: 'overTime',
      },
    ],
    dataSource: [],
  };

  render() {
    const { columns, dataSource, dpColumns, dpData } = this.state;
    return (
      <div>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="微信门店管理" key="1">
            <Alert
              message="请先确认您是否已经开通门店小程序！"
              description={
                <>
                  如果没有请点击 <a>开通门店小程序</a> ，去微信后台添加或者升级门店小程序
                </>
              }
              type="success"
              closable
              style={{ marginBottom: 20 }}
            />
            <div className="clearfix" style={{ marginBottom: 20 }}>
              <div className="pull-left">
                店铺类型 &ensp;
                <Select style={{ width: '200px' }} placeholder="请选择店铺类型">
                  <Option value="1">直营店</Option>
                  <Option value="2">非直营店</Option>
                </Select>
              </div>
              <div className="pull-right">
                <Button
                  type="primary"
                  icon="plus"
                  onClick={() => router.push('/shop/physical-store/add-wxshop')}
                >
                  添加门店
                </Button>
                &ensp;
                <Button type="primary" icon="reload">
                  同步门店
                </Button>
              </div>
            </div>
            <Table columns={dpColumns} dataSource={dpData} />
          </TabPane>
          <TabPane tab="可用资源包列表" key="2">
            <Table columns={columns} dataSource={dataSource} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default PhysicalStore;
