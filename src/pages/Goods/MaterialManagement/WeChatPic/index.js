import React, { Component } from 'react';
import { Alert, Button, Pagination, Row, Col, Icon, Modal } from 'antd';
import imgData from '../pic.json';
import styles from '../file.less';

const { confirm } = Modal;

class WeChatPic extends Component {
  state = {
    data: imgData,
  };

  showTotal = total => {
    return `共 ${total} 条`;
  };

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
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

  render() {
    const { data } = this.state;
    console.log(data);

    return (
      <div>
        <Alert
          message={
            <>
              <div>
                当前微信图片已存储数量为&ensp;<span style={{ fontSize: 20 }}>{data.length}</span>
                &ensp;张
              </div>
              <div>
                当前微信图片剩余储&ensp;<span style={{ fontSize: 20 }}>5000</span>&ensp;张
              </div>
            </>
          }
          type="warning"
        />
        <Button type="primary" style={{ marginTop: 20 }}>
          上传图片
        </Button>
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
export default WeChatPic;
