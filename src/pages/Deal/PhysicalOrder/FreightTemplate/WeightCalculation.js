import React, { Component } from 'react';
import { Table, Button, InputNumber, Popconfirm, Checkbox, Form } from 'antd';
import Blockquote from '@/components/Blockquote';
import SelectCity from '@/components/SelectCity';
import styles from '../../order.less';

const FormItem = Form.Item;

@Form.create()
class WeightCalculation extends Component {
  state = {
    visible: false,
    isChecked: true,
    rulesDataSource: [],
    rulesColumns: [
      {
        title: '地区设置',
        dataIndex: 'cityNames',
      },
      {
        title: '包邮条件(kg)',
        dataIndex: 'cityNamed',
      },
      {
        title: '操作',
        width: 80,
        align: 'center',
        render: (text, record, index) => {
          return index === 0 ? null : (
            <Popconfirm title="确定删除该条数据吗">
              <Button type="danger" size="small">
                删除
              </Button>
            </Popconfirm>
          );
        },
      },
    ],
    columns: [
      {
        title: '运送到',
        dataIndex: 'cityName',
      },
      {
        title: '重量(kg)',
        width: 100,
        align: 'center',
        render: () => {
          return <InputNumber />;
        },
      },
      {
        title: '首费(元)',
        width: 100,
        align: 'center',
        render: () => {
          return <InputNumber />;
        },
      },
      {
        title: '续重(kg)',
        width: 100,
        align: 'center',
        render: () => {
          return <InputNumber />;
        },
      },
      {
        title: '续费(元)',
        width: 100,
        align: 'center',
        render: () => {
          return <InputNumber />;
        },
      },
      {
        title: '操作',
        width: 80,
        align: 'center',
        render: () => {
          return (
            <Popconfirm title="确定删除该条数据吗">
              <Button type="danger" size="small">
                删除
              </Button>
            </Popconfirm>
          );
        },
      },
    ],
    dataSource: [],
  };

  changeCheckBox = e => {
    console.log(e);
    this.setState({
      isChecked: e.target.checked,
    });
  };

  handOk = () => {
    console.log('确定');
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { columns, dataSource, isChecked, rulesDataSource, rulesColumns, visible } = this.state;
    console.log(isChecked);
    return (
      <Form className={styles.WeightCalculation}>
        <p>运费计算:</p>
        <Blockquote title="默认运费:" style={{ padding: 0 }} />
        <div className={`${styles.formItemWrap} clearfix`}>
          <div className={`${styles.item} ${styles.label}`}>重量（kg以内）:</div>
          <div className={styles.item}>
            <FormItem>
              {getFieldDecorator('weight', {
                rules: [{ required: true, message: '重量不能为空' }],
              })(<InputNumber />)}
            </FormItem>
          </div>
          <div className={`${styles.item} ${styles.label}`}>运费（元）:</div>
          <div className={styles.item}>
            <FormItem>
              {getFieldDecorator('weights', {
                rules: [{ required: true, message: '运费不能为空' }],
              })(<InputNumber />)}
            </FormItem>
          </div>
        </div>
        <Blockquote title="增重运费:" style={{ padding: 0 }} />
        <div className={`${styles.formItemWrap} clearfix`}>
          <div className={`${styles.item} ${styles.label}`}>每增加（kg内）:</div>
          <div className={styles.item}>
            <FormItem>
              {getFieldDecorator('weightd', {
                rules: [{ required: true, message: '重量不能为空' }],
              })(<InputNumber />)}
            </FormItem>
          </div>
          <div className={`${styles.item} ${styles.label}`}>增加（元）:</div>
          <div className={styles.item}>
            <FormItem>
              {getFieldDecorator('weightsg', {
                rules: [{ required: true, message: '运费不能为空' }],
              })(<InputNumber />)}
            </FormItem>
          </div>
        </div>
        <Blockquote title="为指定地区城市设置运费:" style={{ padding: 0 }} />
        <Table columns={columns} dataSource={dataSource} bordered pagination={false} />
        <div style={{ margin: '20px 0' }}>
          <Button
            type="primary"
            icon="plus-circle"
            onClick={() => this.setState({ visible: true })}
          >
            添加地区
          </Button>
        </div>
        <Checkbox defaultChecked={isChecked} onChange={this.changeCheckBox}>
          指定条件包邮:
        </Checkbox>
        <Blockquote title="为指定地区设置包邮规则:" style={{ padding: 0 }} />
        <Table columns={rulesColumns} dataSource={rulesDataSource} bordered pagination={false} />
        <div style={{ margin: '20px 0' }}>
          <Button
            type="primary"
            icon="plus-circle"
            onClick={() => this.setState({ visible: true })}
          >
            添加地区
          </Button>
        </div>
        <SelectCity
          visible={visible}
          onOk={() => {
            this.handOk();
          }}
          onCancel={() => this.setState({ visible: false })}
        />
      </Form>
    );
  }
}
export default WeightCalculation;
