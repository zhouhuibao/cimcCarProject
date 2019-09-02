import React, { Component } from 'react';
import { Input, Select, DatePicker, Form, Row, Col } from 'antd';
import { MathRandom } from '@/utils/utils';
import styles from './style.less';

const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()
class TextPage extends Component {
  state = {};

  isObject = data => {
    if (typeof data === 'object' && data != null) {
      return true;
    }
    return false;
  };

  setFormItemDom = props => {
    const domAttrObj = {
      placeholder: `请输入${props.title}`,
      ...props.domAttr,
    };
    const {
      form: { getFieldDecorator },
    } = this.props;
    switch (props.domType) {
      case 'text':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(<Input {...domAttrObj} />);
      case 'TextArea':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(
          <TextArea autosize={{ minRows: 4, maxRows: 8 }} {...domAttrObj} />,
        );
      case 'select': {
        let propsObj = {};
        if (!this.isObject(props.optionsObj)) {
          propsObj = {
            key: 'key',
            value: 'value',
          };
        } else {
          propsObj = {
            ...props.optionsObj,
          };
        }
        return getFieldDecorator(props.id, { ...props.fieldAttr })(
          <Select {...domAttrObj} allowClear>
            {props.options.map(domItem => {
              return (
                <Option key={domItem[propsObj.value]} value={domItem[propsObj.value]}>
                  {domItem[propsObj.key]}
                </Option>
              );
            })}
          </Select>,
        );
      }

      case 'DatePicker':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(
          <DatePicker {...domAttrObj} style={{ width: '100%' }} />,
        );
      case 'RangePicker':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(<RangePicker {...domAttrObj} />);
      case 'MonthPicker':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(<MonthPicker {...domAttrObj} />);
      case 'WeekPicker':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(<WeekPicker {...domAttrObj} />);

      default:
        break;
    }
  };

  render() {
    const { formData } = this.props;
    // 把传过来的一维数组转成二位数组
    const bigArr = [];
    for (let i = 0; i < formData.length; i += 2) {
      const arr = [];
      for (let j = 0; j < 2; j += 1) {
        if (formData[j + i] !== undefined) {
          arr.push(formData[j + i]);
        }
      }
      bigArr.push(arr);
    }
    return (
      <Row gutter={16} className={styles.formWrapper}>
        {bigArr.map(divItem => {
          return (
            <div key={MathRandom()} className="clearfix">
              {divItem.map(item => {
                return (
                  <Col className="gutter-row" span={12} key={MathRandom()}>
                    <p style={{ marginBottom: 5 }}>
                      {item.required ? (
                        <span
                          style={{
                            color: 'red',
                          }}
                        >
                          *
                        </span>
                      ) : null}

                      {item.title}
                    </p>
                    <FormItem>{this.setFormItemDom(item)}</FormItem>
                  </Col>
                );
              })}
            </div>
          );
        })}
      </Row>
    );
  }
}

export default TextPage;
