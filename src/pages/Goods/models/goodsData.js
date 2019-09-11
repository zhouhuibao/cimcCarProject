export default {
    namespace: 'goodsDataModel',
    state: {
        type:0,
    },
    effects: {

    },
    reducers: {
        addGoodData(state, {payload}) {
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
        delGoodData(state, {payload}) {
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