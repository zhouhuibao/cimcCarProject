import React, { Component } from 'react';
import { Alert, Button, Table, Input, Icon, Popconfirm } from 'antd';
import basicData from './basic.json';
import styles from '../../../goodsStyles.less';

const { Search } = Input;
class BasicMaterial extends Component {
  state = {
    columns: [
      {
        title: '物料名称',
        dataIndex: 'labelName',
        render: text => {
          return <a>{text}</a>;
        },
      },
      {
        title: '系统类型',
        dataIndex: 'serviceType',
      },
      {
        title: '物料价格(元)',
        dataIndex: 'labelPrice',
        render: text => {
          return `¥ ${text}`;
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
                title="确定删除该基础物料?"
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

  render() {
    const { columns, dataSource } = this.state;
    return (
      <div className={styles.goodsBrand}>
        <Alert
          style={{ marginBottom: 20 }}
          message="添加基础物料，方便您个性化的添加各类服务商品(不仅仅是商品)！"
          closable
          type="warning"
          showIcon
        />
        <div className={styles.goodsBrandHeader}>
          <div className={styles.addBtn}>
            <Button
              type="primary"
              icon="plus"
              //   onClick={()=>{this.addGoodsTag()}}
            >
              新增基础物料
            </Button>
          </div>
          <div className={styles.search}>
            <Search
              placeholder="请输入基础物料名称"
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
export default BasicMaterial;
