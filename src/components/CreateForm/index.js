import React, { Component } from 'react';
import { Input, Select, DatePicker, Form, Row, Col,Radio } from 'antd';
import UploadImg from '@/components/UploadImg';
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
        return getFieldDecorator(props.id, {initialValue: props.defaultValue, ...props.fieldAttr })(<Input {...domAttrObj} />);
      case 'TextArea':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(
          <TextArea autosize={{ minRows: 4, maxRows: 8 }} {...domAttrObj} />,
        );
      case 'Radio':
        return getFieldDecorator(props.id, {initialValue: props.defaultValue, ...props.fieldAttr })(
          <Radio.Group options={props.options} {...domAttrObj} />
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
      case 'upload':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(<UploadImg {...domAttrObj} />);
  
      default:
        break;
    }

    return null;
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
        {bigArr.map((divItem, i) => {
          return (
            <div key={i} className="clearfix">
              {divItem.map((item, j) => {
                return (
                  <Col className="gutter-row" span={item.domType === 'upload' || item.domType==='TextArea' ||  item.domType==='Radio' ? 24 : 12} key={j}>
                    <div className={styles.itemWrap}>
                      <p className={styles.itemLabel}>
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
                      <div className={styles.itemContent}>
                        <FormItem>{this.setFormItemDom(item)}</FormItem>
                      </div>
                    </div>
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
