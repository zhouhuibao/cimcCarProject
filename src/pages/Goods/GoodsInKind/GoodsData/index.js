import React, { Component } from 'react';
import { Button, Input, Table, Switch, Form, Col, Row, Select, message } from 'antd';
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
    dataList: [
      {
        valueName: '',
        id: `xin_${MathRandom()}`,
        valuePicture: '',
      },
    ],
    isEdit: false,
    initValue: {},
    columns: [
      {
        title: '参数名称',
        dataIndex: 'name',
        align: 'center',
        key: 'name',
      },
      {
        title: '参数类型',
        dataIndex: 'typeName',
        align: 'center',
        key: 'typeName',
      },
      {
        title: '参数备注',
        dataIndex: 'remake',
        key: 'remake',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: text => {
          return (
            <Switch
              checkedChildren="有效"
              unCheckedChildren="无效"
              defaultChecked={text === 0 || false}
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
    dataSource: [
      {
        typeName: '图片',
        type: 1,
        name: '挂车管家1',
        description: '尺码  颜色  材质  风格',
      },
      {
        typeName: '文字',
        type: 0,
        name: '挂车管家2',
        description: '尺码  颜色  材质  风格',
      },
    ],
    visible: false,
  };

  componentDidMount() {}

  editBrand = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'specificationsModel/editSpecifications',
      payload: record,
    });
    this.setState({
      editData: record,
      visible: true,
      isEdit: true,
    });
  };

  deleteTableDate = (e, record) => {
    console.log(e);
    console.log(record);
  };

  addGoodsBrand = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'specificationsModel/addSpecifications',
    });
    this.setState({
      visible: true,
      isEdit: false,
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
            if (!isEmpty(dataList[i].valueName) || !isEmpty(dataList[i].valuePicture)) {
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
          console.log(dataobj);

          // if (isEdit) {
          //   dataobj.goodsSpecs.id = initValue.id;
          //   this.submitEdit(dataobj);
          // } else {
          //   this.submitAdd(dataobj);
          // }
        }
      }
    });
  };

  render() {
    const { columns, dataSource, visible, isEdit, editData, dataList, initValue } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
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
                {getFieldDecorator('specType', {
                  initialValue: '',
                })(
                  <Select placeholder="请选择状态">
                    <Option value="">全部</Option>
                    <Option value={1}>有效</Option>
                    <Option value={0}>失效</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('specName')(<Input placeholder="请输入参数名称" />)}
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
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
        />
        <AddGoodsData
          visible={visible}
          isEdit={isEdit}
          editData={editData}
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
