import React, { Component } from 'react';
import {Table,Icon,Input,InputNumber} from 'antd';
import moment from 'moment';
import dataJSON from './category.json';
import {isUrl} from '@/utils/utils' 

class GoodsCategory extends Component {

  state={
    expandedRowKeys:[],
    columns:[
      {
        title: '分类名称',
        dataIndex: 'category_name',
        render:(text,record)=>{
          return (
            <>
              <Input defaultValue={text} size='small' style={{width:120}} onBlur={()=>{this.sortBlur(record)}} /> 
              {record.category_level === 1 ? <a style={{marginLeft:10}}><Icon type="plus" /> 增加子分类</a> :null }
            </>
          )
        }
      },
      {
        title: '分类排序',
        dataIndex: 'sort',
        render:(text,record)=>{
          return <InputNumber size='small' style={{width:60}} min={0} defaultValue={text} onBlur={()=>{this.sortBlur(record)}} />
        }
      },
      {
        title: '图片',
        dataIndex: 'image_url',
        render:(text,record)=>{
          return isUrl(text) ?<img src={text} style={{width:40,height:40}} alt='分类图片' /> : <Icon type="picture" />
        }
      },
      {
        title: '创建时间',
        dataIndex: 'created',
        align:'center',
        render:(text)=>{
          return moment(text*1000).format("YYYY-MM-DD")
        }
      },
      {
        title: '操作',
        dataIndex: 'edit',
        width:130,
        align:'center',
        render:(text,record)=>{
          return (
            <div>
              <a style={{marginRight:10}}>查看商品</a>
              <Icon type="delete" style={{cursor:'pointer'}} />
            </div>
          )
        }
      },
    ],
    data:dataJSON
  }

  componentDidMount(){
    console.log(dataJSON)
    const arr =[]
    dataJSON.forEach(item=>{
      arr.push(item.id)
    })
    this.setState({
      expandedRowKeys:arr
    })
  }

  sortBlur=(record)=>{
    console.log(record)
  }

  handleOnExpand =(expanded, record)=>{
    const {expandedRowKeys} =this.state;
    if(expanded){
      expandedRowKeys.push(record.id)
    }else{
      expandedRowKeys.forEach((item,i)=>{
        if(record.id === item){
          expandedRowKeys.splice(i, 1)
        }
      })
    }
    this.setState({
      expandedRowKeys
    })
  }

  render() {
    const {columns,data,expandedRowKeys} = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
    return (
      <div>
        <Table columns={columns} dataSource={data} rowKey={record => record.id} onExpand={this.handleOnExpand} expandedRowKeys={expandedRowKeys} />
      </div>
    );
  }
}
export default GoodsCategory;
