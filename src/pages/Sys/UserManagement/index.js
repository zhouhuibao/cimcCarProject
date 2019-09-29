import React, { Component } from 'react';
import { Button, Input, Table, Popconfirm, message, Icon } from 'antd';
import { connect } from 'dva';
import AddUser from './AddUser';
import { isUrl } from '@/utils/utils';

const { Search } = Input;
@connect(({ usermangmentModel, loading }) => ({
  usermangmentModel,
  addUserLoading: loading.effects['usermangmentModel/addUser'],
  updateUserLoading: loading.effects['usermangmentModel/updateUser'],
  getUserListLoading: loading.effects['usermangmentModel/getUserList'],
  // myExecuteloading: loading.effects['completedTaskModel/queryMyExecuteTask'],
}))
class UserManagement extends Component {
  state = {
    userInfo: {},
    columns: [
      {
        title: '头像',
        dataIndex: 'photo',
        render: text => {
          return isUrl(text) ? <img src={text} alt="头像" /> : <Icon type="picture" />;
        },
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
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
        dataIndex: 'statusName',
      },
      {
        title: '注册时间',
        dataIndex: 'addTime',
      },
      {
        title: '操作',
        width: 180,
        align: 'center',
        render: (text, record) => {
          return (
            <>
              <a>关联信息</a>
              &ensp; &ensp;
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

  openEdit = record => {
    this.setState({
      visible: true,
      isEdit: true,
      userInfo: record,
    });
  };

  searchUser = value => {
    console.log(value);
    const obj = {
      search: value,
    };
    this.getUserList(obj);
  };

  handleSubmit = ref => {
    console.log(ref);
    const { validateFields } = ref.current;
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

        console.log(dataObj);
        return;

        if (isEdit) {
          dataObj.user.id = userInfo.id;
          this.submitEditUser(dataObj);
        } else {
          this.submitAddUser(dataObj);
        }
      }
    });
  };

  render() {
    const { columns, dataSource, visible, isEdit, userInfo } = this.state;
    const { getUserListLoading, addUserLoading, updateUserLoading } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', marginBottom: 20 }}>
          <Button type="primary" onClick={() => this.setState({ visible: true, isEdit: false })}>
            添加用户
          </Button>
          <div style={{ flex: 1, marginLeft: 100 }}>
            <Search
              placeholder="请输入用户名或手机号"
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
        <AddUser
          visible={visible}
          isEdit={isEdit}
          onClose={() => this.setState({ visible: false })}
          onOk={ref => {
            this.handleSubmit(ref);
          }}
          userInfo={userInfo}
          addLoading={addUserLoading}
          editLoading={updateUserLoading}
        />
      </div>
    );
  }
}
export default UserManagement;
