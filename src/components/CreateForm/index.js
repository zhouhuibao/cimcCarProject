import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Input,
  Select,
  TimePicker,
  DatePicker,
  Form,
  Row,
  Col,
  Radio,
  InputNumber,
  Switch,
  Cascader,
  Checkbox,
  TreeSelect,
} from 'antd';
import UploadImg from '@/components/UploadImg';
import SelectImage from '@/components/SelectImage';
import MapAddress from '@/components/MapAddress';
import { isEmpty } from '@/utils/utils';
import city from '@/utils/city.json';
import styles from './style.less';

console.log(city);

const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()
@connect(({ common }) => ({
  common,
}))
class TextPage extends Component {
  state = {};

  isObject = data => {
    if (typeof data === 'object' && data != null) {
      return true;
    }
    return false;
  };

  placeholderType = type => {
    let str = '';
    if (
      type === 'select' ||
      type === 'Time' ||
      type === 'selectCity' ||
      type === 'DatePicker' ||
      type === 'MonthPicker' ||
      type === 'RangePicker' ||
      type === 'WeekPicker'
    ) {
      str = '请选择';
    } else if (type === 'text' || type === 'number' || type === 'password' || type === 'textArea') {
      str = '请输入';
    }
    return str;
  };

  setFormItemDom = props => {
    const domAttrObj = {
      placeholder: ` ${this.placeholderType(props.domType)}${props.title}`,
      ...props.domAttr,
    };
    const {
      form: { getFieldDecorator },
    } = this.props;
    switch (props.domType) {
      case 'text':
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<Input {...domAttrObj} />);
      case 'password':
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<Input.Password {...domAttrObj} />);
      case 'number':
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<InputNumber {...domAttrObj} />);
      case 'textArea':
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<TextArea autosize={{ minRows: 4, maxRows: 8 }} {...domAttrObj} />);
      case 'switch':
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<Switch {...domAttrObj} />);
      case 'selectCity':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(
          <Cascader {...domAttrObj} options={city.data} />,
        );
      case 'Cascader':
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<Cascader {...domAttrObj} options={props.options} />);
      case 'TreeSelect':
        console.log(props);
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<TreeSelect {...domAttrObj} treeData={props.options} />);
      case 'radio':
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<Radio.Group options={props.options} {...domAttrObj} />);
      case 'checkbox':
        console.log(props.defaultValue);
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(<Checkbox.Group options={props.options} {...domAttrObj} />);
      case 'img':
        console.log(props.multiple || false);
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(
          <SelectImage
            multiple={props.multiple || false}
            defaultValues={props.defaultValue}
            customShowDom={props.customShowDom}
            onOk={imgList => {
              this.imgOk(imgList, props.id);
            }}
          />,
        );
      case 'map':
        return getFieldDecorator(props.id, {
          initialValue: props.defaultValue,
          ...props.fieldAttr,
        })(
          <MapAddress
            defaultValues={props.defaultValue}
            selected={record => {
              this.imgOk(record, props.id);
            }}
          />,
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
        return getFieldDecorator(props.id, {
          ...props.fieldAttr,
          initialValue: props.defaultValue,
        })(
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
      case 'TimePicker':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(
          <TimePicker {...domAttrObj} style={{ width: '100%' }} />,
        );

      case 'upload':
        return getFieldDecorator(props.id, { ...props.fieldAttr })(<UploadImg {...domAttrObj} />);

      default:
        break;
    }

    return null;
  };

  // getCol=(item)=>{
  //   if(){

  //   }
  // }

  imgOk = (list, id) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      [id]: list,
    });
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
      <>
        <Row gutter={16} className={styles.formWrapper}>
          {bigArr.map((divItem, i) => {
            return (
              <div key={i} className="clearfix">
                {divItem.map((item, j) => {
                  return (
                    <Col className="gutter-row" span={isEmpty(item.col) ? item.col : 12} key={j}>
                      {/* <Col className="gutter-row" span={item.domType === 'upload' || item.domType===' ' ||  item.domType==='Radio' ? 24 : 12} key={j}> */}
                      <div className={styles.itemWrap}>
                        <p
                          className={styles.itemLabel}
                          style={{ width: isEmpty(item.labelWidth) ? `${item.labelWidth}px` : 80 }}
                        >
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
                          <FormItem>
                            {this.setFormItemDom(item)}
                            {isEmpty(item.tips) ? (
                              <span className="ant-form-text">{item.tips}</span>
                            ) : null}
                          </FormItem>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </div>
            );
          })}
        </Row>
      </>
    );
  }
}

export default TextPage;
