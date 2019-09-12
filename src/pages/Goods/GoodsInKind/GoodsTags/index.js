import React, { Component } from 'react';
import { Button, Table, Input, Icon, Popconfirm, Tag } from 'antd';
import AddTag from './AddTag';
import dataJSON from './tag.json';
import styles from '../../goodsStyles.less';

const { Search } = Input;
class GoodsTags extends Component {
  state = {
    visible: false,
    addTitle: '',
    editData: {},
    color: '#ccc',
    columns: [
      {
        title: 'ID',
        dataIndex: 'tag_id',
      },
      {
        title: '标签名称',
        dataIndex: 'tag_name',
        render: (text, record) => {
          return (
            <Tag color={record.font_color} style={{ background: record.tag_color }}>
              {text}
            </Tag>
          );
        },
      },
      {
        title: '标签描述',
        dataIndex: 'description',
      },
      {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center',
        width: 150,
        render: (text, record) => {
          return (
            <div>
              <Icon type="edit" style={{ cursor: 'pointer' }} />
              &ensp;
              <Popconfirm
                title="确定删除该标签?"
                onConfirm={e => {
                  this.deleteTableDate(e, record);
                }}
                okText="确定"
                cancelText="取消"
              >
                <Icon type="delete" />
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    dataSource: dataJSON,
  };

  changeHandler = color => {
    console.log(color);
  };

  addGoodsTag = () => {
    this.setState({
      addTitle: '新增标签',
      visible: true,
    });
  };

  closeAdd = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { color, columns, dataSource, editData, visible, addTitle } = this.state;

    return (
      <div className={styles.goodsBrand}>
        <div className={styles.goodsBrandHeader}>
          <div className={styles.addBtn}>
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                this.addGoodsTag();
              }}
            >
              新增标签
            </Button>
          </div>
          <div className={styles.search}>
            <Search
              placeholder="请输入标签名称"
              onSearch={value => console.log(value)}
              enterButton
            />
          </div>
        </div>
        <Table columns={columns} dataSource={dataSource} rowKey={record => record.tag_id} />

        <AddTag
          visible={visible}
          title={addTitle}
          editData={editData}
          onClose={() => {
            this.closeAdd();
          }}
        />
      </div>
    );
  }
}
export default GoodsTags;
