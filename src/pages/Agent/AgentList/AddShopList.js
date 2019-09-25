import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import FormItemDom from '@/components/CreateForm';

@Form.create()
class AddShopList extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    formItemData: [
      {
        domType: 'select',
        id: 'controlsId',
        title: '选择门店',
        required: true,
        domAttr: {},
        col: 22,
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请选择门店',
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
        domType: 'text',
        id: 'controlsId1',
        title: '店铺名称',
        required: true,
        col: 22,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请输入店铺名称',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'controlsId2',
        title: '联系人',
        col: 22,
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请输入联系人',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'controlsId3',
        title: '联系方式',
        col: 22,
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请输入联系方式',
            },
          ],
        },
      },
      {
        domType: 'selectCity',
        id: 'controlsId4',
        col: 22,
        title: '区域',
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请选择区域',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'controlsId5',
        col: 22,
        title: '详细地址',
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'switch',
        col: 22,
        id: 'controlsId6',
        title: '是否启用',
        domAttr: {},
        fieldAttr: {},
      },
    ],
  };

  componentDidMount() {
    const { formItemData } = this.state;
    const arr = [];
    for (let i = 0; i < 10; i += 1) {
      const obj = {
        name: `门店${i + 1}`,
        id: i,
      };
      arr.push(obj);
    }
    formItemData[0].options = arr;
    this.setState({
      formItemData,
    });
  }

  render() {
    const { formItemData } = this.state;
    const { isEdit, onOk, onCancel, visible } = this.props;
    return (
      <Modal
        title={isEdit ? '修改店铺' : '新增店铺'}
        visible={visible}
        onOk={() => {
          onOk(this.formItemRef);
        }}
        onCancel={onCancel}
      >
        <Form onSubmit={onOk}>
          <FormItemDom formData={formItemData} ref={this.formItemRef} />
        </Form>
      </Modal>
    );
  }
}
export default AddShopList;
