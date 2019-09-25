import React, { Component } from 'react';
import {
  PageHeader,
  Form,
  Button,
  Table,
  InputNumber,
  Popconfirm,
  Input,
  Row,
  Col,
  Radio,
} from 'antd';
import { router } from 'umi';
import WeightCalculation from './WeightCalculation';
import NumberOfPieces from './NumberOfPieces';
import AmountCalculation from './AmountCalculation';
import VolumeCalculation from './VolumeCalculation';

import styles from '../../order.less';

class AddFrughtTemplate extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  state = {
    defaultValue1: '自定义运费',
    options1: [
      { label: '自定义运费', value: '自定义运费' },
      { label: '卖家承担运费', value: '卖家承担运费' },
    ],
    options2: [
      { label: '按重量', value: '0' },
      { label: '按件数', value: '1' },
      { label: '按金额', value: '2' },
      { label: '按体积', value: '3' },
    ],
    defaultValue2: '0',
    defaultValue3: '启用',
    options3: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }],
  };

  onChange3 = e => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      defaultValue2: e.target.value,
    });
  };

  setRightDom = type => {
    switch (type) {
      case '0':
        return <WeightCalculation ref={this.formRef} />;
      case '1':
        return <NumberOfPieces ref={this.formRef} />;
      case '2':
        return <AmountCalculation ref={this.formRef} />;
      case '3':
        return <VolumeCalculation ref={this.formRef} />;
      default:
        break;
    }

    return null;
  };

  clickSubmit = () => {
    const {
      current: { validateFields },
    } = this.formRef;

    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    console.log(this);
  };

  render() {
    const {
      options1,
      defaultValue1,
      options2,
      defaultValue2,
      options3,
      defaultValue3,
    } = this.state;
    return (
      <div className={styles.AddFrughtTemplate}>
        <PageHeader onBack={() => router.goBack()} title="新增运费模板" />
        <Row gutter={24}>
          <Col span={8}>
            <div className={styles.item}>
              <div className={styles.label}>模板名称:</div>
              <div className={styles.content}>
                <Input placeholder="请输入模板名称" style={{ width: '100%' }} />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>是否包邮:</div>
              <div className={styles.content}>
                <Radio.Group options={options1} value={defaultValue1} />
                <p>选择了卖家承担运费，运费计算和包邮规则设置将会丢失！</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>计价方式:</div>
              <div className={styles.content}>
                <Radio.Group options={options2} onChange={this.onChange3} value={defaultValue2} />
                <p>运费模版保存后，计费方式将无法切换！！</p>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>是否启用:</div>
              <div className={styles.content}>
                <Radio.Group options={options3} value={defaultValue3} />
              </div>
            </div>
          </Col>
          <Col span={16}>{this.setRightDom(defaultValue2)}</Col>
        </Row>
        <Button
          type="primary"
          onClick={() => {
            this.clickSubmit();
          }}
        >
          保存
        </Button>
      </div>
    );
  }
}
export default AddFrughtTemplate;
