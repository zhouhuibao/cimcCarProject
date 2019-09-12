import React, { Component } from 'react';
import { Button, Pagination, Row, Col, Icon, Modal } from 'antd';
import imgData from '../pic.json';
import styles from '../file.less';

const { confirm } = Modal;

class LocalPic extends Component {
  state = {
    data: imgData,
  };

  showConfirm = () => {
    confirm({
      title: '确定删除此图片吗？',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  showTotal = total => {
    return `共 ${total} 条`;
  };

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  render() {
    const { data } = this.state;
    console.log(data);

    return (
      <div>
        <Button type="primary">上传图片</Button>
        <div style={{ marginBottom: 20 }}>只能上传jpg/png文件，且不超过2M</div>
        <Row gutter={16}>
          {data.map(item => {
            return (
              <Col className="gutter-row" sm={12} lg={6} xl={4} key={item.media_id}>
                <div className={styles.pic}>
                  <div
                    className={styles.imgContent}
                    style={{ backgroundImage: `url(${item.url})` }}
                  />
                  <div className={styles.imgName}>{item.name}</div>
                  <div
                    className={styles.delImg}
                    onClick={() => {
                      this.showConfirm();
                    }}
                  >
                    <Icon type="delete" />
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Pagination
          showSizeChanger
          onShowSizeChange={this.onShowSizeChange}
          showTotal={this.showTotal}
          total={data.length}
        />
      </div>
    );
  }
}
export default LocalPic;
