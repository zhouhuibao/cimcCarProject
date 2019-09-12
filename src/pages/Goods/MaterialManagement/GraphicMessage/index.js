import React, { Component } from 'react';
import { Alert, Button, Pagination } from 'antd';

class GraphicMessage extends Component {
  componentDidMount() {
    console.log('图文消息');
  }

  showTotal = total => {
    return `共 ${total} 条`;
  };

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  render() {
    return (
      <div>
        <Alert
          message={
            <>
              <div>
                当前图文已存储数量为&ensp;<span style={{ fontSize: 20 }}>0</span>&ensp;篇
              </div>
              <div>
                当前图文剩余储&ensp;<span style={{ fontSize: 20 }}>5000</span>&ensp;篇
              </div>
            </>
          }
          type="warning"
        />
        <Button type="primary" style={{ margin: '20px 0' }}>
          新增图文消息
        </Button>
        <Pagination
          showSizeChanger
          onShowSizeChange={this.onShowSizeChange}
          showTotal={this.showTotal}
          total={0}
        />
      </div>
    );
  }
}
export default GraphicMessage;
