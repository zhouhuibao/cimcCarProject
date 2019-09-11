import React, { Component } from 'react';
import { Button, Icon, Tabs, Table } from 'antd';
import SearchComponent from '@/components/SearchComponent';
import AddGoods from './AddGoods';
import styles from './styles.less';

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;

class GoodsManagement extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    visible: false,
    columns: [
      {
        title: '操作',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '商品id',
        dataIndex: 'age',
      },
      {
        title: '排序编号',
        dataIndex: 'address',
      },
      {
        title: '规格',
        dataIndex: 'address1',
      },
      {
        title: '商品名称',
        dataIndex: 'address2',
      },
      {
        title: '库存',
        dataIndex: 'address3',
      },
      {
        title: '状态',
        dataIndex: 'address4',
      },
      {
        title: '标签',
        dataIndex: 'address5',
      },
    ],
    data: [],
    fields: [
      {
        id: 'goodsname',
        type: 'search',
        placeholder: '商品名称',
        change: value => {
          console.log(this.formItemRef);
          console.log(value);
        },
      },
      {
        id: 'template',
        type: 'select',
        placeholder: '运费模板',
        option: [
          {
            label: '韵达',
            value: '1',
          },
          {
            label: '顺丰',
            value: '2',
          },
        ],
      },
      {
        id: 'template',
        type: 'select',
        placeholder: '商品产地',
        option: [
          {
            label: '韵达',
            value: '1',
          },
          {
            label: '顺丰',
            value: '2',
          },
        ],
      },
      {
        id: 'template',
        type: 'select',
        placeholder: '选择分类',
        option: [
          {
            label: '韵达',
            value: '1',
          },
          {
            label: '顺丰',
            value: '2',
          },
        ],
      },
      {
        id: 'template',
        type: 'select',
        placeholder: '选择标签',
        option: [
          {
            label: '韵达',
            value: '1',
          },
          {
            label: '顺丰',
            value: '2',
          },
        ],
      },
    ],
  };

  
  // 添加修改商品
  addGoods = () => {
    this.setState({
      visible: true,
    });
  };

  // 关闭添加修改商品
  closeAdd = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { fields, columns, data, visible } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div className={styles.GoodsManagementWrap}>
        <SearchComponent searchData={fields} ref={this.formItemRef} />
        <ButtonGroup style={{ marginBottom: 15 }}>
          <Button
            type="primary"
            onClick={() => {
              this.addGoods();
            }}
          >
            <Icon type="plus-circle" />
            添加商品
          </Button>
          <Button type="primary">
            <Icon type="edit" />
            更改商品分类
          </Button>
          <Button type="primary">
            <Icon type="edit" />
            更改运费模板
          </Button>
          <Button type="primary">
            <Icon type="edit" />
            打标签
          </Button>
        </ButtonGroup>
        <Tabs type="card">
          <TabPane tab="全部商品" key="1">
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </TabPane>
          <TabPane tab="库存预警商品" key="2">
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </TabPane>
        </Tabs>
        <AddGoods
          visible={visible}
          onClose={() => {
            this.closeAdd();
          }}
        />
      </div>
    );
  }
}
export default GoodsManagement;
