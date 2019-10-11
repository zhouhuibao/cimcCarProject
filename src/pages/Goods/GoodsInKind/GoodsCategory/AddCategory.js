import React, { Component } from 'react';
import { Drawer, Form, Button, Input, InputNumber } from 'antd';
import { connect } from 'dva';
import SelectImage from '@/components/SelectImage';
import styles from '../../goodsStyles.less';

const FormItem = Form.Item;

@Form.create()
@connect(({ specificationsModel }) => ({
  specificationsModel,
}))
class AddCategory extends Component {
  state = {
    imgVisible: false,
  };

  componentDidMount() {
    console.log('组件已加载');
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  changeImage = imgArr => {
    if (imgArr.length > 0) {
      const {
        form: { setFieldsValue },
      } = this.props;
      setFieldsValue({
        classifyPicture: imgArr[0].url,
      });
    }
    this.setState({
      imgVisible: false,
    });
  };

  render() {
    const {
      onClose,
      visible,
      form: { getFieldDecorator },
      isEdit,
      initValue,
      onOK,
      addLoading,
      classify,
    } = this.props;
    const { imgVisible } = this.state;
    return (
      <Drawer
        title={isEdit ? '修改分类' : '添加分类'}
        width="500"
        onClose={onClose}
        visible={visible}
        destroyOnClose
      >
        <Form onSubmit={onOK} className={styles.AddGoodsData}>
          <div>
            分类名称
            <FormItem>
              {getFieldDecorator(classify ? 'classifyName' : 'categName', {
                initialValue: isEdit ? initValue.categName : null,
                rules: [{ required: true, message: '分类名称不能为空' }],
              })(<Input placeholder="请输入分类名称" />)}
            </FormItem>
          </div>
          <div>
            分类排序
            <FormItem>
              {getFieldDecorator('ordNum', {
                initialValue: isEdit ? initValue.ordNum : null,
                rules: [{ required: true, message: '分类排序不能为空' }],
              })(<InputNumber style={{ width: '100%' }} placeholder="请输入分类排序" min={0} />)}
            </FormItem>
          </div>
          <div>
            <span style={{ fontSize: 14 }}>品牌logo</span>&ensp;&ensp;&ensp;
            <SelectImage
              visible={imgVisible}
              onCancel={() => this.setState({ imgVisible: false })}
              defaultValue={isEdit ? initValue.classifyPicture : null}
              onOk={imgArr => {
                this.changeImage(imgArr);
              }}
              multiple={false}
            />
            <FormItem>
              {getFieldDecorator('classifyPicture', {
                initialValue: isEdit ? initValue.classifyPicture : null,
              })(<span />)}
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
            <Button
              onClose={() => {
                this.closeAdd();
              }}
              style={{ marginRight: 8 }}
            >
              取消
            </Button>
            <Button htmlType="submit" type="primary" loading={addLoading}>
              保存
            </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
export default AddCategory;
