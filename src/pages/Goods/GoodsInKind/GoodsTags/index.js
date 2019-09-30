import React, { Component } from 'react';
import { Button, Table, Input, Icon, Popconfirm, Tag, message } from 'antd';
import { connect } from 'dva';
import AddTag from './AddTag';
// import zhifubao from '@/assets/svg/zhifubao.svg'
import styles from '../../goodsStyles.less';

const { Search } = Input;

@connect(({ tagModel, loading }) => ({
  tagModel,
  listLoading: loading.effects['tagModel/queryeGoodsLabel'],
  addLoading: loading.effects['tagModel/addGoodsLabel'],
  editLoading: loading.effects['tagModel/updateGoodsLabel'],
}))
class GoodsTags extends Component {
  constructor(props) {
    super(props);
    this.tagRef = React.createRef();
  }

  state = {
    total: 0,
    page: 1,
    visible: false,
    isEdit: false,
    editData: {},
    columns: [
      {
        title: '标签名称',
        dataIndex: 'labelName',
        render: (text, record) => {
          return (
            <Tag
              color={record.labelFont}
              style={{ background: record.labelColor, color: record.labelFont }}
            >
              {text}
            </Tag>
          );
        },
      },
      {
        title: '标签描述',
        dataIndex: 'remark',
      },
      {
        title: '添加时间',
        dataIndex: 'addTime',
        width: 170,
      },
      {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center',
        width: 150,
        render: (text, record) => {
          return (
            <div>
              <Icon
                type="edit"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.clickEdit(record);
                }}
              />
              &ensp;
              <Popconfirm
                title="确定删除该标签?"
                onConfirm={() => {
                  this.deleteTableDate(record);
                }}
                okText="确定"
                cancelText="取消"
              >
                <Icon type="delete" />
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    dataSource: [],
  };

  componentDidMount() {
    this.getTagList();
  }

  deleteTableDate = record => {
    const { dispatch } = this.props;
    console.log(record);
    dispatch({
      type: 'tagModel/deleteGoodsLabel',
      payload: { id: record.id },
      callBack: res => {
        if (res.success) {
          message.success('删除成功');
          this.getTagList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  // 获取标签列表
  getTagList = str => {
    const { dispatch } = this.props;
    const { page } = this.state;
    const data = {
      pageSize: 10,
      pageNum: page,
      labelName: str,
    };
    dispatch({
      type: 'tagModel/queryeGoodsLabel',
      payload: data,
      callBack: res => {
        console.log(res);
        if (res.success) {
          this.setState({
            dataSource: res.data.rows || [],
            total: res.data.total,
          });
        } else {
          message.error(res.message);
        }
      },
    });
  };

  changeHandler = color => {
    console.log(color);
  };

  addGoodsTag = () => {
    this.setState({
      isEdit: false,
      visible: true,
    });
  };

  clickEdit = record => {
    this.setState({
      isEdit: true,
      visible: true,
      editData: record,
    });
  };

  closeAdd = () => {
    this.setState({
      visible: false,
    });
  };

  // 提交添加
  submitAdd = obj => {
    console.log(obj);
    const { dispatch } = this.props;
    dispatch({
      type: 'tagModel/addGoodsLabel',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('添加标签成功');
          this.getTagList();
          this.setState({
            visible: false,
          });
        } else {
          message.error(res.message);
        }
      },
    });
  };

  // 提交修改
  submitEdit = obj => {
    const { editData } = this.state;
    obj.goodsLabel.id = editData.id;
    const { dispatch } = this.props;
    dispatch({
      type: 'tagModel/updateGoodsLabel',
      payload: obj,
      callBack: res => {
        if (res.success) {
          message.success('修改标签成功');
          this.getTagList();
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
    const { validateFields } = this.tagRef.current;
    validateFields((err, values) => {
      console.log(e);
      if (!err) {
        const obj = {
          goodsLabel: {
            ...values,
            ...e,
          },
        };
        const { isEdit } = this.state;
        if (isEdit) {
          this.submitEdit(obj);
        } else {
          this.submitAdd(obj);
        }
      }
    });
  };

  render() {
    const { columns, dataSource, editData, visible, isEdit, total, page } = this.state;
    const { addLoading, editLoading, listLoading } = this.props;
    const pageObj = {
      current: page,
      pageSize: 10,
      total,
      onChange: pages => {
        this.setState(
          {
            page: pages,
          },
          () => {
            this.getTagList();
          },
        );
      },
    };
    return (
      <div className={styles.goodsBrand}>
        <div className={styles.goodsBrandHeader}>
          <div className={styles.addBtn}>
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                this.addGoodsTag();
              }}
            >
              新增标签
            </Button>
          </div>
          <div className={styles.search}>
            <Search
              placeholder="请输入标签名称"
              onSearch={value => this.getTagList(value)}
              enterButton
            />
          </div>
        </div>
        {/* <img src={zhifubao} alt="" />
        <Icon component={zhifubao} />
        <svg xmlns={zhifubao} version="1.1" height="190" /> */}
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          loading={listLoading}
          pagination={pageObj}
        />

        <AddTag
          visible={visible}
          isEdit={isEdit}
          initValue={editData}
          addLoading={addLoading}
          editLoading={editLoading}
          ref={this.tagRef}
          onClose={() => {
            this.closeAdd();
          }}
          onOk={e => {
            this.onOk(e);
          }}
        />
      </div>
    );
  }
}
export default GoodsTags;
