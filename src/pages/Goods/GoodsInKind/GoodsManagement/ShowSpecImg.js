/* eslint-disable */
import React from 'react';
import { Modal } from 'antd';
import { showImg } from '@/utils/utils';

function ShowSpecImg(props) {
  const { visible, handleCancel, imglist } = props;
  return (
    <Modal title="查看图片" visible={visible} footer={null} onCancel={handleCancel}>
      <div className="clearfix">
        {imglist.length > 0 ? (
          imglist.map((item, index) => {
            return (
              <div
                style={{
                  float: 'left',
                  padding: 5,
                  border: '1px dashed #ccc',
                  borderRadius: '6px',
                  marginRight: 10,
                  width: '50px',
                  height: '50px',
                }}
                key={index}
              >
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={showImg(item.skuPicture)}
                  alt="图片"
                />
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center' }}>暂无图片</p>
        )}
      </div>
    </Modal>
  );
}

export default ShowSpecImg;
