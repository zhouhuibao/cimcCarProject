import React, { Component } from 'react';
import {Button,Input,Table,Popconfirm} from 'antd';
import {connect} from 'dva';
import AddBrand from './AddBrand';
import styles from '../../goodsStyles.less'

const { Search } = Input;
@connect(({ brandModel }) => ({
  brandModel,
}))
class GoodsBrand extends Component {
  state ={
    addTitle:'',
    columns:[
      {
        title: '品牌图片',
        dataIndex: 'pic',
        width:170,
        key: 'pic',
        render: (text,record) => {
          return <img style={{width:60}} src={record.imgUrl} alt='品牌logo' />
        },
      },
      {
        title: '品牌名称',
        dataIndex: 'name',
        align:'center',
        key: 'name'
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
                  title="确定删除该品牌?"
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
        imgUrl:'http://b-img-cdn.yuanyuanke.cn/21/2019/09/09/7e7e66cd3cc725b3e66e40bcb817ce6fMGEVX0lTVCfPjeC85hEQSnLg4v4g6Mvl',
        name:'挂车管家'
      }
    ],
    visible:false
  }

  editBrand=(record)=>{
    const {dispatch} = this.props;
    dispatch({
      type:'brandModel/editBrand',
      payload:record
    })
    this.setState({
      editData:record,
      visible:true,
      addTitle:'修改品牌'
    })
  }

  deleteTableDate=(e,record)=>{
    console.log(e)
    console.log(record)
  }

  addGoodsBrand=()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'brandModel/addBrand'
    })
    console.log('add')
    this.setState({
      visible:true,
      addTitle:'新增品牌'
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
              新增品牌
            </Button>
            </div>
            <div className={styles.search}>
              <Search placeholder="请输入品牌名称" onSearch={value => console.log(value)} enterButton />
            </div>
        </div>
        <Table columns={columns} dataSource={dataSource} />
        <AddBrand
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
export default GoodsBrand;
