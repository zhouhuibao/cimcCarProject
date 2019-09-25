import React, { Component } from 'react';
import { Select, Button, Table, Input, DatePicker, Row, Col, Tabs, Icon } from 'antd';
import SelectAddress from '@/components/SelectAddress';
import styles from '../order.less';
import { MathRandom } from '@/utils/utils';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

class TradingOrder extends Component {
  state = {
    dpList: [],
    dataSource: [
      {
        tradeId: '2817677000208032',
        orderId: '2817677000178032',
        shopId: '180',
        userId: '58032',
        mobile: '13957779380',
        openId: 'oETgI0bouKzdfZnIm5AWJ2BH5FeE',
        discountInfo: null,
        mchId: '1313844301',
        totalFee: '1',
        discountFee: '0',
        feeType: 'CNY',
        payFee: '1',
        tradeState: 'SUCCESS',
        payType: 'wxpay',
        transactionId: '4200000383201909185803174088',
        wxaAppid: 'wx2b3088fd75decea9',
        bankType: 'GDB_CREDIT',
        body: '美妆刷...',
        detail: '美妆刷...',
        timeStart: '1568796975',
        timeExpire: '1568796982',
        companyId: '21',
        authorizerAppid: 'wx6b8c2837f47e8a09',
        curFeeType: 'CNY',
        curFeeRate: 1,
        curFeeSymbol: '￥',
        curPayFee: '1',
        distributorId: '0',
        tradeSourceType: 'normal_community',
        payDate: '2019-09-18 16:56:22',
      },
      {
        tradeId: '2817677000208032',
        orderId: '28176770001782032',
        shopId: '180',
        userId: '58032',
        mobile: '13957779380',
        openId: 'oETgI0bouKzdfZnIm5AWJ2BH5FeE',
        discountInfo: null,
        mchId: '1313844301',
        totalFee: '1',
        discountFee: '0',
        feeType: 'CNY',
        payFee: '1',
        tradeState: 'SUCCESS',
        payType: 'wxpay',
        transactionId: '4200000383201909185803174088',
        wxaAppid: 'wx2b3088fd75decea9',
        bankType: 'GDB_CREDIT',
        body: '美妆刷...',
        detail: '美妆刷...',
        timeStart: '1568796975',
        timeExpire: '1568796982',
        companyId: '21',
        authorizerAppid: 'wx6b8c2837f47e8a09',
        curFeeType: 'CNY',
        curFeeRate: 1,
        curFeeSymbol: '￥',
        curPayFee: '1',
        distributorId: '0',
        tradeSourceType: 'normal_community',
        payDate: '2019-09-18 16:56:22',
      },
    ],
    columns: [
      {
        title: '交易时间',
        dataIndex: 'payDate',
      },
      {
        title: '交易单号',
        dataIndex: 'orderId',
      },
      {
        title: '用户手机号',
        dataIndex: 'mobile',
      },
      {
        title: '支付详情',
        dataIndex: 'detail',
      },
      {
        title: '支付金额',
        dataIndex: 'payFee',
        render: text => {
          return `¥${text}`;
        },
      },
      {
        title: '订单金额',
        dataIndex: 'payFee',
        render: text => {
          return `¥${text}`;
        },
      },

      {
        title: '汇率',
        dataIndex: 'curFeeRate',
      },
      {
        title: '订单状态',
        dataIndex: 'tradeState',
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

  CustomExpandIcon = props => {
    let text;
    if (props.expanded) {
      text = 'down';
    } else {
      text = 'right';
    }
    return <Icon type={text} onClick={e => props.onExpand(props.record, e)} />;
  };

  render() {
    const { dpList, columns, dataSource } = this.state;
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
              <div className={styles.selectDP}>
                <div className={styles.item}>
                  <RangePicker style={{ width: '100%' }} />
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
          </div>
        </Row>

        <Tabs defaultActiveKey="1" onChange={this.changetab} type="card" style={{ marginTop: 20 }}>
          <TabPane tab="全部" key="1" />
          <TabPane tab="支付完成" key="2" />
          <TabPane tab="未支付" key="4" />
        </Tabs>

        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.orderId}
          expandedRowRender={record => (
            <Row gutter={16}>
              <Col span={12}>
                <p>订单号:&ensp;&ensp;&ensp; {record.orderId}</p>
              </Col>
              <Col span={12}>
                <p>支付方式:&ensp;&ensp;&ensp; 微信支付</p>
              </Col>
              <Col span={12}>
                <p>总金额:&ensp;&ensp;&ensp; {10}</p>
              </Col>
              <Col span={12}>
                <p>优惠金额:&ensp;&ensp;&ensp; {1}</p>
              </Col>
            </Row>
          )}
          expandIcon={this.CustomExpandIcon}
        />
      </div>
    );
  }
}
export default TradingOrder;
