import React, { Component } from 'react';
import { Drawer, Button, Form } from 'antd';
import FormItemDom from '@/components/CreateForm';
import { rules } from '@/utils/utils';

@Form.create()
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    passwordDom: {
      domType: 'password',
      id: 'password',
      required: true,
      title: '密码',
      col: 22,
      domAttr: {},
      fieldAttr: {
        rules: [
          {
            required: true,
            message: '密码不能为空',
          },
        ],
      },
    },
    formItemData: [
      {
        domType: 'text',
        id: 'mobile',
        title: '手机号',
        required: true,
        col: 22,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请输入正确的手机号',
              pattern: rules('mobile'),
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'username',
        required: true,
        title: '会员名',
        col: 22,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '会员名不能为空',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'email',
        title: '邮箱',
        col: 22,
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'text',
        id: 'nickname',
        title: '昵称',
        col: 22,
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'checkbox',
        id: 'userType',
        title: '用户类型',
        col: 22,
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请选择用户类型',
            },
          ],
        },
        options: [
          { label: '员工', value: 'USERTYPE_EMP' },
          { label: '客户', value: 'USERTYPE_CUSTOMER' },
          { label: '经销商', value: 'USERTYPE_DISTRIBUTOR' },
          { label: '服务站', value: 'USERTYPE_SERVICE_STATION' },
          { label: '门店', value: 'USERTYPE_STORE' },
        ],
      },
      {
        domType: 'select',
        id: 'status',
        title: '状态',
        col: 22,
        required: true,
        domAttr: {},
        test: '112',
        defaultValue: 'USERSTATUS_NORMAL',
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请选择状态',
            },
          ],
        },
        options: [
          {
            key: '正常',
            value: 'USERSTATUS_NORMAL',
          },
          {
            key: '锁定',
            value: 'USERSTATUS_LOCK',
          },
          {
            key: '停用',
            value: 'USERSTATUS_CANCEL',
          },
          {
            key: '注销',
            value: 'USERSTATUS_CANCELLATION',
          },
        ],
      },
      {
        domType: 'img',
        id: 'photo',
        title: '头像',
        col: 22,
        domAttr: {},
        fieldAttr: {},
      },
    ],
  };

  afterVisibleChange = visible => {
    if (visible) {
      const { isEdit, userInfo } = this.props;
      const { formItemData, passwordDom } = this.state;
      if (isEdit) {
        // 如果是修改
        console.log(userInfo);
        formItemData.forEach((item, index) => {
          if (item.id === 'password') {
            formItemData.splice(index, 1);
          } else {
            Object.keys(userInfo).forEach(key => {
              if (item.id === key) {
                item.defaultValue = userInfo[key];
              }
            });
          }
        });
        this.setState({
          formItemData,
        });
      } else {
        formItemData.forEach((item, index) => {
          if (item.domType !== 'select') {
            item.defaultValue = null;
          } else {
            item.defaultValue = 'USERSTATUS_NORMAL';
          }
          if (item.id === 'password') {
            formItemData.splice(index, 1);
          }
        });
        formItemData.splice(formItemData.length - 1, 0, passwordDom);
        this.setState({
          formItemData,
        });
      }
    }
  };

  render() {
    const { formItemData } = this.state;
    const { isEdit, onClose, onOk, visible, addLoading, editLoading } = this.props;
    return (
      <Drawer
        title={isEdit ? '修改用户' : '新增用户'}
        width="500"
        destroyOnClose
        onClose={onClose}
        visible={visible}
        afterVisibleChange={e => {
          this.afterVisibleChange(e);
        }}
      >
        <Form
          onSubmit={() => {
            onOk(this.formItemRef);
          }}
        >
          <FormItemDom formData={formItemData} ref={this.formItemRef} />

          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button htmlType="submit" type="primary" loading={isEdit ? editLoading : addLoading}>
              保存
            </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
export default AddUser;
