import React, { Component } from 'react';
import { Drawer, Form, Button, Input, Select } from 'antd';
import { connect } from 'dva';
import styles from '../../../goodsStyles.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ specificationsModel }) => ({
  specificationsModel,
}))
@Form.create()
class AddBasic extends Component {
  state = {
    options: [{ label: '次卡类型', value: 0, id: '666x' }],
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

  render() {
    const {
      onClose,
      visible,
      title,
      form: { getFieldDecorator },
      isEdit,
      initValue,
    } = this.props;
    const { options, dataList } = this.state;
    console.log(dataList);
    return (
      <Drawer title={title} width="500" onClose={onClose} visible={visible}>
        <Form onSubmit={this.handleSubmit} className={styles.AddGoodsData}>
          <div>
            系统类型
            <FormItem>
              {getFieldDecorator('type', {
                initialValue: isEdit ? initValue.name : null,
                rules: [{ required: true, message: '请选择系统类型' }],
              })(
                <Select placeholder="请选择系统类型">
                  {options.map(item => {
                    return (
                      <Option key={item.id} value={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </FormItem>
          </div>
          <div>
            物料名称
            <FormItem>
              {getFieldDecorator('name', {
                initialValue: isEdit ? initValue.remark : null,
              })(<Input placeholder="基础物料名称，如 积分、预存款、经验值、佣金等等" />)}
            </FormItem>
          </div>

          <div>
            物料价格
            <FormItem>
              {getFieldDecorator('price', {
                initialValue: isEdit ? initValue.remark : null,
              })(<Input placeholder="基础物料的价格" suffix="元" />)}
            </FormItem>
          </div>
          <div>
            物料描述
            <FormItem>
              {getFieldDecorator('remark', {
                initialValue: isEdit ? initValue.remark : null,
              })(<TextArea placeholder="请输入物料描述" autosize={{ minRows: 4, maxRows: 8 }} />)}
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
            <Button htmlType="submit" type="primary">
              保存
            </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
export default AddBasic;
