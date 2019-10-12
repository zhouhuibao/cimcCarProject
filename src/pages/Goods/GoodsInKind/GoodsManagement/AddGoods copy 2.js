import React, { Component } from 'react';
import {
  PageHeader,
  Cascader,
  Form,
  Button,
  Switch,
  Checkbox,
  Input,
  Table,
  Popconfirm,
  InputNumber,
  // Icon,
  Spin,
} from 'antd';
import BraftEditor from 'braft-editor';
import { connect } from 'dva';
import { router } from 'umi';
import CustomSelectImage from '@/components/CustomSelectImage';
import FormItemDom from '@/components/CreateForm';
import CardComponent from '@/components/CardComponent';
import Blockquote from '@/components/Blockquote';
import 'braft-editor/dist/index.css';
import styles from './styles.less';
import { MathRandom, showImg, isEmpty, dataType, delStringLastOne } from '@/utils/utils';

function getValuesByArray(arr1, arr2, type) {
  const arr = [];
  for (let i = 0; i < arr1.length; i += 1) {
    const v1 = dataType(arr1[i]) === 'Object' ? arr1[i].name : arr1[i];
    const v1id =
      dataType(arr1[i]) === 'Object' ? `${arr1[i].idStr}${arr2[0].specId}` : arr2[0].specId;
    for (let j = 0; j < arr2.length; j += 1) {
      const itemObj = {};
      const v2 = arr2[j].valueName;
      const v2id = arr2[j].id;
      const value = `${v1} ${v2}`;
      const idStrs = `${v1id}:${v2id},`;
      itemObj.name = value;
      itemObj.idStr = idStrs;
      itemObj.specType = type;
      itemObj.specInfo = arr2;
      arr.push(itemObj);
    }
  }

  return arr;
}

function getSpecType(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      if (arr[i][j].specType === 1) {
        return 1;
      }
    }
  }
  return 0;
}

function getArrayByArrays(arrays) {
  let arr = [''];

  for (let i = 0; i < arrays.length; i += 1) {
    arr = getValuesByArray(arr, arrays[i], getSpecType(arrays));
  }
  return arr;
}

