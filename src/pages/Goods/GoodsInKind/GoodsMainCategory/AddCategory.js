import React,{Component} from 'react';
import {Drawer,Form,Button,Input,InputNumber} from 'antd';
import {connect} from 'dva';
import styles from '../../goodsStyles.less';

const FormItem = Form.Item;

@connect(({ specificationsModel }) => ({
    specificationsModel,
  }))
@Form.create()
class AddCategory extends Component {

    state={
        dataList:[]
    }

    componentDidMount(){
        console.log('组件已加载')
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



    render(){
        const {onClose,visible,title,form:{getFieldDecorator},isEdit,initValue} = this.props;
        return (
            <Drawer
              title={title}
              width='500'
              onClose={onClose}
              visible={visible}
            >
                <Form
                  onSubmit={this.handleSubmit}
                  className={styles.AddGoodsData}
                >
                    <div>
                        目录名称
                        <FormItem>
                        {
                            getFieldDecorator('name', {
                                initialValue: isEdit ? initValue.name : null,
                                rules: [{required: true, message: '目录名称不能为空'}]
                            })(
                              <Input placeholder='请输入目录名称' />
                            )
                        }
                        </FormItem>
                    </div>
                    <div>
                        目录排序
                        <FormItem>
                        {
                            getFieldDecorator('sort', {
                                initialValue: isEdit ? initValue.remark : null,
                                rules: [{required: true, message: '目录排序不能为空'}]
                            })(
                              <InputNumber style={{width:'100%'}} placeholder='请输入目录排序' min={0} />
                            )
                        }
                        </FormItem>
                    </div>

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
        )
    }
}
export default AddCategory