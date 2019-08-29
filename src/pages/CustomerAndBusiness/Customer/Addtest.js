import React, { Component } from 'react';
import { Button, Form } from 'antd';
import FormItemDom from '@/components/CreateForm';

@Form.create()
class AddTest extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    formItemData: [
      {
        domType: 'text',
        id: 'controlsId',
        title: '客户名称',
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请输入客户名称',
            },
          ],
        },
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'select',
        id: 'approvalStatus',
        title: '客户级别',
        domAttr: {
          placeholder: '请选择客户级别',
          onChange: e => {
            console.log(e);
          },
        },
        fieldAttr: {},
        options: [
          {
            key: '重要客户',
            value: '0',
          },
          {
            key: '普通客户',
            value: '1',
          },
          {
            key: '一般客户',
            value: '2',
          },
        ],
      },
      {
        domType: 'select',
        id: 'approvalStatus1',
        title: '来源',
        domAttr: {
          placeholder: '请选择来源',
        },
        fieldAttr: {},
        options: [
          {
            key: '转介绍',
            value: '0',
          },
          {
            key: '线上注册',
            value: '1',
          },
          {
            key: '线上咨询',
            value: '2',
          },
        ],
      },
      {
        domType: 'select',
        id: 'approvalStatus2',
        title: '1级行业',
        domAttr: {
          placeholder: '请选择1级行业',
        },
        fieldAttr: {},
        options: [
          {
            key: '金融业',
            value: '0',
          },
          {
            key: '房地产',
            value: '1',
          },
          {
            key: '交通',
            value: '2',
          },
        ],
      },
      {
        domType: 'select',
        id: 'approvalStatus23',
        title: '2级行业',
        domAttr: {
          placeholder: '请选择2级行业',
        },
        fieldAttr: {},
        options: [
          {
            key: '金融业',
            value: '0',
          },
          {
            key: '房地产',
            value: '1',
          },
          {
            key: '交通',
            value: '2',
          },
        ],
      },
      {
        domType: 'text',
        id: 'constructionUserName1',
        title: '电话',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'text',
        id: 'constructionUserName2',
        title: '邮箱',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'text',
        id: 'constructionUserName3',
        title: '传真',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'TextArea',
        id: 'constructionUserName4',
        title: '网址',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
      {
        domType: 'TextArea',
        id: 'constructionUserName5',
        title: '备注',
        domAttr: {},
        fieldAttr: {},
        options: null,
      },
    ],
  };

  handClick = () => {
    console.log('123');
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.formItemRef);
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
        <Form onSubmit={this.handleSubmit}>
          <FormItemDom formData={formItemData} ref={this.formItemRef} />
          <Button htmlType="submit">提交</Button>
        </Form>
        <Button
          onClick={() => {
            this.handClick();
          }}
        >
          按钮
        </Button>
      </div>
    );
  }
}
export default AddTest;
