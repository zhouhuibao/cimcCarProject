

import React,{Component} from 'react';
import {Drawer,Form,Alert,Table,Row,Col,Button} from 'antd';
import {connect} from 'dva';
import tableJSON from './table.json';
import specificationJSON from './guige.json';

@connect(({ specificationsModel }) => ({
    specificationsModel,
  }))
@Form.create()
class SpecificationOrDataModal extends Component {

    state={
        dataList:tableJSON,
        // specificationDataList:specificationJSON,
        columns:[
            {
                title: '全部',
                dataIndex: 'attribute_name',
            },
        ],
        selectList:[],
        selectColumns:[
            {
                title: `已选择`,
                dataIndex: 'attribute_name',
            }
        ],
        selectedRowKeys:[]

    }


    componentDidMount(){
        console.log('组件已加载')

    }   

    setDefaultData=()=>{
        const {type} = this.props;
        let list =[]
        let selectList =[]
        if(type === 'specification'){ // 当前是关联规格
            list=[]
            selectList =[]
            list.forEach((item)=>{
                specificationJSON.forEach(listItem=>{
                    if(item === listItem.attribute_id){
                        selectList.push(listItem)
                    }
                })
            })

            this.setState({
                selectList,
                dataList:specificationJSON,
                selectedRowKeys:list
            })
        }else{
            list = ['434','410','454']
            selectList =[]
            list.forEach((item)=>{
                tableJSON.forEach(listItem=>{
                    if(item === listItem.attribute_id){
                        selectList.push(listItem)
                    }
                })
            })
            this.setState({
                selectList,
                dataList:tableJSON,
                selectedRowKeys:list
            })
        }
    }

    
    handleSubmit = e => {
        e.preventDefault();
        const {form:{validateFields}} = this.props;

        validateFields((err, values) => {
            if (!err) {
              console.log(values);
            }
        });
    }

   

    getChilderDom=(record)=>{
        const {list} = record.attribute_values;
        let dom='';
        list.forEach(item=>{
             dom+=`<span style='padding:0 10px;line-height:30px;background-color: hsla(220,4%,58%,.1);
             border:1px solid hsla(220,4%,58%,.2);display:inline-block;height:30px;margin:0 10px 5px 0;border-radius:5px'>${item.attribute_value}</span>`
        })
        return <div dangerouslySetInnerHTML={{__html: dom}} /> 
    }

    


    afterVisibleChange=(visible)=>{
        if(visible){
            this.setDefaultData()
        }
    }



    render(){
        const {onClose,visible,title} = this.props;
        const {dataList,columns,selectColumns,selectList,selectedRowKeys} = this.state;
        console.log(dataList)
        const rowSelection = {
            onChange: (selectedRowKeyss, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys:selectedRowKeyss,
                    selectList:selectedRows
                })
            },
            selectedRowKeys
        };
        
        return (
            <Drawer
              title={title}
              width='800'
              onClose={onClose}
              visible={visible}
              className='formDrawer'
              afterVisibleChange={this.afterVisibleChange}
            >
                <Alert
                  message="关联说明"
                  description="类目最多关联20个商品参数和3个规格，并且只能关联一个图片属性规格"
                  type="info"
                  closable
                  style={{marginBottom:20}}
                />
                <Row gutter={16}>
                    <Col span={12}>
                    <Table 
                      rowSelection={rowSelection} 
                      columns={columns} 
                      dataSource={dataList} 
                      rowKey={record => record.attribute_id} 
                      expandedRowRender={this.getChilderDom}
                    />
                    </Col>
                    <Col span={12}>
                    <Table 
                      columns={selectColumns} 
                      dataSource={selectList} 
                      rowKey={record => record.attribute_id} 
                    />
                    </Col>
                </Row>

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
            </Drawer>
        )
    }
}  
export default SpecificationOrDataModal