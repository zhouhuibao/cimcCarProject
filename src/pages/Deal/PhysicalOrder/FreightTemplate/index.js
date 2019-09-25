import React, { Component } from 'react';
import { Button, Tabs, Table, Icon, Popconfirm } from 'antd';
import { router } from 'umi';
import { isEmpty } from '@/utils/utils';

const { TabPane } = Tabs;

class FreightTemplate extends Component {
  state = {
    columns: [],
    dataSource: [],
    tabsArr: [
      {
        key: '1',
        label: '买家承担运费',
        columns: [
          {
            title: '运费',
            dataIndex: 'nameq',
          },
        ],
      },
      {
        key: '2',
        label: '按重量运费模板',
        columns: [
          {
            title: '首重(kg)',
            dataIndex: 'nameq',
          },
          {
            title: '首费(元)',
            dataIndex: 'namew',
          },
          {
            title: '续重(kg)',
            dataIndex: 'namee',
          },
          {
            title: '续费(元)',
            dataIndex: 'namer',
          },
        ],
      },
      {
        key: '3',
        label: '按件数运费模板',
        columns: [
          {
            title: '首件(kg)',
            dataIndex: 'nameq',
          },
          {
            title: '首费(元)',
            dataIndex: 'namew',
          },
          {
            title: '续件(kg)',
            dataIndex: 'namee',
          },
          {
            title: '续费(元)',
            dataIndex: 'namer',
          },
        ],
      },
      {
        key: '4',
        label: '按金额运费模板',
        columns: [
          {
            title: '贷款下限(元)',
            dataIndex: 'nameq',
          },
          {
            title: '贷款上限(元)',
            dataIndex: 'namew',
          },
          {
            title: '运费',
            dataIndex: 'namee',
          },
        ],
      },
      {
        key: '5',
        label: '按体积运费模板',
        columns: [
          {
            title: '首体积(m³)',
            dataIndex: 'nameq',
          },
          {
            title: '首费(元)',
            dataIndex: 'namew',
          },
          {
            title: '续体积(m³)',
            dataIndex: 'namee',
          },
          {
            title: '续费(元)',
            dataIndex: 'namer',
          },
        ],
      },
    ],
  };

  componentDidMount() {
    this.setDefaultColumns();
  }

  setDefaultColumns = index => {
    const arr1 = [
      {
        title: 'ID',
        dataIndex: 'ID',
      },
      {
        title: '运费模板名称',
        dataIndex: 'nameh',
      },
      {
        title: '配送地区',
        dataIndex: 'namej',
      },
    ];

    const arr2 = [
      {
        title: '状态',
        dataIndex: 'namet',
      },
      {
        title: '最后修改时间',
        dataIndex: 'nameg',
      },
      {
        title: '操作',
        render: () => {
          return (
            <>
              <Icon type="edit" />
              <Popconfirm
                title="此操作将删除该运费模板, 是否继续?"
                onConfirm={() => {
                  console.log('确定');
                }}
                onCancel={() => {
                  console.log('取消');
                }}
                okText="确定"
                cancelText="取消"
              >
                <Icon type="delete" />
              </Popconfirm>
            </>
          );
        },
      },
    ];

    const { tabsArr } = this.state;

    const columnsArr = [].concat(
      arr1,
      tabsArr[isEmpty(index) ? Number(index) - 1 : 0].columns,
      arr2,
    );
    this.setState({
      columns: columnsArr,
    });
  };

  changeTab = e => {
    this.setDefaultColumns(e);
  };

  render() {
    const { tabsArr, columns, dataSource } = this.state;
    return (
      <>
        <Button
          onClick={() => router.push('/deal/physical-order/freight-template/add-freight-template')}
          type="primary"
          style={{ marginBottom: 10 }}
        >
          新增运费模板
        </Button>
        <Tabs defaultActiveKey="1" onChange={this.changeTab} type="card">
          {tabsArr.map(item => {
            return <TabPane tab={item.label} key={item.key} />;
          })}
        </Tabs>
        <Table columns={columns} dataSource={dataSource} rowKey={record => record.order_id} />
      </>
    );
  }
}
export default FreightTemplate;
