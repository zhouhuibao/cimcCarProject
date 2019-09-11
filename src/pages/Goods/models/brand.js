export default {
    namespace: 'brandModel',
    state: {
        type:'123',
        formItemData:[
            {
                domType: 'text',
                id: 'name',
                title: '品牌名',
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
                domType: 'upload',
                id: 'attach',
                title: '品牌logo',
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
        ]
    },
    effects: {

    },
    reducers: {
        addBrand(state, {payload}) {
            const {formItemData} = state;
            formItemData.forEach(item=>{
                // console.log(item.id)
                item.defaultValue = null
            })

            return {
              ...state,
              formItemData,
            };
        },
        editBrand(state, {payload}) {
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