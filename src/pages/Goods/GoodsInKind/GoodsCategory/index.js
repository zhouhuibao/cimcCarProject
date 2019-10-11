import React, { Component } from 'react';
import { Table, Icon, Input, InputNumber, Button, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import AddCategory from './AddCategory';
import SelectImage from '@/components/CustomSelectImage';

import { isEmpty, showImg } from '@/utils/utils';

@connect(({ categoryModel, loading }) => ({
  categoryModel,
  addCategoryLoading: loading.effects['categoryModel/addGoodsClassify'],
  editCategoryLoading: loading.effects['categoryModel/updateGoodsClassify'],
  queryGoodsClassifyLoading: loading.effects['categoryModel/queryGoodsClassify'],
  // myExecuteloading: loading.effects['completedTaskModel/queryMyExecuteTask'],
}))
class GoodsCategory extends Component {
  constructor(props) {
    super(props);
    this.categoryRef = React.createRef();
  }

  state = {
    imageVisible: false,
    topLevel: true,
    page: 1,
    total: 0,
    editData: {},
    columns: [
      {
        title: '分类名称',
        dataIndex: 'classifyName',
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
              {record.level === 0 ? (
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
        title: '分类排序',
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
        title: '图片',
        dataIndex: 'classifyPicture',
        render: (text, record) => {
          return isEmpty(text) ? (
            <img
              src={showImg(text)}
              style={{ width: 40, height: 40 }}
              alt="分类图片"
              onClick={() => {
                this.showImg(record);
              }}
            />
          ) : (
            <Icon
              type="picture"
              onClick={() => {
                this.showImg(record);
              }}
            />
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'addTime',
      },
      {
        title: '操作',
        dataIndex: 'edit',
        width: 130,
        align: 'center',
        render: (text, record) => {
          return (
            <div>
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
    initValue: {},
    data: [],
    categoryVisible: false,
    isEditCategory: false,
  };

  componentDidMount() {
    this.getGoodsClassifyList();
  }

  // 获取分类列表
  getGoodsClassifyList = () => {
    const { dispatch } = this.props;
    const { page } = this.state;
    const data = {
      pageSize: 10,
      pageNum: page,
    };
    dispatch({
      type: 'categoryModel/queryGoodsClassify',
      payload: data,
      callBack: res => {
        this.setState({
          data: res.data.rows || [],
        });
      },
    });
  };

  // 删除分类
  delCategory = record => {
    console.log(record);
  };

  // 修改分类排序
  sortBlur = (e, record) => {
    if (Number(e.target.value) !== record.ordNum) {
      const obj = {
        goodsClassify: {
          pId: record.pId,
          id: record.id,
          classifyName: record.classifyName,
          classifyPicture: record.classifyPicture,
          ordNum: e.target.value,
          level: record.level,
        },
      };
      this.submitEdit(obj);
    }
  };

  // 修改分类名称
  nameBlur = (e, record) => {
    if (e.target.value !== record.classifyName) {
      const obj = {
        goodsClassify: {
          pId: record.pId,
          id: record.id,
          classifyName: e.target.value,
          classifyPicture: record.classifyPicture,
          ordNum: record.ordNum,
          level: record.level,
        },
      };
      this.submitEdit(obj);
    }
  };

  // 打开选择图片组件
  showImg = record => {
    console.log(record);
    this.setState({
      imageVisible: true,
      initValue: record,
    });
  };

  // 添加分类
  submitAdd = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'categoryModel/addGoodsClassify',
      payload: values,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('分类添加成功');
          this.setState({
            categoryVisible: false,
          });
          this.getGoodsClassifyList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  // 修改分类
  submitEdit = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'categoryModel/updateGoodsClassify',
      payload: values,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('分类修改成功');
          this.getGoodsClassifyList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  // 校验
  submitCategory = e => {
    e.preventDefault();
    const { validateFields } = this.categoryRef.current;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const { topLevel, editData } = this.state;
        if (!topLevel) {
          // 如果不是添加顶级目录
          values.pId = editData.id;
        }
        values.level = topLevel ? 0 : 1;

        const obj = {
          goodsClassify: {
            ...values,
          },
        };

        this.submitAdd(obj);
      }
    });
  };

  // 选择完图片
  imageOnOk = e => {
    console.log(e);
    const { initValue } = this.state;
    console.log(initValue);
    const obj = {
      goodsClassify: {
        pId: initValue.pId,
        id: initValue.id,
        classifyName: initValue.classifyName,
        classifyPicture: e.length > 0 ? e[0].url : '',
        ordNum: initValue.ordNum,
        level: initValue.level,
      },
    };
    this.submitEdit(obj);
    this.setState({
      imageVisible: false,
    });
  };

  render() {
    const {
      columns,
      data,
      categoryVisible,
      isEditCategory,
      imageVisible,
      total,
      page,
    } = this.state;
    const { addCategoryLoading, editCategoryLoading, queryGoodsClassifyLoading } = this.props;
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
      <div>
        <div style={{ marginBottom: 20 }}>
          <Button
            type="primary"
            onClick={() => this.setState({ categoryVisible: true, topLevel: true })}
          >
            添加顶级分类
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record.id}
          pagination={pageObj}
          loading={queryGoodsClassifyLoading}
        />
        <AddCategory
          classify
          visible={categoryVisible}
          isEdit={isEditCategory}
          ref={this.categoryRef}
          addLoading={addCategoryLoading}
          editLoading={editCategoryLoading}
          onClose={() => this.setState({ categoryVisible: false })}
          onOK={e => {
            this.submitCategory(e);
          }}
        />
        <SelectImage
          visible={imageVisible}
          multiple={false}
          onCancel={() => this.setState({ imageVisible: false })}
          onOk={e => {
            this.imageOnOk(e);
          }}
        />
      </div>
    );
  }
}
export default GoodsCategory;
