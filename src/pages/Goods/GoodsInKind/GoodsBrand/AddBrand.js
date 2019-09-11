import React,{Component} from 'react';
import {Drawer,Form,Button} from 'antd';
import {connect} from 'dva';
import FormItemDom from '@/components/CreateForm';
import {isEmpty} from '@/utils/utils'

@connect(({ brandModel }) => ({
    brandModel,
  }))
@Form.create()
class AddBrand extends Component {
    constructor(props){
        super(props)
        this.formItemRef = React.createRef();
    }

    state={
    }

    componentDidMount(){
        // const {} = this.formItemRef.current;
        console.log('123123123123')
        console.log(this)
    }


    setFormDefaultValue=()=>{
        const {visible,title,brandModel:{formItemData}} = this.props;
        if(isEmpty(this.formItemRef.current)){
            const {setFieldsValue} = this.formItemRef.current;
            if(visible && title === '修改品牌'){
              formItemData.forEach(item=>{
                  setFieldsValue({
                    [item.id]:item.defaultValue
                  })
              })
            }else if(visible && title === '新增品牌'){
              formItemData.forEach(item=>{
                setFieldsValue({
                  [item.id]:null
                })
              })
            }
        }
        
    }


    

    handleSubmit = e => {
        e.preventDefault();
        const {validateFields} = this.formItemRef.current;

        validateFields((err, values) => {
            if (!err) {
              console.log(values);
            }
        });


    }


    render(){
        const {onClose,visible,title,brandModel:{type,formItemData}} = this.props;
        console.log(type)
        console.log(formItemData)                      
        this.setFormDefaultValue()                                                                                                                                             
        return (
            <Drawer
              title={title}
              width='500'
              onClose={onClose}
              visible={visible}
            >
                <Form
                  onSubmit={this.handleSubmit}
                >
                    <FormItemDom formData={formItemData} ref={this.formItemRef} />
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
export default AddBrand