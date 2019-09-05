import React, { Component } from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { dataType, MathRandom } from '@/utils/utils';
import styles from './styles.less';

const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
class SearchComponent extends Component {
  createFormItem = props => {
    const { type } = props;
    switch (type) {
      case 'search':
        return <Search placeholder={props.placeholder} onSearch={props.change} enterButton />;
      case 'select':
        return (
          <Select placeholder={props.placeholder} onChange={props.change} allowClear>
            {props.option.map(item => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        );
      default:
        break;
    }
    return null;
  };

  render() {
    const {
      form: { getFieldDecorator },
      searchData,
    } = this.props;

    return (
      <Form className={styles.searchWrap}>
        <Row gutter={16}>
          {searchData.map(item => {
            return (
              <Col className="gutter-row" sm={{ span: 12 }} lg={{ span: 6 }} key={MathRandom()}>
                <FormItem>{getFieldDecorator(item.id)(this.createFormItem(item))}</FormItem>
              </Col>
            );
          })}
        </Row>
      </Form>
    );
  }
}
export default SearchComponent;
