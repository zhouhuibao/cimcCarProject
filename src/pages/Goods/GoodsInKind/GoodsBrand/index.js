import React, { Component } from 'react';
import { Button, Input, Table, Switch, Row, Col, message, Form, Select } from 'antd';
import { connect } from 'dva';
import AddBrand from './AddBrand';
import styles from '../../goodsStyles.less';
import { dataType, showImg } from '@/utils/utils';

const { Option } = Select;
const FormItem = Form.Item;
@Form.create()
@connect(({ brandModel, loading }) => ({
  brandModel,
  listLoading: loading.effects['brandModel/queryGoodsBrand'],
  addLoading: loading.effects['brandModel/addGoodsBrand'],
  editLoading: loading.effects['brandModel/updateGoodsBrand'],
  // myExecuteloading: loading.effects['completedTaskModel/queryMyExecuteTask'],
}))
class GoodsBrand extends Component {
  constructor(props) {
    super(props);
    this.brandRef = React.createRef();
  }

  state = {
    total: 0,
    page: 1,
    isAdd: true,
    initValue: {},
    options: [
      {
        value: '',
        label: '全部',
      },
      {
        value: 0,
        label: '有效',
      },
      {
        value: 1,
        label: '失效',
      },
    ],
    columns: [
      {
        title: '品牌图片',
        dataIndex: 'brandPicture',
        width: 170,
        key: 'brandPicture',
        render: text => {
          return <img style={{ width: 60 }} src={showImg(text)} alt="品牌logo" />;
        },
      },
      {
        title: '品牌名称',
        dataIndex: 'brandName',
        key: 'brandName',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text, record) => {
          return (
            <Switch
              checkedChildren="有效"
              unCheckedChildren="无效"
              defaultChecked={text === 0 || false}
              onChange={e => {
                this.changeSwitch(e, record);
              }}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center',
        width: 100,
        render: (text, record) => {
          return (
            record.status === 0 && (
              <a
                onClick={() => {
                  this.editBrand(record);
                }}
              >
                编辑
              </a>
            )
          );
        },
      },
    ],
    dataSource: [],
    visible: false,
  };

  componentDidMount() {
    this.getList();
  }

  // 获取品牌列表
  getList = obj => {
    let data = obj;
    const {
      form: { getFieldValue },
    } = this.props;
    if (dataType(obj) === 'Undefined') {
      const { page } = this.state;
      data = {
        pageNum: page,
        pageSize: 10,
        status: getFieldValue('status'),
        brandName: '',
      };
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/queryGoodsBrand',
      payload: data,
      callBack: res => {
        console.log(res);
        if (res.success) {
          this.setState({
            dataSource: res.data.rows || [],
            total: res.data.total,
          });
        }
      },
    });
  };

  // 恢复
  back = record => {
    this.submitEdit(record);
  };

  editBrand = record => {
    this.setState({
      initValue: record,
      visible: true,
      isAdd: false,
    });
  };

  deleteTableDate = (e, record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/deleteGoodsBrand',
      payload: {
        id: record.id,
      },
      callBack: res => {
        if (res.success) {
          this.getList();
          message.success('品牌更新成功');
        } else {
          message.error(res.message);
        }
      },
    });
  };

  addGoodsBrand = () => {
    this.setState({
      visible: true,
      isAdd: true,
    });
  };

  submitAdd = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/addGoodsBrand',
      payload: values,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('品牌添加成功');
          this.getList();
          this.setState({
            visible: false,
          });
        } else {
          message.error(res.message);
        }
      },
    });
  };

  submitEdit = (values, type) => {
    const { initValue } = this.state;
    if (type === 'edit') {
      values.goodsBrand.id = initValue.id.toString();
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'brandModel/updateGoodsBrand',
      payload: values,
      callBack: res => {
        console.log(res);
        if (res.success) {
          this.getList();
          this.setState({
            visible: false,
          });
          message.success('品牌修改成功');
        } else {
          message.error(res.message);
        }
      },
    });
  };

  submitBrand = e => {
    e.preventDefault();
    const { validateFields } = this.brandRef.current;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const { isAdd } = this.state;
        const paramsObj = {
          goodsBrand: {
            ...values,
          },
        };
        if (isAdd) {
          this.submitAdd(paramsObj);
        } else {
          this.submitEdit(paramsObj, 'edit');
        }
      }
    });
  };

  changeSwitch = (e, record) => {
    console.log(e);
    console.log(record);
    const obj = {
      goodsBrand: {
        ...record,
        status: e ? 0 : 1,
      },
    };
    // const obj = {
    //   ...record,
    //   status: e ? 0 : 1,
    // };
    this.back(obj);
  };

  searchTable = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.getList(values);
      }
    });
  };

  render() {
    const { columns, dataSource, visible, initValue, isAdd, page, total, options } = this.state;
    const {
      listLoading,
      addLoading,
      form: { getFieldDecorator },
      editLoading,
    } = this.props;
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
            this.getList();
          },
        );
      },
    };
    return (
      <div className={styles.goodsBrand}>
        <Form onSubmit={this.searchTable}>
          <Row gutter={16}>
            <Col span={6}>
              <Button
                type="primary"
                icon="plus"
                onClick={() => {
                  this.addGoodsBrand();
                }}
                style={{ marginTop: '4px' }}
              >
                新增品牌
              </Button>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('status', {
                  initialValue: '',
                })(
                  <Select placeholder="请选择状态">
                    {options.map(item => {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('brandName')(<Input placeholder="请输入品牌名称" />)}
              </FormItem>
            </Col>
            <Col span={6}>
              <Button htmlType="submit" style={{ marginTop: '4px' }} type="primary">
                搜索
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          loading={listLoading}
          pagination={pageObj}
        />
        <AddBrand
          addLoading={addLoading}
          editLoading={editLoading}
          visible={visible}
          initValue={initValue}
          isAdd={isAdd}
          onOk={e => {
            this.submitBrand(e);
          }}
          ref={this.brandRef}
          onClose={() =>
            this.setState({
              visible: false,
            })
          }
        />
      </div>
    );
  }
}
export default GoodsBrand;
