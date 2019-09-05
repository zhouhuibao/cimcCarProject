import React, { Component } from 'react';
import { Drawer, Cascader, Form, Button, Switch } from 'antd';
import FormItemDom from '@/components/CreateForm';
import CardComponent from '@/components/CardComponent';
import UploadImg from '@/components/UploadImg';
import styles from './styles.less';

@Form.create()
class AddGoods extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
    this.formItemRef1 = React.createRef();
  }

  state = {
    formItemData: [
      {
        domType: 'text',
        id: 'controlsId1',
        title: '商品标题',
        required: true,
        domAttr: {},
        fieldAttr: {
          rules: [
            {
              required: true,
              message: '商品标题不能为空',
            },
          ],
        },
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'text',
        id: 'controlsId2',
        title: '副标题',
        required: true,
        domAttr: {},
        fieldAttr: {},
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'select',
        id: 'approvalStatus3',
        title: '运费模板',
        domAttr: {
          onChange: e => {
            console.log(e);
          },
        },
        fieldAttr: {
          rules: [
            {
              required: true,
            },
          ],
        },
        options: [
          {
            key: '中通',
            value: '0',
          },
          {
            key: '韵达',
            value: '1',
          },
          {
            key: '顺丰',
            value: '2',
          },
        ],
      },
      {
        domType: 'select',
        id: 'approvalStatus4',
        title: '品牌',
        domAttr: {
          onChange: e => {
            console.log(e);
          },
        },
        fieldAttr: {
          rules: [
            {
              required: true,
            },
          ],
        },
        options: [
          {
            key: '小米',
            value: '0',
          },
          {
            key: 'iphone',
            value: '1',
          },
          {
            key: 'oppo',
            value: '2',
          },
        ],
      },
      {
        domType: 'text',
        id: 'controlsId5',
        title: '计量单位',
        required: true,
        domAttr: {},
        fieldAttr: {},
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'text',
        id: 'controlsId6',
        title: '排序编号',
        required: true,
        domAttr: {},
        fieldAttr: {},
        optionsObj: {
          key: 'name',
          value: 'id',
        },
        options: [],
      },
      {
        domType: 'select',
        id: 'approvalStatus7',
        title: '商品分类',
        domAttr: {
          onChange: e => {
            console.log(e);
          },
        },
        fieldAttr: {
          rules: [
            {
              required: true,
            },
          ],
        },
        options: [
          {
            key: '小米',
            value: '0',
          },
          {
            key: 'iphone',
            value: '1',
          },
          {
            key: 'oppo',
            value: '2',
          },
        ],
      },
    ],

    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ],
  };

  onChange = value => {
    console.log(value);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.formItemRef);
    const validateFields1 = this.formItemRef.current.validateFields;
    const validateFields2 = this.formItemRef1.current.validateFields;

    let filedStatus1 = false;
    let filedStatus2 = false;

    let obj = {};
    validateFields1((err, values) => {
      if (!err) {
        console.log(values);
        obj = { ...values };
        filedStatus1 = true;
      }
    });

    console.log(this.formItemRef1);
    validateFields2((err, values) => {
      if (!err) {
        console.log(values);
        filedStatus2 = true;
        obj = { ...values };
      }
    });

    console.log(filedStatus1, filedStatus2);
    if (filedStatus1 && filedStatus2) {
      console.log(obj);
    }
  };

  render() {
    const { visible, onClose } = this.props;
    // const {options} = this.state;
    const { options, formItemData } = this.state;
    const cardDom = <Switch checkedChildren="多规格" unCheckedChildren="统一规格" defaultChecked />;
    return (
      <div className={styles.addGoodsWrap}>
        <Drawer
          title="添加商品"
          width={930}
          onClose={onClose}
          visible={visible}
          className={styles.addGoodsWrap}
        >
          <Form onSubmit={this.handleSubmit}>
            <CardComponent title="选择主分类" style={{ marginBottom: 20 }}>
              <Cascader
                style={{ width: '50%' }}
                options={options}
                onChange={this.onChange}
                placeholder="请选择主分类"
              />
            </CardComponent>
            <CardComponent title="基础信息" style={{ marginBottom: 20 }}>
              <FormItemDom formData={formItemData} ref={this.formItemRef} />

              <div className={styles.itemWrap}>
                <p className={styles.itemLabel}>
                  <span style={{ color: 'red' }}>*</span>商品图
                </p>
                <div className={styles.itemContent}>
                  <UploadImg />
                </div>
              </div>
            </CardComponent>
            <CardComponent title="卡片" dom={cardDom}>
              <div>
                <FormItemDom formData={formItemData} ref={this.formItemRef1} />
              </div>
            </CardComponent>

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
      </div>
    );
  }
}
export default AddGoods;
