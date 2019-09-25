import React, { Component } from 'react';
import { Button, Icon, Tabs, Table, InputNumber, Tooltip, message } from 'antd';
import { router } from 'umi';
import SearchComponent from '@/components/SearchComponent';
import goodsList from './list.json';
import OperationModal from './OperationModal';
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
    selectedData: [],
    columns: [
      {
        title: '操作',
        render: (text, record) => (
          <a>
            编辑{' '}
            <Tooltip
              mouseLeaveDelay={0.1}
              overlayClassName={styles.goodsTools}
              placement="right"
              title={
                <>
                  <a
                    onClick={() => {
                      this.delGoods(record);
                    }}
                  >
                    删除
                  </a>
                  <a>添加相似</a>
                  <a>设置价格</a>
                  <a>标签</a>
                  <a>复制链接</a>
                </>
              }
            >
              <Icon type="double-right" />
            </Tooltip>{' '}
          </a>
        ),
      },
      {
        title: '商品id',
        dataIndex: 'itemId',
      },
      {
        title: '排序编号',
        dataIndex: 'sort',
        width: 100,
        render: text => {
          return <InputNumber min={0} defaultValue={text} style={{ textAlign: 'center' }} />;
        },
      },
      {
        title: '规格',
        dataIndex: 'address1',
      },
      {
        title: '商品名称',
        dataIndex: 'itemName',
      },
      {
        title: '库存',
        dataIndex: 'store',
      },
      {
        title: '状态',
        dataIndex: 'address4',
      },
      {
        title: '标签',
        render: (text, record) => (
          <span>
            {record.tagList.map(item => {
              return (
                <span
                  key={item.tag_id}
                  className="ant-tag"
                  style={{ color: item.font_color, background: item.tag_color }}
                >
                  {item.tag_name}
                </span>
              );
            })}
          </span>
        ),
      },
    ],
    data: goodsList,
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
  addGoods = () => {};

  // 删除商品
  delGoods = record => {
    console.log(record);
  };

  setModalType = title => {
    this.setState({
      visible: true,
      title,
    });
  };

  // 更改商品分类
  updataGoodsType = () => {
    const { selectedData } = this.state;
    if (selectedData.length <= 0) {
      message.warning('请选择需要更改的商品');
    } else {
      this.setModalType('更改商品分类');
    }
  };

  // 更改运费模板
  updataTemplate = () => {
    const { selectedData } = this.state;
    if (selectedData.length <= 0) {
      message.warning('请选择需要更改的商品');
    } else {
      this.setModalType('更改运费模板');
    }
  };

  // 更改运费模板
  updataTag = () => {
    const { selectedData } = this.state;
    if (selectedData.length <= 0) {
      message.warning('请选择需要打标签的商品');
    } else {
      this.setModalType('打标签');
    }
  };

  handOk = e => {
    console.log(e);
  };

  render() {
    const { fields, columns, data, visible, title } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedData: selectedRows,
        });
      },
    };
    return (
      <div className={styles.GoodsManagementWrap}>
        <SearchComponent searchData={fields} ref={this.formItemRef} />
        <ButtonGroup style={{ marginBottom: 15 }}>
          <Button
            type="primary"
            onClick={() => {
              router.push('/goods/goods-kind/goods-management/add-goods');
            }}
          >
            <Icon type="plus-circle" />
            添加商品
          </Button>
          <Button
            type="primary"
            onClick={e => {
              this.updataGoodsType(e);
            }}
          >
            <Icon type="edit" />
            更改商品分类
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.updataTemplate();
            }}
          >
            <Icon type="edit" />
            更改运费模板
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.updataTag();
            }}
          >
            <Icon type="edit" />
            打标签
          </Button>
        </ButtonGroup>
        <Tabs type="card">
          <TabPane tab="全部商品" key="1">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              rowKey={record => record.itemId}
            />
          </TabPane>
          <TabPane tab="库存预警商品" key="2">
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </TabPane>
        </Tabs>

        <OperationModal
          visible={visible}
          title={title}
          onOk={e => {
            this.handOk(e);
          }}
          onCancel={() => this.setState({ visible: false })}
        />
      </div>
    );
  }
}
export default GoodsManagement;
