import React, { Component } from 'react';
import { PageHeader, Form, Button } from 'antd';
import { router } from 'umi';
import FormItemDom from '@/components/CreateForm';
import SearchAddress from './SearchAddress';

class Addwxshop extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    formItemData: [
      {
        domType: 'radio',
        id: 'isGN',
        labelWidth: 140,
        col: 16,
        title: '是否是国内门店',
        domAttr: {},
        defaultValue: '0',
        options: [{ label: '国内', value: '0' }, { label: '非国内', value: '1' }],
        fieldAttr: {},
      },
      {
        domType: 'radio',
        id: 'isZY',
        labelWidth: 140,
        col: 16,
        title: '是否是直营店',
        domAttr: {},
        defaultValue: '0',
        options: [{ label: '直营店', value: '0' }, { label: '非直营店', value: '1' }],
        fieldAttr: {},
      },

      {
        domType: 'TimePicker',
        labelWidth: 140,
        id: 'startTime',
        title: '营业开始时间',
        col: 8,
        required: true,
        domAttr: {
          format: 'HH:mm',
        },
        defaultValue: null,
        fieldAttr: {
          rules: [
            {
              message: '请选择营业开始时间',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'TimePicker',
        labelWidth: 140,
        id: 'endTime',
        title: '营业结束时间',
        col: 12,
        required: true,
        domAttr: {},
        defaultValue: null,
        fieldAttr: {
          rules: [
            {
              message: '请选择营业结束时间',
              required: true,
            },
          ],
        },
      },

      {
        domType: 'text',
        labelWidth: 140,
        id: 'phone',
        title: '客服电话',
        col: 16,
        required: true,
        domAttr: {
          placeHolder: '固定电话需加区号；区号、分机号均用“-”连接',
        },
        defaultValue: null,
        fieldAttr: {
          rules: [
            {
              message: '请输入客服电话',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'radio',
        id: 'zhuti',
        labelWidth: 140,
        col: 16,
        title: '经营资质主体',
        domAttr: {},
        defaultValue: '0',
        options: [{ label: '公众账号主体', value: '0' }, { label: '相关主体', value: '1' }],
        fieldAttr: {},
      },
    ],
  };

  clickItem = record => {
    console.log(record);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.formItemRef.current;

    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  render() {
    const { formItemData } = this.state;
    return (
      <div>
        <PageHeader onBack={() => router.goBack()} title="添加门店" className="pageHeaderWrap" />
        <Form onSubmit={this.handleSubmit}>
          <FormItemDom formData={formItemData} ref={this.formItemRef} />
          <div id="container" style={{ width: '400px', height: '400px' }}>
            <SearchAddress
              selected={record => {
                this.clickItem(record);
              }}
            />
          </div>
          <Button
            onClose={() => {
              router.goBack();
            }}
            style={{ marginRight: 8 }}
          >
            取消
          </Button>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form>
      </div>
    );
  }
}
export default Addwxshop;
