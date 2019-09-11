import React, { Component } from 'react';
import {Button,Input,Table,Popconfirm} from 'antd';
import {connect} from 'dva';
import AddGoodsData from './AddGoodsData';
import styles from '../../goodsStyles.less'
import CityJSON from '@/utils/city.json'


const { Search } = Input;
@connect(({ specificationsModel }) => ({
  specificationsModel,
}))
class GoodsData extends Component {
  state ={
    addTitle:'',
    columns:[
      {
        title: '参数类型',
        dataIndex: 'typeName',
        align:'center',
        key: 'typeName'
      },
      {
        title: '参数名称',
        dataIndex: 'name',
        align:'center',
        key: 'name'
      },
      {
        title: '参数备注',
        dataIndex: 'remake',
        key: 'remake'
      },
      {
        title:'操作',
        dataIndex:'edit',
        key:'edit',
        align:'center',
        width:150,
        render:(text,record)=>{
          return(
              <div>
                <a onClick={()=>{this.editBrand(record)}}>编辑 </a>
                &ensp;
                
                <Popconfirm
                  title="确定删除该参数?"
                  onConfirm={(e) => {
                    this.deleteTableDate(e, record)
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <a>删除</a>
                  
                </Popconfirm>
              </div>
          )
        }
      }
    ],
    editData:null,
    dataSource:[
      {
        typeName:'图片',
        type:1,
        name:'挂车管家1',
        description:'尺码  颜色  材质  风格'
      },
      {
        typeName:'文字',
        type:0,
        name:'挂车管家2',
        description:'尺码  颜色  材质  风格'
      }
    ],
    visible:false
  }

  componentDidMount(){
    console.log(CityJSON.data)
  }

  editBrand=(record)=>{
    const {dispatch} = this.props;
    dispatch({
      type:'specificationsModel/editSpecifications',
      payload:record
    })
    this.setState({
      editData:record,
      visible:true,
      addTitle:'修改参数'
    })
  }

  deleteTableDate=(e,record)=>{
    console.log(e)
    console.log(record)
  }

  addGoodsBrand=()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'specificationsModel/addSpecifications'
    })
    this.setState({
      visible:true,
      addTitle:'新增参数'
    })
  }

  closeAdd=()=>{
    this.setState({
      visible:false
    })
  }

  render() {
    const {columns,dataSource,visible,addTitle,editData} = this.state;
    return (
      <div className={styles.goodsBrand}>
        <div className={styles.goodsBrandHeader}>
            <div className={styles.addBtn}>
            <Button
              type="primary"
              icon="plus"
              onClick={()=>{this.addGoodsBrand()}}
            >
              新增参数
            </Button>
            </div>
            <div className={styles.search}>
              <Search placeholder="请输入参数名称" onSearch={value => console.log(value)} enterButton />
            </div>
        </div>
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
        />
        <AddGoodsData
          visible={visible}
          title={addTitle}
          editData={editData}
          onClose={() => {
            this.closeAdd();
          }}
        />

      </div>
    );
  }
}
export default GoodsData;
