import React, { Component, Fragment } from 'react';
import { Input, InputNumber, Icon, Button, Table, Popconfirm, message } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import AddCategory from './AddCategory';
import SpecificationOrDataModal from './SpecificationOrDataModal';
import { isEmpty } from '@/utils/utils';

@connect(({ mainCategoryModel, loading }) => ({
  mainCategoryModel,
  addLoading: loading.effects['mainCategoryModel/addGoodsCategory'],
  listLoading: loading.effects['mainCategoryModel/queryGoodsCategory'],
}))
class GoodsMainCategory extends Component {
  constructor(props) {
    super(props);
    this.categoryRefs = React.createRef();
  }

  state = {
    topLevel: true,
    editData: {},
    columns: [
      {
        title: '类目名称',
        dataIndex: 'categName',
        render: (text, record) => {
          return (
            <>
              <Input
                defaultValue={text}
                size="small"
                style={{ width: 120 }}
                onBlur={e => {
                  this.nameBlur(e, record);
                }}
              />
              {record.level < 2 ? (
                <a
                  style={{ marginLeft: 10 }}
                  onClick={() =>
                    this.setState({ categoryVisible: true, topLevel: false, editData: record })
                  }
                >
                  <Icon type="plus" /> 增加子分类
                </a>
              ) : null}
            </>
          );
        },
      },
      {
        title: '类目排序',
        dataIndex: 'ordNum',
        render: (text, record) => {
          return (
            <InputNumber
              size="small"
              style={{ width: 60 }}
              min={0}
              defaultValue={text}
              onBlur={e => {
                this.sortBlur(e, record);
              }}
            />
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'addTime',
        align: 'center',
        render: text => {
          return isEmpty(text) ? text : '---';
        },
      },
      {
        title: '操作',
        align: 'right',
        render: (text, record) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {record.level === 2 ? (
                <>
                  <a
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      this.openRelation('关联参数');
                    }}
                  >
                    关联参数
                  </a>
                  <a
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      this.openRelation();
                    }}
                  >
                    关联规格
                  </a>
                </>
              ) : null}
              <a style={{ marginRight: 10 }}>查看商品</a>
              <Popconfirm
                title="确定删除该分类吗"
                onConfirm={() => {
                  this.delCategory(record);
                }}
                okText="确定"
                cancelText="取消"
              >
                <Icon type="delete" style={{ cursor: 'pointer' }} />
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    dataSource: [],
    categoryVisible: false,
    SpecificationOrDataVisible: false,
    isDataModal: false,
  };

  componentDidMount() {
    this.getMainCategoryList();
    console.log(localStorage.getItem('cityData'));
  }

  getMainCategoryList = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mainCategoryModel/queryGoodsCategory',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          this.setState({
            dataSource: res.data || [],
          });
        } else {
          message.error(res.message);
        }
      },
    });
  };

  // 删除分类
  delCategory = record => {
    console.log(record);
    const { dispatch } = this.props;
    dispatch({
      type: 'mainCategoryModel/deleteGoodsCategory',
      payload: { id: record.id },
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('删除成功');
          this.getMainCategoryList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  // 修改分类排序
  sortBlur = (e, record) => {
    if (Number(e.target.value) !== record.ordNum) {
      const obj = {
        id: record.id,
        categName: record.categName,
        ordNum: e.target.value,
      };
      this.submitEdit(obj);
    }
  };

  // 修改分类名称
  nameBlur = (e, record) => {
    if (e.target.value !== record.categName) {
      const obj = {
        id: record.id,
        categName: e.target.value,
        ordNum: record.ordNum,
      };
      this.submitEdit(obj);
    }
  };

  // 修改分类
  submitEdit = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'mainCategoryModel/updateGoodsCategory',
      payload: values,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('修改成功');
          this.setState({
            categoryVisible: false,
          });
        } else {
          message.error(res.message);
        }
      },
    });
  };

  openRelation = str => {
    this.setState({
      SpecificationOrDataVisible: true,
      isDataModal: str === '关联参数' || false,
    });
  };

  submitAddCategory = obj => {
    const { dispatch } = this.props;

    dispatch({
      type: 'mainCategoryModel/addGoodsCategory',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('添加成功');
          this.getMainCategoryList();
          this.setState({
            categoryVisible: false,
          });
        } else {
          message.error(res.message);
        }
      },
    });
  };

  AddCategory = e => {
    e.preventDefault();
    console.log(this);
    const { validateFields } = this.categoryRefs.current;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        // const {isEdit} = this.state;
        const { topLevel, editData } = this.state;

        if (!topLevel) {
          // 如果不是添加顶级目录
          values.pId = editData.id;
        }
        values.level = editData.level;
        this.submitAddCategory(values);
      }
    });
  };

  render() {
    const {
      categoryVisible,
      isDataModal,
      SpecificationOrDataVisible,
      columns,
      dataSource,
    } = this.state;
    const { addLoading, listLoading } = this.props;

    return (
      <Fragment>
        <Button
          type="primary"
          icon="plus"
          style={{ marginBottom: 10 }}
          onClick={() => this.setState({ categoryVisible: true, topLevel: true })}
        >
          添加顶级目录
        </Button>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={listLoading}
        />

        <AddCategory
          visible={categoryVisible}
          addLoading={addLoading}
          onClose={() => this.setState({ categoryVisible: false })}
          ref={this.categoryRefs}
          onOK={e => {
            this.AddCategory(e);
          }}
        />
        <SpecificationOrDataModal
          type={isDataModal}
          visible={SpecificationOrDataVisible}
          onClose={() => this.setState({ SpecificationOrDataVisible: false })}
        />
      </Fragment>
    );
  }
}
export default GoodsMainCategory;
