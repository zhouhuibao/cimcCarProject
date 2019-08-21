import React, {Component, Fragment} from 'react';
import {Input,Select,DatePicker,Form,Row, Col } from 'antd';
import styles from './style.less'


const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()

class TextPage extends Component {

  state={}

  isObject = (data) => {
    if (typeof data === 'object' && data != null) {
      return true
    }
    return false
  }

  setFormItemDom = (props) => {
    const {form:{getFieldDecorator}} = this.props;
    switch (props.domType) {
      case 'text':
        return (
          getFieldDecorator(props.id,
            {...props.fieldAttr}
          )(
            <Input {...props.domAttr} />
          )
        )
      case 'TextArea':
        return (
          getFieldDecorator(props.id,
            {...props.fieldAttr}
          )(
            <TextArea {...props.domAttr} />
          )
        )
      case 'select':{
        let propsObj = {};
        if (!this.isObject(props.optionsObj)) {
          propsObj = {
            key: 'key',
            value: 'value'
          }
        } else {
          propsObj = {
            ...props.optionsObj
          }
        }
        return (
          getFieldDecorator(props.id,
            {...props.fieldAttr}
          )(
            <Select {...props.domAttr} allowClear>
              {props.options.map((domItem) => {
                return (
                  <Option
                    key={domItem[propsObj.value]}
                    value={domItem[propsObj.value]}
                  >{ domItem[propsObj.key]}
                  </Option>
                )
              })}
            </Select>
          )
        );
      }

      case 'DatePicker' :
        return (
          getFieldDecorator(props.id,
            {...props.fieldAttr}
          )(
            <DatePicker {...props.domAttr} style={{width: '100%'}} />
          )
        )
      case 'RangePicker' :
        return (
          getFieldDecorator(props.id,
            {...props.fieldAttr}
          )(
            <RangePicker {...props.domAttr} />
          )
        )
      case 'MonthPicker' :
        return (
          getFieldDecorator(props.id,
            {...props.fieldAttr}
          )(
            <MonthPicker {...props.domAttr} />
          )
        )
        case 'WeekPicker' :
          return (
            getFieldDecorator(props.id,
              {...props.fieldAttr}
            )(
              <WeekPicker {...props.domAttr} />
            )
          )
        
        default:
        break;
    }
  }


  

  render() {
    const {formData} = this.props;

    return(
      <Row gutter={16} className={styles.formWrapper}>
        {
          formData.map((item,i)=>{
            return (
              <Col className="gutter-row" span={12} key={i}>
                <p>
                  {
                    item.required ? 
                    <span style={{
                      color:'red'
                    }}
                    >*
                    </span>
                    : 
                    null
                  }

                  {item.title}
                </p>
                <FormItem>
                  {this.setFormItemDom(item)}
                </FormItem>
              </Col>  
            ) 
          })
        }

      </Row>
      
    )
  }
}

export default TextPage