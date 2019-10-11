import React, { Component } from 'react';
import { Button, Input, Table, Switch, Form, Col, Row, Select, message, Tag } from 'antd';
import { connect } from 'dva';
import AddGoodsData from './AddGoodsData';
import styles from '../../goodsStyles.less';
import { MathRandom, isEmpty } from '@/utils/utils';

const { Option } = Select;
const FormItem = Form.Item;
@Form.create()
@connect(({ goodsDataModel }) => ({
  goodsDataModel,
}))
class GoodsData extends Component {
  constructor(props) {
    super(props);
    this.specRef = React.createRef();
  }

  state = {
    total: 0,
    page: 1,
    dataList: [
      {
        valueName: '',
        id: `xin_${MathRandom()}`,
      },
    ],
    isEdit: false,
    initValue: {},
    columns: [
      {
        title: '参数名称',
        dataIndex: 'paramName',
        align: 'center',
      },
      {
        title: '参数类型',
        dataIndex: 'isSearch',
        align: 'center',
        render: text => {
          return text ? '支持商品高级筛选' : '仅用于商品详情展示';
        },
      },
      {
        title: '参数备注',
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
    dataSource: [],
    visible: false,
  };

  componentDidMount() {
    this.getGoodsParmas();
  }

  // 修改状态
  changeSwitch = (e, record) => {
    const obj = {
      goodsParam: {
        id: record.id,
        status: e ? 0 : 1,
      },
    };

    const { dispatch } = this.props;
    dispatch({
      type: 'goodsDataModel/updateGoodsParamStatus',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('状态更新成功');
        } else {
          message.error(res.message);
        }
      },
    });

    // this.back(obj);
  };

  // 获取商品参数列表
  getGoodsParmas = obj => {
    const { page } = this.state;
    const parmas = {
      pageNum: page,
      pageSize: 10,
      ...obj,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsDataModel/queryGoodsParam',
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

  editBrand = record => {
    const arr = record.goodsParamValue;
    this.setState({
      initValue: record,
      dataList: arr,
      visible: true,
      isEdit: true,
    });
  };

  deleteTableDate = (e, record) => {
    console.log(e);
    console.log(record);
  };

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

  closeAdd = () => {
    this.setState({
      visible: false,
    });
  };

  // 添加参数值
  addDataItem = () => {
    const { dataList } = this.state;
    const addRowData = {
      valueName: '',
      id: `xin_${MathRandom()}`,
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

  // 删除参数值
  deleteRow = i => {
    const { dataList } = this.state;
    dataList.splice(i, 1);
    this.setState({
      dataList,
    });
  };

  // 添加或者修改的时候判断参数值里面是不是有重复项
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
            if (!isEmpty(dataList[i].valueName)) {
              flag = false;
              break;
            }
          }
        }

        if (!flag) {
          message.error('参数值不能为空');
        } else if (this.isRepeat()) {
          message.error('参数值不能有重复项');
        } else {
          const arrList = [];
          dataList.forEach(item => {
            const objItem = {};
            objItem.valueName = item.valueName;
            if (isEdit) {
              objItem.paramId = initValue.id;
              if (item.id.indexOf('xin_') === 0) {
                objItem.id = null;
              } else {
                objItem.id = item.id;
              }
            }
            arrList.push(objItem);
          });

          const dataobj = {
            goodsParam: { ...values },
            goodsParamValue: arrList,
          };
          console.log(dataobj);

          if (isEdit) {
            dataobj.goodsParam.id = initValue.id;
            this.submitEdit(dataobj);
          } else {
            this.submitAdd(dataobj);
          }
        }
      }
    });
  };

  submitAdd = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsDataModel/addGoodsParam',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('参数添加成功');
          this.setState({
            visible: false,
          });
          this.getGoodsParmas();
        } else {
          message.error(res.message);
        }
      },
    });
  };

  submitEdit = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsDataModel/updateGoodsParam',
      payload: obj,
      callBack: res => {
        console.log(res);
        if (res.success) {
          message.success('参数修改成功');
          this.setState({
            visible: false,
          });
          this.getGoodsParmas();
        } else {
          message.error(res.message);
        }
      },
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
        this.getGoodsParmas(values);
      }
    });
  };

  render() {
    const { columns, dataSource, page, visible, isEdit, dataList, initValue, total } = this.state;
    const {
      form: { getFieldDecorator },
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
            this.getGoodsParmas();
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
                新增参数
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
                {getFieldDecorator('paramName')(<Input placeholder="请输入参数名称" />)}
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
          pagination={pageObj}
          dataSource={dataSource}
          expandedRowRender={record =>
            record.goodsParamValue.map(item => {
              return (
                <Tag color="cyan" key={item.id}>
                  {item.valueName}
                </Tag>
              );
            })
          }
          rowKey={record => record.id}
        />
        <AddGoodsData
          visible={visible}
          isEdit={isEdit}
          initValue={initValue}
          ref={this.specRef}
          dataList={dataList}
          addDataItem={() => {
            this.addDataItem();
          }}
          deleteRow={index => {
            this.deleteRow(index);
          }}
          changeInput={(e, i) => {
            this.changeInput(e, i);
          }}
          onClose={() => {
            this.closeAdd();
          }}
          onOk={() => {
            this.onOk();
          }}
        />
      </div>
    );
  }
}
export default GoodsData;
