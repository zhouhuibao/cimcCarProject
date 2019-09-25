import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import materialsData from './wuliao.json';

class Addmaterials extends Component {
  state = {
    dataSource: materialsData,
    columns: [
      {
        title: '物料名称',
        dataIndex: 'labelName',
      },
      {
        title: '系统类型',
        dataIndex: 'serviceType',
      },
      {
        title: '物料价格',
        dataIndex: 'labelPrice',
        render: text => {
          return `¥ ${text}`;
        },
      },
    ],
  };

  render() {
    const { columns, dataSource } = this.state;
    const { visible, onCancel, rowSelection } = this.props;
    return (
      <Modal title="选择基础物料" visible={visible} onCancel={onCancel} footer={null}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.labelId}
        />
      </Modal>
    );
  }
}
export default Addmaterials;
