export default {
    namespace: 'specificationsModel',
    state: {
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
                // required: true,
                domAttr: {},
                fieldAttr: {
                //   rules: [
                //     {
                //       required: true,
                //     },
                //   ],
                }
            },
            {
                domType: 'Radio',
                id: 'type',
                title: '规格类型',
                defaultValue:0,
                // required: true,
                domAttr: {
                    onChange:(e)=>{
                        console.log()
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
    },
    effects: {

    },
    reducers: {
        addSpecifications(state, {payload}) {
            const {formItemData} = state;
            formItemData.forEach(item=>{
                if(item.domType === 'Radio'){
                    item.defaultValue = 0
                }else{
                    item.defaultValue = null
                }
            })

            return {
              ...state,
              formItemData,
            };
        },
        editSpecifications(state, {payload}) {
            console.log(payload)
            const {formItemData} = state;
            formItemData.forEach(item=>{
                item.defaultValue = payload[item.id]
            })
            return {
              ...state,
              formItemData,
            };
        },
    },
};