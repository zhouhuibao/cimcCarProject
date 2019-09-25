import React, { Component } from 'react';
import { Button, Table, Input, Icon, Popconfirm } from 'antd';
import { router } from 'umi';
import basicData from './goods.json';
import styles from '../../../goodsStyles.less';

const { Search } = Input;
class Goods extends Component {
  state = {
    columns: [
      {
        title: '商品ID',
        dataIndex: 'itemId',
      },
      {
        title: '排序编号',
        dataIndex: 'sort',
      },
      {
        title: '商品名称',
        dataIndex: 'itemName',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: text => {
          return `¥ ${text}`;
        },
      },
      {
        title: '核销类型',
        render: () => {
          return '次卡类型';
        },
      },
      {
        title: '操作',
        width: 100,
        align: 'center',
        render: (text, record) => {
          return (
            <>
              <Icon type="edit" style={{ cursor: 'pointer' }} />
              &ensp;&ensp;
              <Popconfirm
                title="确定删除该商品?"
                onConfirm={e => {
                  this.deleteTableDate(e, record);
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
    ],
    dataSource: basicData,
  };

  deleteTableDate = (e, record) => {
    console.log(e);
    console.log(record);
  };

  addGoods = () => {
    router.push('/goods/goods-server/goods-management/add-goods');
  };

  render() {
    const { columns, dataSource } = this.state;
    return (
      <div className={styles.goodsBrand}>
        <div className={styles.goodsBrandHeader}>
          <div className={styles.addBtn}>
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                this.addGoods();
              }}
            >
              添加商品
            </Button>
          </div>
          <div className={styles.search}>
            <Search
              placeholder="请输入商品名称"
              onSearch={value => console.log(value)}
              enterButton
            />
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} rowKey={record => record.tag_id} />
      </div>
    );
  }
}
export default Goods;
