import React, { Component } from 'react';
import { Table, Icon, Input, InputNumber, Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import dataJSON from './category.json';
import AddCategory from '../GoodsMainCategory/AddCategory';
import SelectImage from '@/components/SelectImage';

import { isUrl } from '@/utils/utils';

@connect(({ categoryModel, loading }) => ({
  categoryModel,
  addCategoryLoading: loading.effects['categoryModel/addGoodsCategory'],
  editCategoryLoading: loading.effects['categoryModel/editGoodsCategory'],
  // myExecuteloading: loading.effects['completedTaskModel/queryMyExecuteTask'],
}))
class GoodsCategory extends Component {
  constructor(props) {
    super(props);
    this.categoryRef = React.createRef();
  }

  state = {
    imageVisible: false,
    expandedRowKeys: [],
    columns: [
      {
        title: '分类名称',
        dataIndex: 'category_name',
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
              {record.category_level === 1 ? (
                <a
                  style={{ marginLeft: 10 }}
                  onClick={() => this.setState({ categoryVisible: true })}
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
        dataIndex: 'sort',
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
        dataIndex: 'image_url',
        render: text => {
          return isUrl(text) ? (
            <img
              src={text}
              style={{ width: 40, height: 40 }}
              alt="分类图片"
              onClick={() => {
                this.showImg();
              }}
            />
          ) : (
            <Icon
              type="picture"
              onClick={() => {
                this.showImg();
              }}
            />
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'created',
        align: 'center',
        render: text => {
          return moment(text * 1000).format('YYYY-MM-DD');
        },
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
    data: dataJSON,
    categoryVisible: false,
    isEditCategory: false,
  };

  componentDidMount() {
    console.log(dataJSON);
    const arr = [];
    dataJSON.forEach(item => {
      arr.push(item.id);
    });
    this.setState({
      expandedRowKeys: arr,
    });
  }

  // 删除分类
  delCategory = record => {
    console.log(record);
  };

  // 修改分类排序
  sortBlur = (e, record) => {
    if (e.target.value !== record.sort) {
      const obj = {
        id: record.id,
        categName: record.category_name,
        ordNum: e.target.value,
      };
      this.submitEdit(obj);
    }
  };

  // 修改分类名称
  nameBlur = (e, record) => {
    if (e.target.value !== record.category_name) {
      const obj = {
        id: record.id,
        categName: e.target.value,
        ordNum: record.sort,
      };
      this.submitEdit(obj);
    }
  };

  // 展开表格全部节点
  handleOnExpand = (expanded, record) => {
    const { expandedRowKeys } = this.state;
    if (expanded) {
      expandedRowKeys.push(record.id);
    } else {
      expandedRowKeys.forEach((item, i) => {
        if (record.id === item) {
          expandedRowKeys.splice(i, 1);
        }
      });
    }
    this.setState({
      expandedRowKeys,
    });
  };

  // 打开选择图片组件
  showImg = () => {
    this.setState({
      imageVisible: true,
    });
  };

  // 添加分类
  submitAdd = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'categoryModel/addGoodsCategory',
      payload: values,
      callBack: res => {
        console.log(res);
      },
    });
  };

  // 修改分类
  submitEdit = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'categoryModel/editGoodsCategory',
      payload: values,
      callBack: res => {
        console.log(res);
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
        const { isEdit } = this.state;
        if (!isEdit) {
          this.submitAdd(values);
        } else {
          this.submitEdit(values);
        }
      }
    });
  };

  // 选择完图片
  imageOnOk = e => {
    console.log(e);
    this.setState({
      imageVisible: false,
    });
  };

  render() {
    const {
      columns,
      data,
      expandedRowKeys,
      categoryVisible,
      isEditCategory,
      imageVisible,
    } = this.state;
    const { addCategoryLoading, editCategoryLoading } = this.props;

    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <Button type="primary" onClick={() => this.setState({ categoryVisible: true })}>
            {' '}
            添加顶级目录
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record.id}
          onExpand={this.handleOnExpand}
          expandedRowKeys={expandedRowKeys}
        />
        <AddCategory
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
