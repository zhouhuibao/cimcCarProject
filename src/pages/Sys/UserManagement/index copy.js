import React, { Component } from 'react';
import { Button, Input, Table, Modal, Form, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import FormItemDom from '@/components/CreateForm';
import { rules, isEmpty } from '@/utils/utils';

const { Search } = Input;
@connect(({ usermangmentModel, loading }) => ({
  usermangmentModel,
  addUserLoading: loading.effects['usermangmentModel/addUser'],
  updateUserLoading: loading.effects['usermangmentModel/updateUser'],
  getUserListLoading: loading.effects['usermangmentModel/getUserList'],
  // myExecuteloading: loading.effects['completedTaskModel/queryMyExecuteTask'],
}))
class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    passwordDom: {
      domType: 'password',
      id: 'password',
      title: '密码',
      col: 22,
      domAttr: {},
      fieldAttr: {},
    },
    userInfo: {},
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
    ],
    columns: [
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
      },
      {
        title: '用户状态',
        dataIndex: 'status',
      },
      {
        title: '注册时间',
        dataIndex: 'addTime',
      },
      {
        title: '操作',
        width: 120,
        align: 'center',
        render: (text, record) => {
          return (
            <>
              <a
                onClick={() => {
                  this.openEdit(record);
                }}
              >
                编辑
              </a>
              &ensp; &ensp;
              <Popconfirm
                title="确定要删除该用户吗?"
                onConfirm={() => {
                  this.deleteUser(record.id);
                }}
                okText="确定"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>
            </>
          );
        },
      },
    ],
    dataSource: [],
    isEdit: false,
    visible: false,
  };

  componentDidMount() {
    this.getUserList();
  }

  getUserList = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usermangmentModel/getUserList',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          this.setState({
            dataSource: res.data.rows || [],
          });
        }
      },
    });
  };

  // 删除用户
  deleteUser = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usermangmentModel/deleteUser',
      payload: { id, isDelete: true },
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('用户删除成功');
          this.getUserList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  submitAddUser = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usermangmentModel/addUser',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('用户添加成功');
          this.getUserList();
          this.setState({
            visible: false,
          });
        } else {
          message.error(res.message);
        }
      },
    });
  };

  submitEditUser = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usermangmentModel/updateUser',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('用户修改成功');
          this.getUserList();
          this.setState({
            visible: false,
          });
        } else {
          message.error(res.message);
        }
      },
    });
  };

  onOk = e => {
    console.log(e);
    const { validateFields } = this.formItemRef.current;
    validateFields((err, values) => {
      if (!err) {
        const dataObj = {
          user: {
            ...values,
          },
        };
        const { isEdit, userInfo } = this.state;

        let userTypeStr = '';
        values.userType.forEach((item, i) => {
          if (i === values.userType.length - 1) {
            userTypeStr += item;
          } else {
            userTypeStr += `${item},`;
          }
        });
        dataObj.user.userType = userTypeStr;

        if (isEdit) {
          dataObj.user.id = userInfo.id;
          this.submitEditUser(dataObj);
        } else {
          this.submitAddUser(dataObj);
        }
      }
    });
  };

  openAdd = () => {
    const { formItemData, passwordDom } = this.state;
    formItemData.forEach((item, index) => {
      if (item.domType !== 'select') {
        item.defaultValue = null;
      }
      if (item.id === 'password') {
        formItemData.splice(index, 1);
      }
    });
    formItemData.push(passwordDom);
    this.setState({
      formItemData,
      visible: true,
      isEdit: false,
    });
  };

  openEdit = record => {
    const { formItemData } = this.state;
    formItemData.forEach((item, index) => {
      if (item.id === 'password') {
        formItemData.splice(index, 1);
      } else {
        Object.keys(record).forEach(key => {
          if (item.id === key) {
            item.defaultValue = record[key];
          }
        });
      }
    });

    this.setState({
      formItemData,
      visible: true,
      isEdit: true,
      userInfo: record,
    });
  };

  searchUser = value => {
    if (isEmpty(value)) {
      console.log(value);
      const obj = {
        search: value,
      };
      this.getUserList(obj);
    }
  };

  render() {
    const { columns, dataSource, visible, isEdit, formItemData } = this.state;
    const { getUserListLoading, addUserLoading, updateUserLoading } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', marginBottom: 20 }}>
          <Button
            type="primary"
            onClick={() => {
              this.openAdd();
            }}
          >
            添加用户
          </Button>
          <div style={{ flex: 1, marginLeft: 100 }}>
            <Search
              placeholder="请输入"
              onSearch={value => {
                this.searchUser(value);
              }}
              enterButton
            />
          </div>
        </div>

        <Table
          loading={getUserListLoading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
        />

        <Modal
          destroyOnClose
          visible={visible}
          title={isEdit ? '修改用户' : '添加用户'}
          onOk={() => {
            this.onOk();
          }}
          onCancel={() => this.setState({ visible: false })}
          confirmLoading={isEdit ? updateUserLoading : addUserLoading}
        >
          <Form
            onSubmit={() => {
              this.onOk();
            }}
          >
            <FormItemDom formData={formItemData} ref={this.formItemRef} />
          </Form>
        </Modal>
      </div>
    );
  }
}
export default UserManagement;
