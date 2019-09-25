import React, { Component } from 'react';
import { Alert, Button, Pagination, Row, Col, Icon, Modal } from 'antd';
import videoData from '../video.json';
import styles from '../file.less';

const { confirm } = Modal;
class VideoComponent extends Component {
  state = {
    data: videoData,
  };

  showTotal = total => {
    return `共 ${total} 条`;
  };

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  showConfirm = () => {
    confirm({
      title: '确定删除此视频吗？',
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
                当前视频已存储数量为&ensp;<span style={{ fontSize: 20 }}>{data.length}</span>
                &ensp;个
              </div>
              <div>
                当前视频剩余储&ensp;<span style={{ fontSize: 20 }}>5000</span>&ensp;个
              </div>
            </>
          }
          type="warning"
        />
        <Button type="primary" style={{ margin: '20px 0' }}>
          上传视频
        </Button>
        <Row gutter={16}>
          {data.map(item => {
            return (
              <Col className="gutter-row" sm={12} lg={6} xl={4} key={item.media_id}>
                <div className={styles.pic}>
                  <div className={styles.imgContent}>
                    <video
                      src={'https://www.w3school.com.cn/i/movie.ogg'}
                      controls="controls"
                      style={{ width: '100%', height: '100%' }}
                    >
                      您的浏览器不支持 video 标签。
                    </video>
                  </div>
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
export default VideoComponent;
