import React, { Component } from 'react';
import { Drawer, Form, Button, Input, Radio, Icon } from 'antd';
import { connect } from 'dva';
import { MathRandom } from '@/utils/utils';
import styles from '../../goodsStyles.less';

const FormItem = Form.Item;

@connect(({ specificationsModel }) => ({
  specificationsModel,
}))
@Form.create()
class AddGoodsData extends Component {
  state = {
    defaultType: 0,
    options: [{ label: '文字', value: 0 }, { label: '图片', value: 1 }],
    dataList: [],
  };

  componentDidMount() {
    console.log('组件已加载');
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  addDataItem = () => {
    const { dataList } = this.state;
    const addRowData = {
      dataName: '',
      id: MathRandom(),
    };

    dataList.push(addRowData);
    this.setState({
      dataList,
    });
  };

  deleteRow = i => {
    const { dataList } = this.state;
    dataList.splice(i, 1);
    this.setState({
      dataList,
    });
  };

  typeChange = e => {
    this.setState({
      defaultType: e.target.value,
    });
  };

  render() {
    const {
      onClose,
      visible,
      title,
      form: { getFieldDecorator },
      isEdit,
      initValue,
    } = this.props;
    const { defaultType, options, dataList } = this.state;
    console.log(defaultType);
    return (
      <Drawer title={title} width="500" onClose={onClose} visible={visible}>
        <Form onSubmit={this.handleSubmit} className={styles.AddGoodsData}>
          <div>
            规格名称
            <FormItem>
              {getFieldDecorator('name', {
                initialValue: isEdit ? initValue.name : null,
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
                {getFieldDecorator('type', {
                  initialValue: isEdit ? initValue.type : defaultType,
                })(<Radio.Group options={options} onChange={this.typeChange} />)}
              </FormItem>
            </div>
          </div>

          <div>
            规格值
            {dataList.map((item, i) => {
              return (
                <div className={styles.dataItem} key={item.id}>
                  {defaultType === 0 ? null : (
                    <div className={styles.crmera}>
                      <Icon type="camera" />
                    </div>
                  )}
                  <div className={styles.dataInput}>
                    <FormItem>
                      {getFieldDecorator(`dataName${item.id}`, {
                        initialValue: isEdit ? initValue.remark : null,
                        rules: [{ required: true, message: '规格值不能为空' }],
                      })(<Input />)}
                    </FormItem>
                  </div>
                  <div className={styles.dataIcon}>
                    <Icon
                      type="delete"
                      onClick={() => {
                        this.deleteRow(i);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              );
            })}
            <div style={{ margin: '10px 0' }}>
              <Button
                type="primary"
                onClick={() => {
                  this.addDataItem();
                }}
              >
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
            <Button htmlType="submit" type="primary">
              保存
            </Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
export default AddGoodsData;
