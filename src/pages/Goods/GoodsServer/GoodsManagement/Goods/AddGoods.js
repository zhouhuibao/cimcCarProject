import React, { Component } from 'react';
import { PageHeader, Form, Button, Table, InputNumber, Popconfirm } from 'antd';
import BraftEditor from 'braft-editor';
import { router } from 'umi';
import FormItemDom from '@/components/CreateForm';
import styles from '../../../goodsStyles.less';
import Addmaterials from './Addmaterials';

class AddGoods extends Component {
  constructor(props) {
    super(props);
    this.formItemRef = React.createRef();
  }

  state = {
    selectedRowKeys: [],
    visible: false,
    editorState: BraftEditor.createEditorState(null),
    dataSource: [],
    columns: [
      {
        title: '物料名称',
        dataIndex: 'labelName',
        align: 'center',
      },
      {
        title: '单价(元)',
        align: 'center',
        dataIndex: 'labelPrice',
      },
      {
        title: '数量',
        align: 'center',
        render: (text, record, index) => {
          return (
            <InputNumber
              defaultValue={1}
              onBlur={e => {
                this.blurNum(e, index);
              }}
              min={0}
            />
          );
        },
      },
      {
        title: '有效期',
        align: 'center',
        render: (text, record, index) => {
          return (
            <InputNumber
              onBlur={e => {
                this.blurDate(e, index);
              }}
              min={0}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center',
        width: 80,
        render: (text, record) => {
          return (
            <div>
              <Popconfirm
                title="确定删除该行数据吗?"
                onConfirm={e => {
                  this.deleteTableDate(e, record);
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button type="danger" size="small">
                  删除
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    formItemData: [
      {
        domType: 'radio',
        id: 'type',
        col: 16,
        title: '核销类型',
        required: true,
        domAttr: {},
        defaultValue: '0',
        options: [
          { label: '次卡类型(每个物料都需要核销)', value: '0' },
          { label: '团购券类型(所有物料作为一个整体，只核销一次)', value: '1' },
        ],
        fieldAttr: {
          rules: [
            {
              message: '请选择核销类型',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'text',
        id: 'name',
        title: '商品名称',
        col: 16,
        required: true,
        domAttr: {},
        defaultValue: null,
        fieldAttr: {
          rules: [
            {
              message: '请输入商品名称',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'select',
        col: 16,
        id: 'status',
        title: '商品状态',
        required: true,
        domAttr: {},
        options: [
          { key: '前台可销售', value: '0' },
          { key: '可线下销售', value: '1' },
          { key: '不可销售', value: '2' },
        ],
        defaultValue: null,
        fieldAttr: {
          rules: [
            {
              message: '请选择商品状态',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'number',
        col: 16,
        tips: '元',
        id: 'price1',
        title: '销售价',
        required: true,
        domAttr: {
          style: {
            width: 200,
          },
          min: 0,
        },
        defaultValue: null,
        fieldAttr: {
          rules: [
            {
              message: '请输入销售价',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'number',
        col: 16,
        id: 'price2',
        tips: '元',
        title: '成本价',
        required: true,
        domAttr: {
          style: {
            width: 200,
          },
          min: 0,
        },
        defaultValue: null,
        fieldAttr: {
          rules: [
            {
              message: '请输入成本价',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'number',
        col: 16,
        id: 'price3',
        tips: '元',
        title: '原价',
        required: true,
        domAttr: {
          style: {
            width: 200,
          },
          min: 0,
        },
        defaultValue: null,
        fieldAttr: {
          rules: [
            {
              message: '请输入原价',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'number',
        col: 16,
        id: 'sort',
        title: '排序编号',
        required: true,
        tips: '数字越大越靠前',
        domAttr: {
          style: {
            width: 200,
          },
          min: 0,
        },
        defaultValue: 0,
        fieldAttr: {
          rules: [
            {
              message: '请输入排序编号',
              required: true,
            },
          ],
        },
      },
      {
        domType: 'textArea',
        id: 'reamke',
        title: '商品描述',
        col: 16,
        domAttr: {},
        defaultValue: null,
        fieldAttr: {},
      },
      {
        domType: 'switch',
        id: 'isxy',
        title: '开启购买协议',
        col: 16,
        domAttr: {},
        defaultValue: null,
        fieldAttr: {},
      },
      {
        domType: 'textArea',
        id: 'xy',
        title: '购买协议',
        col: 16,
        domAttr: {},
        defaultValue: null,
        fieldAttr: {},
      },
      {
        domType: 'upload',
        id: 'attach',
        title: '图片',
        col: 24,
        defaultValue: null,
        domAttr: {},
        fieldAttr: {},
      },
    ],
  };

  deleteTableDate = (e, record) => {
    const { dataSource, selectedRowKeys } = this.state;

    dataSource.forEach((item, i) => {
      if (item.labelId === record.labelId) {
        dataSource.splice(i, 1);
        selectedRowKeys.splice(i, 1);
      }
    });

    this.setState({
      dataSource,
      selectedRowKeys,
    });
  };

  blurNum = (e, i) => {
    console.log(e.target.value);

    console.log(i);
  };

  blurDate = (e, i) => {
    console.log(e);
    console.log(i);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.formItemRef.current;

    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  // 监听富文本的变化
  handleChange = editorState => {
    console.log(editorState.toHTML());
    this.setState({ editorState });
  };

  render() {
    const { formItemData, dataSource, columns, editorState, visible, selectedRowKeys } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeyss, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeyss,
          dataSource: selectedRows,
        });
        console.log(`selectedRowKeys: ${selectedRowKeyss}`, 'selectedRows: ', selectedRows);
      },
      selectedRowKeys,
    };
    return (
      <div className={styles.AddGoods}>
        <PageHeader onBack={() => router.goBack()} title="添加商品" />
        <Form onSubmit={this.handleSubmit}>
          <FormItemDom formData={formItemData} ref={this.formItemRef} />
          <div className={styles.formWrap}>
            <div className={styles.formLabel}>商品内容</div>
            <div className={styles.content}>
              <Button
                type="primary"
                style={{ marginBottom: 15 }}
                onClick={() => {
                  this.setState({ visible: true });
                }}
              >
                选择基础物料
              </Button>
              <Table
                columns={columns}
                dataSource={dataSource}
                rowKey={record => record.labelId}
                bordered
              />
            </div>
            <Addmaterials
              visible={visible}
              onCancel={() => {
                this.setState({ visible: false });
              }}
              rowSelection={rowSelection}
            />
          </div>
          <div className={styles.formWrap}>
            <div className={styles.formLabel}>图文详情</div>
            <div className={styles.content} style={{ border: '1px solid rgb(204,204,204)' }}>
              <BraftEditor value={editorState} onChange={this.handleChange} />
            </div>
          </div>

          <Button
            onClose={() => {
              router.goBack();
            }}
            style={{ marginRight: 8 }}
          >
            取消
          </Button>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form>
      </div>
    );
  }
}
export default AddGoods;
