import React,{Component} from 'react';
import {Drawer,Form,Button} from 'antd';
import {connect} from 'dva';
import FormItemDom from '@/components/CreateForm';
import {isEmpty} from '@/utils/utils'

@connect(({ specificationsModel }) => ({
    specificationsModel,
  }))
@Form.create()
class AddsSpecifications extends Component {
    constructor(props){
        super(props)
        this.formItemRef = React.createRef();
    }

    state={
        type:0,
        formItemData:[
            {
                domType: 'text',
                id: 'name',
                title: '规格名称',
                required: true,
                domAttr: {},
                defaultValue:null,
                fieldAttr: {
                  rules: [
                    {
                      message:'请输入品牌名',
                      required: true,
                    },
                  ],
                }
            },
            {
                domType: 'TextArea',
                id: 'attach',
                title: '规格备注',
                defaultValue:null,
                domAttr: {},
                fieldAttr: {}
            },
            {
                domType: 'Radio',
                id: 'type',
                title: '规格类型',
                defaultValue:0,
                // required: true,
                domAttr: {
                    onChange:(e)=>{
                        console.log(e.target.value)
                    }
                },
                fieldAttr: {
                },
                options: [
                    { label: '文字', value: 0},
                    { label: '图片', value: 1},
                ]
            },
        ]
    }

    componentDidMount(){
        console.log('组件已加载')
    }   
    
    componentWillUpdate(nextProps, nextState){
        this.setFormDefaultValue(nextProps, nextState)                                                                                                                                             
    }

    // componentDidUpdate(nextProps, nextState){
    //     this.setFormDefaultValue(nextProps, nextState)                                                                                                                                             
    // }
    
    setFormDefaultValue=(nextProps, nextState)=>{
        console.log(nextProps)
        console.log(nextState)
        const {visible,title,editData} = nextProps;
        const {formItemData} = nextState;
        console.log(this.formItemRef.current)

        if(isEmpty(this.formItemRef.current)){
            const {setFieldsValue} = this.formItemRef.current;
            if(visible && title === '修改规格'){
              formItemData.forEach(item=>{
                console.log(editData[item.id])
                setFieldsValue({
                    [item.id]:editData[item.id]
                  })
              })
            }else if(visible && title === '新增规格'){
              formItemData.forEach(item=>{
                    let data = null
                    if(item.id === 'type'){
                        data = 0
                    }
                    setFieldsValue({
                        [item.id]:data
                    })
              })
            }
        }else{
            formItemData.forEach(item=>{
                item.defaultValue = ''
            })
            this.setState({
                formItemData
            })
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
        const {onClose,visible,title} = this.props;
        const {formItemData,type} = this.state;
        console.log(formItemData)                      
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
                    <div style={{width:80,textAlign:'center',marginBottom:15}}>规格值</div>
                    {type === 0 ? <div>类型1</div> : <div>类型2</div>}

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
export default AddsSpecifications