import React, { Component } from 'react';
import { Row, Col, Button, Form, Select, Input, Table, Cascader } from 'antd';
import AddShopList from './AddShopList';
import city from '@/utils/city.json';

const { Search } = Input;
const { Option } = Select;
@Form.create()
class ShopList extends Component {
  constructor(props) {
    super(props);
    this.addRef = React.createRef();
  }

  state = {
    visible: false,
    isEdit: false,
    option1: [
      {
        label: '全部',
        value: 0,
      },
      {
        label: '启用',
        value: 1,
      },
      {
        label: '禁用',
        value: 2,
      },
    ],
    columns: [
      {
        title: '店铺名称',
        dataIndex: 'name',
      },
      {
        title: '联系人',
        dataIndex: 'name1',
      },
      {
        title: '门店',
        dataIndex: 'name2',
      },
      {
        title: '联系人手机号',
        dataIndex: 'name3',
      },
      {
        title: '地区',
        dataIndex: 'name4',
      },
      {
        title: '地址',
        dataIndex: 'name5',
      },
      {
        title: '是否自提',
        dataIndex: 'name6',
      },
      {
        title: '是否禁用',
        dataIndex: 'name7',
      },
      {
        title: '操作',
        dataIndex: 'name8',
      },
      {
        title: '下载码',
        dataIndex: 'name9',
      },
    ],
    dataSource: [],
  };

  onOk = e => {
    const { validateFields } = e.current;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  render() {
    const { option1, columns, dataSource, isEdit, visible } = this.state;

    return (
      <div>
        <Row gutter={16}>
          <Col span={4}>
            <Button type="primary" onClick={() => this.setState({ visible: true })}>
              添加代理商
            </Button>
          </Col>
          <Col span={4}>
            <Select style={{ width: '100%' }} placeholder="请选择">
              {option1.map(item => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={4}>
            <Cascader
              style={{ width: '100%' }}
              options={city.data}
              changeOnSelect
              placeholder="请选择地址"
            />
          </Col>
          <Col span={4}>
            <Input placeholder="请输入店铺名称" />
          </Col>
          <Col span={4}>
            <Search
              placeholder="请输入联系人手机号"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>
        <Table columns={columns} dataSource={dataSource} style={{ marginTop: 20 }} />
        <AddShopList
          isEdit={isEdit}
          visible={visible}
          onCancel={() => this.setState({ visible: false })}
          onOk={e => {
            this.onOk(e);
          }}
          ref={this.addRef}
        />
      </div>
    );
  }
}
export default ShopList;
