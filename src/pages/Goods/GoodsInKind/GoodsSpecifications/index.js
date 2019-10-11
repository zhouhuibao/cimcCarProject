import React, { Component } from 'react';
import { Button, Input, Table, message, Switch, Select, Row, Col, Form, Tag } from 'antd';
import { connect } from 'dva';
import AddsSpecifications from './AddsSpecifications';
import { MathRandom, isEmpty } from '@/utils/utils';
import styles from '../../goodsStyles.less';

const { Option } = Select;
const FormItem = Form.Item;
@Form.create()
@connect(({ specificationsModel, loading }) => ({
  specificationsModel,
  addLoading: loading.effects['specificationsModel/addGoodsSpecs'],
  listLoading: loading.effects['specificationsModel/queryGoodsSpecs'],
  editLoading: loading.effects['specificationsModel/updateGoodsSpecs'],
}))
class GoodsSpecifications extends Component {
  constructor(props) {
    super(props);
    this.specRef = React.createRef();
  }

  state = {
    dataList: [
      {
        valueName: '',
        id: `xin_${MathRandom()}`,
        valuePicture: '',
      },
    ],
    total: 0,
    page: 1,
    isEdit: false,
    initValue: {},
    columns: [
      {
        title: '规格名称',
        dataIndex: 'specName',
      },
      {
        title: '规格类型',
        dataIndex: 'specType',
        render: text => {
          return text === 0 ? '文字' : '图片';
        },
      },
      {
        title: '规格备注',
        dataIndex: 'remark',
      },
      {
        title: '状态',
        dataIndex: 'status',
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
            <a
              onClick={() => {
                this.editBrand(record);
              }}
            >
              编辑
            </a>
          );
        },
      },
    ],
    editData: null,
    dataSource: [],
    visible: false,
  };

  componentDidMount() {
    this.getSpecList();
  }

  changeSwitch = (e, record) => {
    const obj = {
      goodsSpecs: {
        id: record.id,
        status: e ? 0 : 1,
      },
    };

    const { dispatch } = this.props;
    dispatch({
      type: 'specificationsModel/updateOrDeleteGoodsSpecs',
      payload: obj,
      callBack: res => {
        if (res.success) {
          message.success('状态更新成功');
        } else {
          message.error(res.message);
        }
      },
    });

    // this.back(obj);
  };

  // 恢复
  back = record => {
    this.submitEdit(record);
  };

  // 获取规格列表
  getSpecList = obj => {
    const { page } = this.state;
    const parmas = {
      pageNum: page,
      pageSize: 10,
      ...obj,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'specificationsModel/queryGoodsSpecs',
      payload: parmas,
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

  // 点击修改
  editBrand = record => {
    const arr = record.goodsSpecsValueList;
    this.setState({
      visible: true,
      isEdit: true,
      initValue: record,
      dataList: arr,
    });
  };

  // 点击删除
  deleteTableDate = (e, record) => {
    console.log(e);
    console.log(record);
  };

  // 点击新增
  addGoodsBrand = () => {
    this.setState({
      visible: true,
      isEdit: false,
      dataList: [
        {
          valueName: '',
          id: `xin_${MathRandom()}`,
          valuePicture: '',
        },
      ],
    });
  };

  // 关闭抽屉
  closeAdd = () => {
    this.setState({
      visible: false,
    });
  };

  // 添加或者修改的时候判断规格值里面是不是有重复项
  isRepeat = () => {
    const { dataList } = this.state;
    const arr = [];
    dataList.forEach(item => {
      arr.push(item.valueName);
    });

    let flag = false;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === arr[i + 1]) {
        flag = true;
        break;
      }
    }
    return flag;
  };

  changeImage = (imgArr, index) => {
    const { dataList } = this.state;
    dataList[index].valuePicture = imgArr[0].url;
    this.setState({
      dataList,
    });
  };

  // 提交
  onOk = () => {
    console.log(this);
    const { validateFields } = this.specRef.current;
    validateFields((err, values) => {
      if (!err) {
        const { dataList, isEdit, initValue } = this.state;
        let flag = true;
        if (values.specType === 0) {
          for (let i = 0; i < dataList.length; i += 1) {
            if (!isEmpty(dataList[i].valueName)) {
              flag = false;
              break;
            }
          }
        } else {
          for (let i = 0; i < dataList.length; i += 1) {
            if (!isEmpty(dataList[i].valueName) || !isEmpty(dataList[i].valuePicture)) {
              flag = false;
              break;
            }
          }
        }

        if (!flag) {
          message.error('规格值不能为空');
        } else if (this.isRepeat()) {
          message.error('规格值不能有重复项');
        } else {
          const arrList = [];
          dataList.forEach(item => {
            const objItem = {};
            objItem.valueName = item.valueName;
            objItem.valuePicture = item.valuePicture;
            if (isEdit) {
              objItem.specId = initValue.id;
              if (item.id.indexOf('xin_') === 0) {
                objItem.id = null;
              } else {
                objItem.id = item.id;
              }
            }
            arrList.push(objItem);
          });

          const dataobj = {
            goodsSpecs: { ...values },
            goodsSpecsValueList: arrList,
          };

          if (isEdit) {
            dataobj.goodsSpecs.id = initValue.id;
            this.submitEdit(dataobj);
          } else {
            this.submitAdd(dataobj);
          }
        }
      }
    });
  };

  // 提交添加规格
  submitAdd = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'specificationsModel/addGoodsSpecs',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('规格添加成功');
          this.setState({
            visible: false,
          });
          this.getSpecList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  // 提交修改规格
  submitEdit = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'specificationsModel/updateGoodsSpecs',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('规格修改成功');
          this.setState({
            visible: false,
          });
          this.getSpecList();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  // 添加规格值
  addDataItem = () => {
    const { dataList } = this.state;
    const addRowData = {
      valueName: '',
      id: `xin_${MathRandom()}`,
      valuePicture: '',
    };

    dataList.push(addRowData);
    this.setState({
      dataList,
    });
  };

  changeInput = (e, i) => {
    const { dataList } = this.state;
    dataList[i].valueName = e.target.value;
  };

  // 删除规格值
  deleteRow = i => {
    const { dataList } = this.state;
    dataList.splice(i, 1);
    this.setState({
      dataList,
    });
  };

  searchTable = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.getSpecList(values);
      }
    });
  };

  render() {
    const {
      columns,
      dataSource,
      visible,
      initValue,
      editData,
      isEdit,
      dataList,
      total,
      page,
    } = this.state;
    const {
      form: { getFieldDecorator },
      addLoading,
      listLoading,
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
            this.getTableData();
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
                新增规格
              </Button>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('status', {
                  initialValue: '',
                })(
                  <Select placeholder="请选择状态">
                    <Option value="">全部</Option>
                    <Option value={0}>有效</Option>
                    <Option value={1}>失效</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('specName')(<Input placeholder="请输入规格名称" />)}
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
          pagination={pageObj}
          loading={listLoading}
          expandedRowRender={record =>
            record.goodsSpecsValueList.map(item => {
              return (
                <Tag color="cyan" key={item.id}>
                  {item.valueName}
                </Tag>
              );
            })
          }
          rowKey={record => record.id}
        />
        <AddsSpecifications
          onOk={() => {
            this.onOk();
          }}
          visible={visible}
          isEdit={isEdit}
          addLoading={addLoading}
          editLoading={editLoading}
          initValue={initValue}
          ref={this.specRef}
          dataList={dataList}
          changeImage={(arr, index) => {
            this.changeImage(arr, index);
          }}
          addDataItem={() => {
            this.addDataItem();
          }}
          deleteRow={index => {
            this.deleteRow(index);
          }}
          changeInput={(e, i) => {
            this.changeInput(e, i);
          }}
          editData={editData}
          onClose={() => {
            this.closeAdd();
          }}
        />
      </div>
    );
  }
}
export default GoodsSpecifications;
