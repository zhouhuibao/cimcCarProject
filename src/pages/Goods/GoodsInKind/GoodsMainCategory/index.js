import React, { Component, Fragment } from 'react';
import { Input, InputNumber, Icon, Button, Table, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import AddCategory from './AddCategory';
import SpecificationOrDataModal from './SpecificationOrDataModal';
import { isEmpty } from '@/utils/utils';

@connect(({ mainCategoryModel, loading, common }) => ({
  mainCategoryModel,
  common,
  addLoading: loading.effects['mainCategoryModel/addGoodsCategory'],
  listLoading: loading.effects['mainCategoryModel/queryGoodsCategory'],
}))
class GoodsMainCategory extends Component {
  constructor(props) {
    super(props);
    this.categoryRefs = React.createRef();
  }

  state = {
    total: 0,
    page: 1,
    topLevel: true,
    editData: {},
    initValue: {},
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
                      this.openRelation('关联参数', record);
                    }}
                  >
                    关联参数
                  </a>
                  <a
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      this.openRelation('关联规格', record);
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

  // 获取主目录列表
  getMainCategoryList = () => {
    const { dispatch } = this.props;
    const { page } = this.state;
    const data = {
      pageSize: 10,
      pageNum: page,
    };
    dispatch({
      type: 'mainCategoryModel/queryGoodsCategory',
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
        level: record.level,
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
        level: record.level,
      };
      this.submitEdit(obj);
    }
  };

  // 修改分类
  submitEdit = values => {
    console.log(values);
    const obj = {
      goodsCategory: {
        ...values,
      },
    };

    const { dispatch } = this.props;
    dispatch({
      type: 'mainCategoryModel/updateGoodsCategory',
      payload: obj,
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

  openRelation = (str, record) => {
    this.setState({
      SpecificationOrDataVisible: true,
      initValue: record,
      isDataModal: str === '关联参数' || false,
    });
  };

  submitAddCategory = obj => {
    const { dispatch } = this.props;
    const paramsObj = {
      goodsCategory: {
        ...obj,
      },
    };

    dispatch({
      type: 'mainCategoryModel/addGoodsCategory',
      payload: paramsObj,
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
        values.level = topLevel ? 0 : editData.level + 1;
        this.submitAddCategory(values);
      }
    });
  };

  onOk = arr => {
    if (arr.length <= 0) {
      message.warning('请至少选择一个参数或规格');
      return;
    }

    const { dispatch } = this.props;
    const { isDataModal, initValue } = this.state;

    const submitType = isDataModal ? 'updateCategoryParam' : 'updateCategorySpecs';
    const obj = {
      categId: initValue.id,
    };

    const goodsCategoryParam = [];
    arr.forEach(item => {
      const itemObj = {};
      if (item.chosen === 1) {
        itemObj.id = item[isDataModal ? 'goodsCategoryParam' : 'goodsCategorySpecs'].id;
      } else {
        itemObj.id = '';
      }
      itemObj.categId = initValue.id;
      if (!isDataModal) {
        itemObj.specType = item.specType;
      }
      itemObj[isDataModal ? 'paramId' : 'specId'] = item.id;
      goodsCategoryParam.push(itemObj);
    });

    obj[isDataModal ? 'goodsCategoryParam' : 'goodsCategorySpecs'] = goodsCategoryParam;

    dispatch({
      type: `mainCategoryModel/${submitType}`,
      payload: obj,
      callBack: res => {
        if (res.success) {
          message.success('关联成功');
          this.setState({
            SpecificationOrDataVisible: false,
          });
          this.getMainCategoryList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  render() {
    const {
      categoryVisible,
      isDataModal,
      SpecificationOrDataVisible,
      columns,
      dataSource,
      total,
      page,
      initValue,
    } = this.state;
    const { addLoading, listLoading } = this.props;
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
            this.getMainCategoryList();
          },
        );
      },
    };

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
          loading={listLoading}
          pagination={pageObj}
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
          initValue={initValue}
          onOk={arr => {
            this.onOk(arr);
          }}
          visible={SpecificationOrDataVisible}
          onClose={() => this.setState({ SpecificationOrDataVisible: false })}
        />
      </Fragment>
    );
  }
}
export default GoodsMainCategory;
