import React, { Component } from 'react';
import { Drawer, Cascader, Form, Button, Switch,Checkbox,Input,Table,Popconfirm,InputNumber } from 'antd';
import BraftEditor from 'braft-editor';
import FormItemDom from '@/components/CreateForm';
import CardComponent from '@/components/CardComponent';
import UploadImg from '@/components/UploadImg';
import Blockquote from '@/components/Blockquote'
import 'braft-editor/dist/index.css';
import styles from './styles.less';
import {MathRandom,isEmpty} from '@/utils/utils';

function getValuesByArray(arr1,arr2){  
    const arr = [];  
    for(let i=0;i<arr1.length;i+=1)  
    {  
      const v1 = arr1[i];  
        for(let j=0;j<arr2.length;j+=1)  
        {  
          const v2 = arr2[j];  
          const value =`${v1} ${v2}`;  
          arr.push(value);  
        };  
    };  
    return arr;  
}

function getArrayByArrays(arrays){  
    let arr = [""];  
    for(let i = 0;i<arrays.length;i+=1){  
        arr = getValuesByArray(arr,arrays[i]);  
    }  
    return arr;  
}  
      
    

@Form.create()
class AddGoods extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
    this.formItemRef1 = React.createRef();
  }

  state = {
    dataSource:[],
    headerDataSource:[
      {
        key:'tainchong110',
        name:'批量填充',
        address:'',
        age:'',
        address1:'',
        address2:'',
        address3:'',
        address4:'',
        address5:'',
      },
    ],
    headerColumns:[],
    columns:[],
    switchCheck:false,
    editorState: BraftEditor.createEditorState(null),
    SpecificationsData:[],
    formItemData: [
      {
        domType: 'text',
        id: 'controlsId1',
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
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'text',
        id: 'controlsId2',
        title: '副标题',
        required: true,
        domAttr: {},
        fieldAttr: {},
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'select',
        id: 'approvalStatus3',
        title: '运费模板',
        domAttr: {
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
        id: 'approvalStatus4',
        title: '品牌',
        domAttr: {
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
        options: [
          {
            key: '小米',
            value: '0',
          },
          {
            key: 'iphone',
            value: '1',
          },
          {
            key: 'oppo',
            value: '2',
          },
        ],
      },
      {
        domType: 'text',
        id: 'controlsId5',
        title: '计量单位',
        required: true,
        domAttr: {},
        fieldAttr: {},
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'text',
        id: 'controlsId6',
        title: '排序编号',
        required: true,
        domAttr: {},
        fieldAttr: {},
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'select',
        id: 'approvalStatus7',
        title: '商品分类',
        domAttr: {
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
        options: [
          {
            key: '小米',
            value: '0',
          },
          {
            key: 'iphone',
            value: '1',
          },
          {
            key: 'oppo',
            value: '2',
          },
        ],
      },
    ],

    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ],
  };

  componentDidMount(){
    this.setColumns('headerColumns')
    this.setColumns('columns')

    const arr = [];
    for(let i=0;i<3;i+=1){
      const obj={};
      obj.id =MathRandom();
      obj.title = `类别${i}`;
      const list =[];
      for(let j=0;j<4;j+=1){
        const listObj ={};
        listObj.id =MathRandom();
        listObj.value=`${10+j}ml`;
        listObj.checked =false
        list.push(listObj)
      }
      obj.list =list
      arr.push(obj)
    }

    this.setState({
      SpecificationsData:arr
    })
  }


  // 设置表头
  setColumns=(type)=>{
    const columnsArr = [
      {
        title: '规格值',
        dataIndex: 'name',
        key: 'name',
        width:130
      },
      {
        title: <div style={{color:'red'}}>*状态</div>,
        dataIndex: 'age',
        key: 'age',
        render: (text, record) => {
          const { form:{getFieldDecorator} } = this.props;
          return(
            <Form.Item>
              {getFieldDecorator(`age_${record.key}`,{
                initialValue:record[`age_${record.key}`],
                rules: type === 'headerColumns' ? null : [{ required: true, message: '状态不能为空' }],
              })(
                <InputNumber />
              )}
            </Form.Item>
          )
        }
      },
      {
        title:  <div style={{color:'red'}}>*库存</div>,
        dataIndex: 'address',
        key: 'address',
        render: (text, record) => {
          const { form:{getFieldDecorator} } = this.props;
          return(
            <Form.Item>
              {getFieldDecorator(`address_${record.key}`,{
                initialValue:record[`address_${record.key}`],
                rules: type === 'headerColumns' ? null : [{ required: true, message: '库存不能为空' }],
              })(
                <Input style={{width:90}} />
              )}
            </Form.Item>
          )
        }
      },
      {
        title: '货号',
        dataIndex: 'address1',
        key: 'address1',
        render: (text, record) => {
          const { form:{getFieldDecorator} } = this.props;
          return(
            <Form.Item>
              {getFieldDecorator(`address1_${record.key}`,{
                initialValue:record[`address1_${record.key}`],
              })(
                <Input style={{width:90}} />
              )}
            </Form.Item>
          )
        }
      },
      {
        title: '重量(kg)',
        dataIndex: 'address2',
        key: 'address2',
        render: (text, record) => {
          const { form:{getFieldDecorator} } = this.props;
          return(
            <Form.Item>
              {getFieldDecorator(`address2_${record.key}`,{
                initialValue:record[`address2_${record.key}`],
              })(
                <Input style={{width:90}} />
              )}
            </Form.Item>
          )
        }
      },
      {
        title: '销售价',
        dataIndex: 'address3',
        key: 'address3',
        render: (text, record) => {
          const { form:{getFieldDecorator} } = this.props;
          return(
            <Form.Item>
              {getFieldDecorator(`address3_${record.key}`,{
                initialValue:record[`address3_${record.key}`],
              })(
                <Input style={{width:90}} />
              )}
            </Form.Item>
          )
        }
      },
      {
        title: '成本价',
        dataIndex: 'address4',
        key: 'address4',
        render: (text, record) => {
          const { form:{getFieldDecorator} } = this.props;
          return(
            <Form.Item>
              {getFieldDecorator(`address4_${record.key}`,{
                initialValue:record[`address4_${record.key}`],
              })(
                <Input style={{width:90}} />
              )}
            </Form.Item>
          )
        }
      },
      {
        title: '原价',
        dataIndex: 'address5',
        key: 'address5',
        render: (text, record) => {
          const { form:{getFieldDecorator} } = this.props;
          return(
            <Form.Item>
              {getFieldDecorator(`address5_${record.key}`,{
                initialValue:record[`address5_${record.key}`],
              })(
                <Input style={{width:90}} />
              )}
            </Form.Item>
          )
        }
      },
    ]

    const obj ={
      title:'操作',
      dataIndex: 'delete',
      key: 'delete'
    }

    
    if(type === 'headerColumns'){
      obj.render=(text, record, index) => {
        return <a onClick={()=>{this.addColData(text, record, index)}}>填充</a>
      }
    }else{
      obj.render=(text, record) => {
        return(
          <Popconfirm
            title="确定要清空这条数据吗?"
            onConfirm={(e) => {
              this.deleteTableDate(e, record)
            }}
            okText="确定"
            cancelText="取消"
          >
            <a>清空</a>
          </Popconfirm>
        )
      }
    }

    columnsArr.push(obj)

    this.setState({
      [type]:columnsArr
    })

  }

  // 填充列数据
  addColData=(e,record)=>{
    console.log(record);  
    const {form:{getFieldValue,setFieldsValue}} = this.props
    Object.keys(record).forEach(item=>{
      if(item !== 'name' || item !== 'key'){
        // 获取需要批量填充的值
        const currentValue =getFieldValue(`${item}_${record.key}`)
        // if(isEmpty(currentValue)){
          const {dataSource} = this.state;
          dataSource.forEach(dataItem=>{
            setFieldsValue({
              [`${item}_${dataItem.key}`]:currentValue
            })
          })
        // }
      }

    })
  }


  // 清空表格里面的一条数据
  deleteTableDate=(e, data)=>{
    const {form:{setFieldsValue}} = this.props;
    const filedsArr = ['age','address','address1','address2','address3','address4','address5',]
    filedsArr.forEach(item=>{
      setFieldsValue({
        [`${item}_${data.key}`]:''
      })
    })
  }

  onChange = value => {
    console.log(value);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.formItemRef);
    const {editorState,switchCheck} = this.state;
    const validateFields1 = this.formItemRef.current.validateFields;
    let filedStatus1 = false;
    let filedStatus2 = false;
    let filedStatus3 = false;

    let obj = {};
    validateFields1((err, values) => {
      if (!err) {
        console.log(values);
        obj = { ...values };
        filedStatus1 = true;
      }
    });

    if(switchCheck){
      const {form:{validateFields}} = this.props;

      validateFields((err, values) => {
        if (!err) {
          Object.keys(values).forEach(item=>{
            // tainchong110
            if(item.indexOf('tainchong110') !== -1){
              delete values[item]
            }
          })
          console.log(values);

          filedStatus3 = true;
          obj = { ...values };
        }
      });

      if(filedStatus1 && filedStatus3){
        console.log(obj);
        console.log(editorState.toHTML())
      }
    }else{
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
        console.log(editorState.toHTML())
  
      }

    }
    


    
  };

  // 监听富文本的变化
  handleChange = (editorState) => {
    console.log(editorState.toHTML())
    this.setState({ editorState })
  }

  // 监听开关的变化
  switchChange=(checked)=>{
    console.log(checked);
    this.setState({
      switchCheck:checked,
      // dataSource:[]
    })
  }

  // 监听规格多选框的变化
  listChange=(e,value)=>{
    const {SpecificationsData} = this.state;
    for(let i=0;i<SpecificationsData.length;i+=1){
      const {list} = SpecificationsData[i];
      for(let j=0;j<list.length;j+=1){
        if(value.id === list[j].id){
          list[j].checked = e.target.checked
        }


      }
    }
    this.setState({
      SpecificationsData
    },()=>{
      const arr =[];
      SpecificationsData.forEach(item=>{
        const itemList = item.list;
        const minArr =[]
        itemList.forEach(listItem=>{
          if(listItem.checked){
            minArr.push(listItem.value)
          }
        })

        if(minArr.length>0){
          arr.push(minArr)
        }

      })

      let checkedSpecification = [];
      if(getArrayByArrays(arr).length === 1 && getArrayByArrays(arr)[0] === ''){
        checkedSpecification =[]
      }else{
        getArrayByArrays(arr).forEach(item=>{
          const checkedObj = {};
          checkedObj.key=MathRandom();
          checkedObj.name=item;
          checkedSpecification.push(checkedObj)
        })
      }
      
      this.setState({
        dataSource:checkedSpecification
      })
      

    })

  }

  changeTable=(e,value)=>{
    console.log(e)
  }


  // 监听规格输入框的变化
  listInputChange=(e,value)=>{
    console.log(e.target.value)
    const {SpecificationsData} = this.state;
    for(let i=0;i<SpecificationsData.length;i+=1){
      const {list} = SpecificationsData[i];
      for(let j=0;j<list.length;j+=1){
        if(value.id === list[j].id){
          list[j].value = e.target.value
        }
      }
    }
  }

  render() {
    const { visible, onClose } = this.props;
    // const {options} = this.state;
    const { options, formItemData, editorState,switchCheck,SpecificationsData,columns,dataSource,headerDataSource,headerColumns } = this.state;
    const cardDom = <Switch checkedChildren="多规格" onChange={(e)=>{this.switchChange(e)}} unCheckedChildren="统一规格" />;
    return (
      <div className={styles.addGoodsWrap}>
        <Drawer
          title="添加商品"
          width='80%'
          onClose={onClose}
          visible={visible}
          className={styles.addGoodsWrap}
        >
          <Form onSubmit={this.handleSubmit}>
            <CardComponent title="选择主分类" style={{ marginBottom: 20 }}>
              <Cascader
                style={{ width: '50%' }}
                options={options}
                onChange={this.onChange}
                placeholder="请选择主分类"
              />
            </CardComponent>
            <CardComponent title="基础信息" style={{ marginBottom: 20 }}>
              <FormItemDom formData={formItemData} ref={this.formItemRef} />

              <div className={styles.itemWrap}>
                <p className={styles.itemLabel}>
                  <span style={{ color: 'red' }}>*</span>商品图
                </p>
                <div className={styles.itemContent}>
                  <UploadImg />
                </div>
              </div>
            </CardComponent>
            <CardComponent title="商品规格" dom={cardDom}>
              {
                switchCheck ? 
                <div className={styles.specificationsWrap}>
                  {
                    SpecificationsData.map((item)=>{
                      return(
                        <div className={styles.specificationsList} key={item.id}>
                          <div className={styles.specificationsTitle}>
                            {item.title}:
                          </div>
                          <div className={styles.specificationsContent}>
                            <div className='clearfix'>
                              {item.list.map((listItem)=>{
                                return(
                                  <div className={styles.specificationsContentItem} key={listItem.id}>
                                      <div className={styles.itemImg}>
                                          <img alt='' src='http://mmbiz.qpic.cn/mmbiz_jpg/Hw4SsicubkrcUYGfibradQQ1x5GGJJwD9aj4q3zN0y7UibgU1BMOlPQz6lG8R8fcWicy7bR2a4r0rAsvkVqYf8RTiaQ/0?wx_fmt=jpeg' />
                                      </div>
                                      <div className={styles.specificationsValues}>
                                          <div className='clearfix'>
                                            <div className={styles.specificationsCheckBox}>
                                              <Checkbox onChange={(e)=>{this.listChange(e,listItem)}} />
                                            </div>
                                            <div className={styles.specificationsInput}>
                                              {listItem.checked ?  <Input size='small' style={{width:80}} onChange={(e)=>{this.listInputChange(e,listItem)}} defaultValue={listItem.value} /> : listItem.value }
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                                )
                              })}
                              
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  
                 <Blockquote title='设置规格图片' />
                 <Blockquote title='设置规格' />
                 <Table 
                   showHeader={false}
                   dataSource={headerDataSource} 
                   columns={headerColumns}
                   pagination={false}
                 />
                 <Table 
                   dataSource={dataSource} 
                   columns={columns}
                 />
                </div> 
                :
              <FormItemDom formData={formItemData} ref={this.formItemRef1} />
              }
            </CardComponent>

            <CardComponent title="图文详情">
                <BraftEditor value={editorState} onChange={this.handleChange} />
            </CardComponent>

            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
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
          </Form>
        </Drawer>
      </div>
    );
  }
}
export default AddGoods;
