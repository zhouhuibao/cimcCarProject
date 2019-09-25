import React, { Component } from 'react';
import { Select, Button, Table, Input, DatePicker, Row, Col, Tabs } from 'antd';
import SelectAddress from '@/components/SelectAddress';
import OrderDetail from './OrderDetail';
import styles from '../../order.less';
import orderJson from './order.json';
import { MathRandom } from '@/utils/utils';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

class PhysicalOrder extends Component {
  state = {
    dpList: [],
    lyList: [],
    orderType: [],
    visible: false,
    dataDetail: {},
    dataSource: orderJson,
    columns: [
      {
        title: '订单号',
        dataIndex: 'order_id',
      },
      {
        title: '创建时间',
        dataIndex: 'create_date',
      },
      {
        title: '所属店铺',
        dataIndex: 'distributor_name',
      },
      {
        title: '运费',
        dataIndex: 'freight_fee',
        render: text => {
          return `¥${text}`;
        },
      },
      {
        title: '金额',
        dataIndex: 'item_fee',
        render: text => {
          return `¥${text}`;
        },
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '订单类型',
        dataIndex: 'OrderType',
      },
      {
        title: '订单状态',
        dataIndex: 'order_status',
      },
      {
        title: '来源',
        render: () => {
          return '--';
        },
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <a
              onClick={() => {
                this.showDetail(record);
              }}
            >
              详情
            </a>
          );
        },
      },
    ],
  };

  componentDidMount() {
    this.setDefaultList('dpList', '店铺');
    this.setDefaultList('orderType', '订单类型');
    this.setDefaultList('lyList', '来源');
  }

  showDetail = record => {
    console.log(record);
    this.setState({ visible: true });
  };

  setDefaultList = (type, text) => {
    const arr = [];
    for (let i = 0; i < 10; i += 1) {
      const obj = {};
      obj.value = MathRandom();
      obj.label = `${text}${i + 1}`;
      arr.push(obj);
    }
    this.setState({
      [type]: arr,
    });
  };

  changeAddress = e => {
    console.log(e);
  };

  changetab = e => {
    console.log(e);
  };

  render() {
    const { dpList, lyList, orderType, columns, dataSource, dataDetail, visible } = this.state;
    return (
      <div className={styles.PhysicalOrder}>
        <Row gutter={16}>
          <div style={{ marginBottom: 20 }} className="clearfix">
            <Col span={12}>
              <div className={styles.selectDP}>
                <div className={styles.item}>
                  <SelectAddress
                    style={{ width: '100%' }}
                    placeholder="根据地区筛选"
                    change={e => {
                      this.changeAddress(e);
                    }}
                  />
                </div>
                <div className={styles.item}>
                  <Select showSearch allowClear style={{ width: '100%' }} placeholder="选择店铺">
                    {dpList.map(item => {
                      return (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div style={{ width: 'auto' }}>
                  <Button>重置</Button>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
          </div>

          <Col span={12}>
            <div className={styles.selectDP}>
              <div className={styles.item}>
                <Select allowClear style={{ width: '100%' }} placeholder="筛选订单">
                  {orderType.map(item => {
                    return (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className={styles.item}>
                <Select showSearch allowClear style={{ width: '100%' }} placeholder="请输入来源">
                  {lyList.map(item => {
                    return (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.selectDP}>
              <div className={styles.item}>
                <Search
                  style={{ width: '100%' }}
                  placeholder="导购员手机号"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </div>
              <div className={styles.item}>
                <Search
                  style={{ width: '100%' }}
                  placeholder="手机号/订单号"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </div>
              <div style={{ width: 'auto' }}>
                <Button type="primary">导出</Button>
              </div>
            </div>
          </Col>
        </Row>

        <Tabs defaultActiveKey="1" onChange={this.changetab} type="card" style={{ marginTop: 20 }}>
          <TabPane tab="全部" key="1" />
          <TabPane tab="待发货" key="2" />
          <TabPane tab="已完成" key="3" />
          <TabPane tab="未支付" key="4" />
          <TabPane tab="取消待审核" key="5" />
          <TabPane tab="已取消" key="6" />
        </Tabs>

        <Table columns={columns} dataSource={dataSource} rowKey={record => record.order_id} />
        <OrderDetail
          dataDetail={dataDetail}
          visible={visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
        />
      </div>
    );
  }
}
export default PhysicalOrder;
