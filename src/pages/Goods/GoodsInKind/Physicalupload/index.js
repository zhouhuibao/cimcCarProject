import React, { Component } from 'react';
import {Alert,Button,Table} from 'antd';
import moment from 'moment';
import {isEmpty} from '@/utils/utils'
import fileJSON from './fileJSON.json'

class Physicalupload extends Component {

  state={
    data:fileJSON,
    columns:[
      {
        title:'上传文件',
        dataIndex: 'file_name'
      },
      {
        title:'上传时间',
        dataIndex: 'created_date'
      },
      {
        title:'文件大小',
        dataIndex: 'file_size_format'
      },
      {
        title:'处理状态',
        dataIndex: 'handle_status'
      }
      ,{
        title:'处理完成时间',
        dataIndex:'updated',
        render:(text)=>{
          return moment(text*1000).format("YYYY-MM-DD HH:MM:SS")
        }
      },
      {
        title:'处理成功',
        render:(text,record)=>{
          return `${ isEmpty(record.handle_message) ? record.handle_message.successLine  : 0}行`
        }
      },
      {
        title:'处理失败',
        render:(text,record)=>{
          return `${ isEmpty(record.handle_message) ? record.handle_message.errorLine  : 0}行`
        }
      }
    ]
  }

  render() {
    const {data,columns} = this.state;
    return (
      <div>
        <Alert message={<div><div>上传文件如果有处理失败的行数后将会生成错误文件，请及时查看错误信息修改后重新下载，错误描述文件只保留15天。</div><div>超过15天的错误描述文件将会删除，不再提供下载查看</div></div>} type="warning" />
        <div style={{margin:'10px 0'}}>
          <Button style={{marginRight:10}} type='primary'>点击上传</Button>
          <Button type='primary'>下载模板</Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey={record => record.id} 
        />
      </div>
    );
  }
}
export default Physicalupload;
