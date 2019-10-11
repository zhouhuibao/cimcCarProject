import React, { Component } from 'react';
import { Drawer, Button, Form } from 'antd';
import { connect } from 'dva';
import FormItemDom from '@/components/CreateForm';
import { rules } from '@/utils/utils';

@Form.create()
@connect(({ loading }) => ({
  addLoading: loading.effects['serverListModel/addStation'],
}))
class AddService extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    formItemData: [
      {
        domType: 'text',
        id: 'stationName',
        title: '服务站名称',
        labelWidth: 100,
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '服务站名称不能为空',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'stationNo',
        title: '服务站编号',
        labelWidth: 100,
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '服务站编号不能为空',
            },
          ],
        },
      },
      {
        domType: 'select',
        id: 'stationType',
        title: '经销商类型',
        labelWidth: 100,
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请选择经销商类型',
            },
          ],
        },
        options: [
          {
            key: '直营',
            value: 0,
          },
          {
            key: '非直营',
            value: 1,
          },
        ],
      },
      {
        domType: 'text',
        id: 'mobile',
        labelWidth: 100,
        title: '联系电话',
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请输入正确的手机号',
              pattern: rules('mobile'),
            },
          ],
        },
      },
      {
        domType: 'radio',
        id: 'isOut',
        labelWidth: 100,
        title: '是否可外出',
        defaultValue: 1,
        domAttr: {},
        fieldAttr: {},
        options: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
      },
      {
        domType: 'radio',
        id: 'isInvoice',
        defaultValue: 1,
        labelWidth: 100,
        title: '是否可开票',
        domAttr: {},
        fieldAttr: {},
        options: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
      },
      {
        domType: 'TimePicker',
        id: 'businessHoursBegin',
        labelWidth: 100,
        title: '营业开始时间',
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'TimePicker',
        id: 'businessHoursEnd',
        labelWidth: 100,
        title: '营业结束时间',
        domAttr: {},
        fieldAttr: {},
      },

      {
        domType: 'selectCity',
        id: 'area',
        title: '地区',
        labelWidth: 100,
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请选择地区',
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'address',
        labelWidth: 100,
        title: '详细地址',
        domAttr: {},
        fieldAttr: {},
      },
      {
        domType: 'map',
        id: 'map',
        required: true,
        labelWidth: 100,
        title: '地址',
        col: 24,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '请选择地址',
            },
          ],
        },
      },
      {
        domType: 'img',
        id: 'stationPicture',
        labelWidth: 100,
        title: '店面照片',
        col: 22,
        domAttr: {},
        fieldAttr: {},
      },
    ],
  };

  afterVisibleChange = visible => {
    console.log(visible);
  };

  render() {
    const { isEdit, onClose, onOk, visible, addLoading, editLoading } = this.props;
    const { formItemData } = this.state;
    return (
      <Drawer
        title={isEdit ? '修改服务站' : '新增服务站'}
        width="700"
        destroyOnClose
        onClose={onClose}
        visible={visible}
        afterVisibleChange={e => {
          this.afterVisibleChange(e);
        }}
      >
        <Form
          onSubmit={e => {
            onOk(e, this.formItemRef);
          }}
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
            <Button onClick={onClose} style={{ marginRight: 8 }}>
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
export default AddService;
