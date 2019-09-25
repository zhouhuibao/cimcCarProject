import React, { Component } from 'react';
import { Drawer, Form, Button, Input, Icon } from 'antd';
import { connect } from 'dva';
import SelectImage from '@/components/SelectImage';
import styles from '../../goodsStyles.less';

const FormItem = Form.Item;

@Form.create()
@connect(({ brandModel, loading }) => ({
  brandModel,
  addLoading: loading.effects['brandModel/addGoodsBrand'],
  editLoading: loading.effects['brandModel/updateGoodsBrand'],
}))
class AddBrand extends Component {
  state = {
    imgVisible: false,
    imageUrl: '',
  };

  componentDidMount() {
    console.log('组件已加载');
  }

  openImg = () => {
    this.setState({
      imgVisible: true,
    });
  };

  changeImage = imgArr => {
    if (imgArr.length > 0) {
      const {
        form: { setFieldsValue },
      } = this.props;
      setFieldsValue({
        brandPicture: imgArr[0].url,
      });
      this.setState({
        imageUrl: imgArr[0].url,
      });
    }
    this.setState({
      imgVisible: false,
    });
  };

  afterVisibleChange = visible => {
    if (visible) {
      const { isAdd, initValue } = this.props;
      if (!isAdd) {
        this.setState({
          imageUrl: initValue.brandPicture,
        });
      } else {
        this.setState({
          imageUrl: '',
        });
      }
    }
  };

  render() {
    const {
      addLoading,
      editLoading,
      onClose,
      onOk,
      visible,
      isAdd,
      form: { getFieldDecorator },
      initValue,
    } = this.props;
    const { imageUrl, imgVisible } = this.state;
    const uploadButton = (
      <Icon type="camera" style={{ fontSize: 40, lineHeight: '100px', color: '#ccc' }} />
    );
    return (
      <Drawer
        title={isAdd ? '新增品牌' : '修改品牌'}
        width="500"
        destroyOnClose
        onClose={onClose}
        visible={visible}
        afterVisibleChange={e => {
          this.afterVisibleChange(e);
        }}
      >
        <Form onSubmit={onOk} className={`${styles.AddGoodsData} ${styles.goodsBrand}`}>
          <div>
            品牌名称
            <FormItem>
              {getFieldDecorator('brandName', {
                initialValue: isAdd ? null : initValue.brandName,
                rules: [{ required: true, message: '请输入品牌名称' }],
              })(<Input />)}
            </FormItem>
          </div>
          <div>
            <span style={{ fontSize: 14 }}>品牌logo</span>&ensp;&ensp;&ensp;
            <span style={{ fontSize: 12, color: '#666' }}>
              只能上传jpg/png文件，且不超过2M （建议尺寸：200px * 200px）
            </span>
            <div
              className={styles.logoWrap}
              onClick={() => {
                this.openImg();
              }}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </div>
            <FormItem>
              {getFieldDecorator('brandPicture', {
                initialValue: isAdd ? null : initValue.brandPicture,
                rules: [{ required: true, message: '品牌logo不能为空' }],
              })(<Input style={{ display: 'none' }} />)}
            </FormItem>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button htmlType="submit" type="primary" loading={isAdd ? addLoading : editLoading}>
              保存
            </Button>
          </div>
        </Form>
        <SelectImage
          visible={imgVisible}
          onCancel={() => this.setState({ imgVisible: false })}
          onOk={imgArr => {
            this.changeImage(imgArr);
          }}
          multiple={false}
        />
      </Drawer>
    );
  }
}
export default AddBrand;
