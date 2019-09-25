import React, { Component } from 'react';
import { Modal, Form, TreeSelect } from 'antd';
import typeData from './goodsManagement.json';
import { isEmpty } from '@/utils/utils';

const { SHOW_PARENT } = TreeSelect;
const FormItem = Form.Item;
@Form.create()
class OperationModal extends Component {
  state = {
    treeData: typeData,
  };

  componentDidMount() {
    // const {treeData} = this.state;
    // this.setTypeData(treeData)
    // this.setState({
    //     treeData:this.setTypeData(treeData)
    // },()=>{
    //     console.log(this.state)
    // })
  }

  setTypeData = treeData => {
    treeData.forEach(item => {
      if (isEmpty(item.children)) {
        this.setTypeData(item.children);
      } else {
        item.key = item.id;
        item.value = item.id;
        item.title = item.label;
      }
    });
    return treeData;
  };

  onChange = value => {
    console.log('onChange ', value);
  };

  setUpdataDom = title => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { treeData } = this.state;
    const tProps = {
      treeData,
      onChange: this.onChange,
      treeCheckable: true,
      treeNodeFilterProp: 'id',
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: '100%',
      },
    };
    switch (title) {
      case '更改商品分类':
        return (
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<TreeSelect {...tProps} />)}
          </FormItem>
        );
      case '更改运费模板':
        return <span>更改运费模板</span>;
      case '打标签':
        return <span>打标签</span>;
      default:
        break;
    }

    return null;
  };

  render() {
    const { visible, title, onOk, onCancel } = this.props;
    return (
      <Form onSubmit={onOk} className="login-form">
        <Modal visible={visible} title={title} onOk={onOk} onCancel={onCancel}>
          <FormItem>{this.setUpdataDom(title)}</FormItem>
        </Modal>
      </Form>
    );
  }
}
export default OperationModal;