@Form.create()
@connect(({ goodsModel, loading }) => ({
  goodsModel,
  categoryLoading: loading.effects['goodsModel/selectGoodsCategory'],
  addLoading: loading.effects['goodsModel/addStation'],
}))
class AddGoods extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
    this.formItemRef1 = React.createRef();
    this.paramsFormRef = React.createRef();
  }

  state = {
    specImgVisible: false,
    dataSource: [],
    contentVisible: false,
    headerDataSource: [
      {
        key: 'tainchong110',
        name: '批量填充',
        stock: '',
        status: '',
        skuNo: '',
        weight: '',
        volume: '',
        currentPrice: '',
        costPrice: '',
        originalPrice: '',
        barcode: '',
      },
    ],
    headerColumns: [],
    columns: [],
    switchCheck: false,
    editorState: BraftEditor.createEditorState(null),
    SpecificationsData: [],
    paramsForm: [],
    unifiedSpecForm: [
      {
        domType: 'select',
        id: 'approvalStatus_3',
        title: '商品状态',
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '商品状态不能为空',
            },
          ],
        },
        options: [
          {
            key: '前台可销售',
            value: '0',
          },
          {
            key: '可线下销售',
            value: '1',
          },
          {
            key: '前台仅展示',
            value: '2',
          },
          {
            key: '不可销售',
            value: '3',
          },
        ],
      },
      {
        domType: 'number',
        id: 'stock',
        title: '库存',
        required: true,
        domAttr: {
          style: { width: '100%' },
        },
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '库存不能为空',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'skuNo',
        title: '商品货号',
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'text',
        id: 'weight',
        title: '重量',
        domAttr: {
          addonAfter: 'kg',
        },
        fieldAttr: {},
      },
      {
        domType: 'text',
        id: 'volume',
        title: '体积',
        domAttr: {
          addonAfter: 'm³',
        },
        fieldAttr: {},
      },
      {
        domType: 'text',
        id: 'currentPrice',
        title: '销售价',
        required: true,
        domAttr: {
          addonBefore: '¥',
        },
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '销售价不能为空',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'costPrice',
        title: '成本价',
        required: true,
        domAttr: {
          addonBefore: '¥',
        },
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '成本价不能为空',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'originalPrice',
        title: '原价',
        required: true,
        domAttr: {
          addonBefore: '¥',
        },
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '原价不能为空',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'barcode',
        title: '条形码',
        domAttr: {},
        fieldAttr: {},
      },
    ],
    formItemData: [
      {
        domType: 'text',
        id: 'title',
        title: '商品标题',
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '商品标题不能为空',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'subtitle',
        title: '副标题',
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'select',
        id: 'freightTemplatesId',
        title: '运费模板',
        domAttr: {},
        fieldAttr: {},
        options: [
          {
            key: '中通',
            value: '0',
          },
          {
            key: '韵达',
            value: '1',
          },
          {
            key: '顺丰',
            value: '2',
          },
        ],
      },
      {
        domType: 'select',
        id: 'brandId',
        title: '品牌',
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
            },
          ],
        },
        options: [],
        optionsObj: {
          key: 'brandName',
          value: 'id',
        },
      },
      {
        domType: 'text',
        id: 'unit',
        title: '计量单位',
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'text',
        id: 'ordNum',
        title: '排序编号',
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'TreeSelect',
        id: 'classifys',
        title: '商品分类',
        required: true,
        domAttr: {
          treeCheckable: true,
          onChange: e => {
            console.log(e);
          },
        },
        fieldAttr: {
          rules: [
            {
              required: true,
            },
          ],
        },
        options: [],
      },
      {
        domType: 'Cascader',
        id: 'cityAddress',
        title: '产地',
        domAttr: {
          fieldNames: {
            label: 'regionName',
            value: 'id',
            children: 'regionJoinOut',
          },
          onChange: e => {
            console.log(e);
          },
        },
        fieldAttr: {},
        options: [],
      },
      {
        domType: 'img',
        id: 'imagesArr',
        title: '商品图',
        multiple: true,
        required: true,
        col: 24,
        domAttr: {},
        fieldAttr: {},
      },
    ],

    options: [],
  };

  componentDidMount() {
    this.getCategoryList();
    this.getClassifyList();
    this.getAddressList();
    this.getGoodsBrand();
    this.setColumns('headerColumns');
    this.setColumns('columns');
  }

  // 获取品牌
  getGoodsBrand = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsModel/selectGoodsBrand',
      callBack: res => {
        const { formItemData } = this.state;
        formItemData.forEach(item => {
          if (item.id === 'brandId') {
            item.options = res.data;
          }
        });
        this.setState({
          formItemData,
        });
      },
    });
  };

  // 获取地址
  getAddressList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsModel/getRegionJoin',
      callBack: res => {
        const { formItemData } = this.state;
        formItemData.forEach(item => {
          if (item.id === 'cityAddress') {
            item.options = res.data;
          }
        });
        this.setState({
          formItemData,
        });
      },
    });
  };

  // 获取主目录
  getCategoryList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsModel/selectGoodsCategory',
      callBack: res => {
        this.setState({
          options: res.data || [],
        });
      },
    });
  };

  // 获取分类
  getClassifyList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsModel/selectGoodsClassify',
      callBack: res => {
        const { formItemData } = this.state;
        formItemData.forEach(item => {
          if (item.id === 'classifys') {
            item.options = res.data;
          }
        });
        this.setState({
          formItemData,
        });
      },
    });
  };

  // 根据主目录获取关联参数并且生成创建参数组件表单
  getDataById = id => {
    // paramsForm
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsModel/goodsCategoryIdSelectParam',
      payload: { id },
      callBack: res => {
        const { data } = res;
        const arr = [];
        data.forEach(item => {
          const obj = {};
          obj.domType = 'select';
          obj.title = item.paramName;
          obj.domAttr = {};
          obj.id = `${item.paramId}`;
          obj.fieldAttr = {};
          const optionsArr = [];
          item.specsAndCateOut.forEach(childerItem => {
            const childerObj = {};
            childerObj.key = childerItem.valueName;
            childerObj.value = childerItem.id;
            optionsArr.push(childerObj);
          });
          obj.options = optionsArr;
          arr.push(obj);
        });
        this.setState({
          paramsForm: arr,
        });
      },
    });
  };

  // 根据主目录获取关联规格
  getSpectById = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsModel/goodsCategoryIdSelect',
      payload: { id },
      callBack: res => {
        this.setState({
          SpecificationsData: res.data,
        });
      },
    });
  };

  // 设置表头
  setColumns = type => {
    const columnsArr = [
      {
        title: '规格值',
        dataIndex: 'name',
        key: 'name',
        width: 130,
      },
      {
        title: <div style={{ color: 'red' }}>*状态</div>,
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`status_${record.key}`, {
                initialValue: record[`status_${record.key}`],
                rules:
                  type === 'headerColumns' ? null : [{ required: true, message: '状态不能为空' }],
              })(<InputNumber />)}
            </Form.Item>
          );
        },
      },
      {
        title: <div style={{ color: 'red' }}>*库存</div>,
        dataIndex: 'stock',
        key: 'stock',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`stock_${record.key}`, {
                initialValue: record[`stock_${record.key}`],
                rules:
                  type === 'headerColumns' ? null : [{ required: true, message: '库存不能为空' }],
              })(<Input style={{ width: 90 }} />)}
            </Form.Item>
          );
        },
      },
      {
        title: '货号',
        dataIndex: 'skuNo',
        key: 'skuNo',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`skuNo_${record.key}`, {
                initialValue: record[`skuNo_${record.key}`],
              })(<Input style={{ width: 90 }} />)}
            </Form.Item>
          );
        },
      },
      {
        title: '重量(kg)',
        dataIndex: 'weight',
        key: 'weight',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`weight_${record.key}`, {
                initialValue: record[`weight_${record.key}`],
              })(<Input style={{ width: 90 }} />)}
            </Form.Item>
          );
        },
      },
      {
        title: '体积(m³)',
        dataIndex: 'volume',
        key: 'volume',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`volume_${record.key}`, {
                initialValue: record[`volume_${record.key}`],
              })(<Input style={{ width: 90 }} />)}
            </Form.Item>
          );
        },
      },
      {
        title: '销售价',
        dataIndex: 'currentPrice',
        key: 'currentPrice',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`currentPrice_${record.key}`, {
                initialValue: record[`currentPrice_${record.key}`],
              })(<Input style={{ width: 90 }} />)}
            </Form.Item>
          );
        },
      },
      {
        title: '成本价',
        dataIndex: 'costPrice',
        key: 'costPrice',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`costPrice_${record.key}`, {
                initialValue: record[`costPrice_${record.key}`],
              })(<Input style={{ width: 90 }} />)}
            </Form.Item>
          );
        },
      },
      {
        title: '原价',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`originalPrice_${record.key}`, {
                initialValue: record[`originalPrice_${record.key}`],
              })(
                <Input
                  style={{ width: 90 }}
                  onChange={e => {
                    this.changeSku(e, record);
                  }}
                />,
              )}
            </Form.Item>
          );
        },
      },
      {
        title: '条形码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: (text, record) => {
          const {
            form: { getFieldDecorator },
          } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator(`barcode_${record.key}`, {
                initialValue: record[`barcode_${record.key}`],
              })(<Input style={{ width: 90 }} />)}
            </Form.Item>
          );
        },
      },
    ];

    const obj = {
      title: '操作',
      dataIndex: 'delete',
      key: 'delete',
      align: 'center',
    };

    if (type === 'headerColumns') {
      obj.render = (text, record, index) => {
        return (
          <a
            onClick={() => {
              this.addColData(text, record, index);
            }}
          >
            填充
          </a>
        );
      };
    } else {
      obj.render = (text, record) => {
        return (
          <div>
            <div>
              <Popconfirm
                title="确定要清空这条数据吗?"
                onConfirm={e => {
                  this.deleteTableDate(e, record);
                }}
                okText="确定"
                cancelText="取消"
              >
                <a>清空</a>
              </Popconfirm>
            </div>
            <div style={{ marginTop: 5 }}>
              <a onClick={() => this.setState({ specImgVisible: true })}>上传图片</a>
            </div>
            <div style={{ marginTop: 5 }}>
              <a>查看图片</a>
            </div>
          </div>
        );
      };
    }

    columnsArr.push(obj);

    this.setState({
      [type]: columnsArr,
    });
  };

  changeSku = (e, record) => {
    console.log(e.target.value);
    console.log(record);
  };

  // 填充列数据
  addColData = (e, record) => {
    const {
      form: { getFieldValue, setFieldsValue },
    } = this.props;
    Object.keys(record).forEach(item => {
      if (item !== 'name' || item !== 'key') {
        // 获取需要批量填充的值
        const currentValue = getFieldValue(`${item}_${record.key}`);
        // if(isEmpty(currentValue)){
        const { dataSource } = this.state;
        dataSource.forEach(dataItem => {
          setFieldsValue({
            [`${item}_${dataItem.key}`]: currentValue,
          });
        });
        // }
      }
    });
  };

  // 清空表格里面的一条数据
  deleteTableDate = (e, data) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    const filedsArr = [
      'status',
      'stock',
      'skuNo',
      'weight',
      'volume',
      'currentPrice',
      'costPrice',
      'originalPrice',
      'barcode',
    ];
    filedsArr.forEach(item => {
      setFieldsValue({
        [`${item}_${data.key}`]: '',
      });
    });
  };

  onChange = value => {
    const id = value[value.length - 1];
    this.getDataById(id);
    this.getSpectById(id);
    this.setState({
      contentVisible: true,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.formItemRef);
    const { editorState, switchCheck, dataSource, SpecificationsData } = this.state;
    console.log(SpecificationsData);
    const validateFields1 = this.formItemRef.current.validateFields;
    const paramsvalidateFields = this.paramsFormRef.current.validateFields;

    let filedStatus1 = false;
    let filedStatus2 = false;
    let filedStatus3 = false;

    let obj = {};
    validateFields1((err, values) => {
      if (!err) {
        console.log(values);
        values.classifys = values.classifys.join(',');
        obj = { ...values };
        filedStatus1 = true;
      }
    });

    paramsvalidateFields((err, values) => {
      if (!err) {
        const paramsList = [];
        Object.keys(values).forEach(item => {
          if (isEmpty(values[item])) {
            const paramsObj = {};
            paramsObj.paramId = item;
            paramsObj.paramValueId = values[item];
            paramsList.push(paramsObj);
          }
        });
        obj = { ...obj, goodsSpuParam: paramsList };
      }
    });

    if (switchCheck) {
      const {
        form: { validateFields },
      } = this.props;

      validateFields((err, values) => {
        if (!err) {
          Object.keys(values).forEach(item => {
            // tainchong110
            if (item.indexOf('tainchong110') !== -1) {
              delete values[item];
            }
          });
          console.log(values);
          console.log(dataSource);
          const skuArr = [];
          Object.keys(values).forEach(item => {
            const skuItem = item.split('skuNo');
            if (skuItem.length > 1) {
              const skuObj = {};
              skuObj.skuNo = values[`skuNo${skuItem[1]}`];
              skuObj.stock = values[`stock${skuItem[1]}`];
              skuObj.status = values[`status${skuItem[1]}`];
              skuObj.weight = values[`weight${skuItem[1]}`];
              skuObj.volume = values[`volume${skuItem[1]}`];
              skuObj.currentPrice = values[`currentPrice${skuItem[1]}`];
              skuObj.costPrice = values[`costPrice${skuItem[1]}`];
              skuObj.originalPrice = values[`originalPrice${skuItem[1]}`];
              skuObj.barcode = values[`barcode${skuItem[1]}`];
              skuArr.push(skuObj);
            }
          });

          skuArr.forEach((item, index) => {
            const s = dataSource[index].idStr;
            item.specss = delStringLastOne(s);
            console.log(dataType(dataSource[index].goodsSkuPicture));
            item.goodsSkuPicture =
              dataType(dataSource[index].goodsSkuPicture) === 'Array'
                ? dataSource[index].goodsSkuPicture
                : [];
          });
          console.log(skuArr);

          filedStatus3 = true;
          obj = { ...obj, goodsSku: skuArr };
        }
      });

      if (filedStatus1 && filedStatus3) {
        console.log(obj);
        console.log(editorState.toHTML());
      }
    } else {
      const validateFields2 = this.formItemRef1.current.validateFields;
      validateFields2((err, values) => {
        if (!err) {
          console.log(values);
          filedStatus2 = true;
          obj = { ...values };
        }
      });
      if (filedStatus1 && filedStatus2) {
        console.log(obj);

        // 获取富文本里面的内容
        console.log(editorState.toHTML());
      }
    }
  };

  // 监听富文本的变化
  handleChange = editorState => {
    console.log(editorState.toHTML());
    this.setState({ editorState });
  };

  // 监听开关的变化
  switchChange = checked => {
    this.setState({
      switchCheck: checked,
    });
  };

  // 设置规格组合表格里面的数据
  setHeaderTableData = SpecificationsData => {
    console.log(SpecificationsData);
    const arr = [];
    SpecificationsData.forEach(item => {
      const itemList = item.specsAndCateOut;
      const minArr = [];

      itemList.forEach(listItem => {
        if (listItem.checked) {
          const specItemObj = {};
          specItemObj.specId = listItem.specId;
          specItemObj.id = listItem.id;
          specItemObj.valueName = listItem.valueName;
          specItemObj.specType = listItem.specType;
          minArr.push(specItemObj);
        }
      });

      if (minArr.length > 0) {
        arr.push(minArr);
      }
    });

    console.log(arr);

    let checkedSpecification = [];
    if (getArrayByArrays(arr).length === 1 && getArrayByArrays(arr)[0] === '') {
      checkedSpecification = [];
    } else {
      getArrayByArrays(arr).forEach(item => {
        const checkedObj = {};
        checkedObj.key = MathRandom();
        checkedObj.name = item.name;
        checkedObj.specInfo = item.specInfo;
        checkedObj.idStr = item.idStr;
        checkedObj.specType = item.specType;
        checkedSpecification.push(checkedObj);
      });
    }

    this.setState({
      dataSource: checkedSpecification,
    });
  };

  // 监听规格多选框的变化
  listChange = (e, value) => {
    const { SpecificationsData } = this.state;
    for (let i = 0; i < SpecificationsData.length; i += 1) {
      const { specsAndCateOut } = SpecificationsData[i];
      for (let j = 0; j < specsAndCateOut.length; j += 1) {
        if (value.id === specsAndCateOut[j].id) {
          specsAndCateOut[j].checked = e.target.checked;
          specsAndCateOut[j].specId = SpecificationsData[i].specId;
          specsAndCateOut[j].specType = SpecificationsData[i].specType;
        }
      }
    }

    this.setState(
      {
        SpecificationsData,
      },
      () => {
        this.setHeaderTableData(SpecificationsData);
      },
    );
  };

  // 监听规格输入框的变化
  listInputChange = (e, value) => {
    console.log(e.target.value);
    const { SpecificationsData } = this.state;
    for (let i = 0; i < SpecificationsData.length; i += 1) {
      const { specsAndCateOut } = SpecificationsData[i];
      for (let j = 0; j < specsAndCateOut.length; j += 1) {
        if (value.id === specsAndCateOut[j].id) {
          specsAndCateOut[j].valueName = e.target.value;
        }
      }
    }

    this.setState(
      {
        SpecificationsData,
      },
      () => {
        this.setHeaderTableData(SpecificationsData);
      },
    );

    console.log(SpecificationsData);
  };

  selectSpecImages = imgArr => {
    console.log(imgArr);
  };

  render() {
    const {
      options,
      formItemData,
      unifiedSpecForm,
      editorState,
      switchCheck,
      SpecificationsData,
      columns,
      dataSource,
      headerDataSource,
      headerColumns,
      contentVisible,
      paramsForm,
      specImgVisible,
    } = this.state;
    const { categoryLoading } = this.props;
    const cardDom = (
      <Switch
        checkedChildren="多规格"
        onChange={e => {
          this.switchChange(e);
        }}
        unCheckedChildren="统一规格"
      />
    );
    return (
      <div className={styles.addGoodsWrap}>
        <PageHeader onBack={() => router.goBack()} title="添加商品" />
        <Form onSubmit={this.handleSubmit}>
          <CardComponent title="选择主分类" style={{ marginBottom: 20 }}>
            <Spin spinning={categoryLoading}>
              <Cascader
                fieldNames={{ label: 'categName', value: 'id', children: 'children' }}
                style={{ width: '50%' }}
                options={options}
                onChange={this.onChange}
                placeholder="请选择主分类"
              />
            </Spin>
          </CardComponent>

          {contentVisible ? (
            <div>
              <CardComponent title="基础信息" style={{ marginBottom: 20 }}>
                <FormItemDom formData={formItemData} ref={this.formItemRef} />
              </CardComponent>
              <CardComponent title="商品参数" style={{ marginBottom: 20 }}>
                <FormItemDom formData={paramsForm} ref={this.paramsFormRef} />
              </CardComponent>
              <CardComponent title="商品规格" dom={cardDom}>
                {switchCheck ? (
                  <div className={styles.specificationsWrap}>
                    {SpecificationsData.map(item => {
                      return (
                        <div className={styles.specificationsList} key={item.specId}>
                          <div className={styles.specificationsTitle}>{item.specName}:</div>
                          <div className={styles.specificationsContent}>
                            <div className="clearfix">
                              {item.specsAndCateOut.map(listItem => {
                                return (
                                  <div
                                    className={styles.specificationsContentItem}
                                    key={listItem.id}
                                  >
                                    {item.specType === 1 ? (
                                      <div className={styles.itemImg}>
                                        <img alt="" src={showImg(listItem.valuePicture)} />
                                      </div>
                                    ) : null}
                                    <div className={styles.specificationsValues}>
                                      <div className="clearfix">
                                        <div className={styles.specificationsCheckBox}>
                                          <Checkbox
                                            onChange={e => {
                                              this.listChange(e, listItem);
                                            }}
                                          />
                                        </div>
                                        <div className={styles.specificationsInput}>
                                          {listItem.checked ? (
                                            <Input
                                              size="small"
                                              style={{ width: 80 }}
                                              onChange={e => {
                                                this.listInputChange(e, listItem);
                                              }}
                                              defaultValue={listItem.valueName}
                                            />
                                          ) : (
                                            listItem.valueName
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <Blockquote title="设置规格" />
                    <Table
                      showHeader={false}
                      dataSource={headerDataSource}
                      rowKey={record => record.key}
                      columns={headerColumns}
                      pagination={false}
                    />

                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      rowKey={record => record.key}
                    />
                  </div>
                ) : (
                  <FormItemDom formData={unifiedSpecForm} ref={this.formItemRef1} />
                )}
              </CardComponent>

              <CardComponent title="图文详情">
                <BraftEditor value={editorState} onChange={this.handleChange} />
              </CardComponent>
              <Button
                onClose={() => {
                  this.closeAdd();
                }}
                style={{ marginRight: 8 }}
              >
                取消
              </Button>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </div>
          ) : null}
        </Form>
        <CustomSelectImage
          visible={specImgVisible}
          onOk={imgArr => {
            this.selectSpecImages(imgArr);
          }}
          onCancel={() => this.setState({ specImgVisible: false })}
        />
      </div>
    );
  }
}
export default AddGoods;
