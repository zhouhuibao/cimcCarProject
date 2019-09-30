import React, { Component } from 'react';
import { Drawer, Form, Button, Input } from 'antd';
import { connect } from 'dva';
import ColorPicker from 'rc-color-picker';
import styles from '../../goodsStyles.less';
import 'rc-color-picker/assets/index.css';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
@connect(({ specificationsModel }) => ({
  specificationsModel,
}))
class AddTag extends Component {
  state = {
    tagColor: '#e91313',
    fontColor: '#fff',
    tagName: '',
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

  changeHandler = (color, type) => {
    this.setState({
      [type]: color.color,
    });
  };

  changeTagName = e => {
    this.setState({
      tagName: e.target.value,
    });
  };

  afterVisibleChange = e => {
    const { isEdit, initValue } = this.props;
    if (e) {
      if (isEdit) {
        this.setState({
          fontColor: initValue.labelFont,
          tagColor: initValue.labelColor,
          tagName: initValue.labelName,
        });
      } else {
        this.setState({
          tagColor: '#e91313',
          fontColor: '#fff',
          tagName: '',
        });
      }
    }
  };

  render() {
    const {
      onClose,
      visible,
      form: { getFieldDecorator },
      isEdit,
      initValue,
      onOk,
      editLoading,
      addLoading,
    } = this.props;
    const { tagColor, fontColor, tagName } = this.state;

    const colorObj = {
      labelFont: fontColor,
      labelColor: tagColor,
    };

    return (
      <Drawer
        afterVisibleChange={e => {
          this.afterVisibleChange(e);
        }}
        destroyOnClose
        title={isEdit ? '修改标签' : '新增标签'}
        width="500"
        onClose={onClose}
        visible={visible}
      >
        <Form
          onSubmit={() => {
            onOk(colorObj);
          }}
          className={styles.AddTag}
        >
          <div className={styles.tagFormItem} style={{ marginBottom: 24 }}>
            <div className={styles.label}>预览最终结果</div>
            <div className={styles.content}>
              <span style={{ color: fontColor, background: tagColor }} className="ant-tag">
                {tagName}
              </span>
            </div>
          </div>
          <div className={styles.tagFormItem}>
            <div className={styles.label}>
              <span style={{ color: 'red' }}>*</span> 标签名称
            </div>
            <div className={styles.content}>
              <FormItem>
                {getFieldDecorator('labelName', {
                  initialValue: isEdit ? initValue.labelName : null,
                  rules: [{ required: true, message: '标签名称不能为空' }],
                })(<Input placeholder="请输入标签名称" onChange={this.changeTagName} />)}
              </FormItem>
            </div>
          </div>
          <div className={styles.tagFormItem}>
            <div className={styles.label}>标签说明</div>
            <div className={styles.content}>
              <FormItem>
                {getFieldDecorator('remark', {
                  initialValue: isEdit ? initValue.remark : null,
                })(<TextArea placeholder="请输入标签说明" autosize={{ minRows: 4, maxRows: 8 }} />)}
              </FormItem>
            </div>
          </div>
          <div className={styles.tagFormItem} style={{ marginBottom: 24 }}>
            <div className={styles.label}>标签颜色</div>
            <div className={styles.content}>
              <ColorPicker
                animation="slide-up"
                color={tagColor}
                onChange={color => {
                  this.changeHandler(color, 'tagColor');
                }}
              />
            </div>
          </div>
          <div className={styles.tagFormItem} style={{ marginBottom: 24 }}>
            <div className={styles.label}>字体颜色</div>
            <div className={styles.content}>
              <ColorPicker
                animation="slide-up"
                color={fontColor}
                onChange={color => {
                  this.changeHandler(color, 'fontColor');
                }}
              />
            </div>
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
            <Button htmlType="submit" type="primary" loading={isEdit ? editLoading : addLoading}>
              保存
            </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
export default AddTag;
