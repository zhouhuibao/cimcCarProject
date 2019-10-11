import React, { Component } from 'react';
import { Drawer, Form, Button, Input, Radio, Icon } from 'antd';
import { connect } from 'dva';
import CustomSelectImage from '@/components/CustomSelectImage';
import styles from '../../goodsStyles.less';
import { isEmpty, showImg } from '@/utils/utils';

const FormItem = Form.Item;

@Form.create()
@connect(({ specificationsModel }) => ({
  specificationsModel,
}))
class AddGoodsData extends Component {
  state = {
    defaultType: 0,
    index: 0,
    options: [{ label: '文字', value: 0 }, { label: '图片', value: 1 }],
    imgVisible: false,
  };

  typeChange = e => {
    this.setState({
      defaultType: e.target.value,
    });
  };

  render() {
    const {
      onClose,
      onOk,
      visible,
      isEdit,
      form: { getFieldDecorator, getFieldValue },
      initValue,
      dataList,
      addLoading,
      editLoading,
      changeInput,
      addDataItem,
      deleteRow,
      changeImage,
    } = this.props;
    const { defaultType, options, imgVisible, index } = this.state;
    return (
      <Drawer
        title={isEdit ? '修改规格' : '添加规格'}
        destroyOnClose
        width="500"
        onClose={onClose}
        visible={visible}
      >
        <Form onSubmit={onOk} className={styles.AddGoodsData}>
          <div>
            规格名称
            <FormItem>
              {getFieldDecorator('specName', {
                initialValue: isEdit ? initValue.specName : null,
                rules: [{ required: true, message: '请输入规格名称' }],
              })(<Input placeholder="请输入规格名称" />)}
            </FormItem>
          </div>
          <div>
            规格备注
            <FormItem>
              {getFieldDecorator('remark', {
                initialValue: isEdit ? initValue.remark : null,
              })(<Input placeholder="请输入规格备注" />)}
            </FormItem>
          </div>

          <div className={styles.formItem}>
            <div className={styles.label}>规格类型</div>
            <div className={styles.radio}>
              <FormItem>
                {getFieldDecorator('specType', {
                  initialValue: isEdit ? initValue.specType : defaultType,
                })(<Radio.Group options={options} onChange={this.typeChange} />)}
              </FormItem>
            </div>
          </div>

          <div>
            规格值
            {dataList.map((item, i) => {
              return (
                <div className={styles.dataItem} key={item.id}>
                  {getFieldValue('specType') === 0 ? null : (
                    <div
                      className={styles.crmera}
                      onClick={() => this.setState({ imgVisible: true, index: i })}
                    >
                      {isEmpty(item.valuePicture) ? (
                        <img
                          src={showImg(item.valuePicture)}
                          style={{ width: '100%', height: '100%' }}
                          alt=""
                        />
                      ) : (
                        <Icon type="camera" />
                      )}
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
                        rules: [{ required: true, message: '规格值不能为空' }],
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
                添加规格值
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
        <CustomSelectImage
          visible={imgVisible}
          onCancel={() => this.setState({ imgVisible: false })}
          defaultValue={isEdit ? null : initValue.brandPicture}
          onOk={imgArr => {
            changeImage(imgArr, index);
            this.setState({ imgVisible: false });
          }}
          multiple={false}
        />
      </Drawer>
    );
  }
}
export default AddGoodsData;
