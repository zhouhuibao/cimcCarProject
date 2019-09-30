import React, { Component } from 'react';
import { Drawer, Form, Button, Input, Radio, Icon } from 'antd';
import { connect } from 'dva';
import { MathRandom } from '@/utils/utils';
import styles from '../../goodsStyles.less';

const FormItem = Form.Item;

@Form.create()
@connect(({ specificationsModel }) => ({
  specificationsModel,
}))
class AddGoodsData extends Component {
  state = {
    defaultType: 0,
    options: [{ label: '支持商品高级筛选', value: 0 }, { label: '仅用于商品详情展示', value: 1 }],
  };

  componentDidMount() {
    console.log('组件已加载');
  }

  render() {
    const {
      onClose,
      onOk,
      visible,
      isEdit,
      form: { getFieldDecorator },
      initValue,
      dataList,
      addLoading,
      editLoading,
      changeInput,
      addDataItem,
      deleteRow,
    } = this.props;
    const { defaultType, options } = this.state;
    console.log(dataList);
    return (
      <Drawer
        title={isEdit ? '修改参数' : '添加参数'}
        destroyOnClose
        width="500"
        onClose={onClose}
        visible={visible}
      >
        <Form onSubmit={onOk} className={styles.AddGoodsData}>
          <div>
            参数名称
            <FormItem>
              {getFieldDecorator('specName', {
                initialValue: isEdit ? initValue.specName : null,
                rules: [{ required: true, message: '请输入参数名称' }],
              })(<Input placeholder="请输入参数名称" />)}
            </FormItem>
          </div>
          <div>
            参数备注
            <FormItem>
              {getFieldDecorator('remark', {
                initialValue: isEdit ? initValue.remark : null,
              })(<Input placeholder="请输入参数备注" />)}
            </FormItem>
          </div>

          <div className={styles.formItem}>
            <div className={styles.label}>参数类型</div>
            <div className={styles.radio}>
              <FormItem>
                {getFieldDecorator('specType', {
                  initialValue: isEdit ? initValue.specType : defaultType,
                })(<Radio.Group options={options} onChange={this.typeChange} />)}
              </FormItem>
            </div>
          </div>

          <div>
            参数值
            {dataList.map((item, i) => {
              return (
                <div className={styles.dataItem} key={item.id}>
                  {defaultType === 0 ? null : (
                    <div className={styles.crmera}>
                      <Icon type="camera" />
                    </div>
                  )}
                  <div className={styles.dataInput}>
                    <Input
                      onChange={e => {
                        changeInput(e, i);
                      }}
                      defaultValue={item.valueName}
                    />
                    {/* <FormItem>
                      {getFieldDecorator(`dataName${item.id}`, {
                        initialValue: isEdit ? initValue.remark : null,
                        rules: [{ required: true, message: '参数值不能为空' }],
                      })(<Input />)}
                    </FormItem> */}
                  </div>
                  {dataList.length > 1 && (
                    <div className={styles.dataIcon}>
                      <Icon
                        type="delete"
                        onClick={() => {
                          deleteRow(i);
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{ margin: '10px 0' }}>
              <Button type="primary" onClick={addDataItem}>
                添加参数值
              </Button>
            </div>
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
            <Button htmlType="submit" type="primary" loading={isEdit ? editLoading : addLoading}>
              保存
            </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
export default AddGoodsData;
