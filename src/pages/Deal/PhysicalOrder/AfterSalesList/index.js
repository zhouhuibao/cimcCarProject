import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Row, Col } from 'antd';
import { MathRandom } from '@/utils/utils';
import OrderDetail from './OrderDetail';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

class AfterSalesList extends Component {
  state = {
    visible: false,
    dataDetail: {},
    afterStatusList: [],
    afterTypeList: [],
    dpList: [],
    dataSource: [
      {
        aftersales_bn: '1904231121436938',
        detail_id: '25',
        order_id: '2669453000108238',
        company_id: '21',
        user_id: '48238',
        item_id: '1314',
        shop_id: '260',
        distributor_id: '169',
        item_name: '寻真 沽源优质燕麦500g*2袋 非转基因产品 一件包邮',
        num: 1,
        aftersales_type: 'REFUND_GOODS',
        aftersales_status: '4',
        aftersales_count: 1,
        create_time: 1555989676,
        update_time: 1556294401,
        item: {
          id: '18298',
          order_id: '2669453000108238',
          company_id: '21',
          user_id: '48238',
          act_id: null,
          item_id: '1314',
          item_bn: 'test08',
          item_name: '寻真 沽源优质燕麦500g*2袋 非转基因产品 一件包邮',
          pic:
            'http://mmbiz.qpic.cn/mmbiz_jpg/Hw4SsicubkrdStFYibic5ibGXzw1EFnnlQ7RwoGmmh5gWE6P5PJicMISJ4M69JJeb1KnvyT5EltCwmehLkKTCYnFicPw/0?wx_fmt=jpeg',
          num: 1,
          price: 2,
          total_fee: 2,
          templates_id: 3,
          rebate: 0,
          total_rebate: 0,
          item_fee: 2,
          cost_fee: 0,
          item_unit: '件',
          member_discount: 0,
          coupon_discount: 0,
          discount_fee: 0,
          discount_info: [[]],
          shop_id: '260',
          is_total_store: true,
          distributor_id: '169',
          create_time: 1555989576,
          update_time: 1556294401,
          delivery_corp: 'SF',
          delivery_code: '12124124124',
          delivery_time: 1555989649,
          delivery_status: 'DONE',
          aftersales_status: 'CLOSED',
          refunded_fee: 0,
          fee_type: 'CNY',
          fee_rate: 1,
          fee_symbol: '￥',
          cny_fee: 2,
          item_point: 0,
          point: 0,
          item_spec_desc: null,
          order_item_type: 'normal',
          volume: 0,
          weight: 0,
        },
        orderInfo: {
          order_id: '2669453000108238',
          title: '寻真 沽源优质燕麦500g*2袋 非转基因产品 一件包邮...',
          company_id: '21',
          user_id: '48238',
          act_id: null,
          mobile: '13681915816',
          freight_fee: 0,
          item_fee: '2',
          cost_fee: 0,
          total_fee: '2',
          total_rebate: 0,
          distributor_id: '169',
          receipt_type: 'logistics',
          ziti_code: '0',
          shop_id: '260',
          ziti_status: 'NOTZITI',
          order_status: 'DONE',
          order_source: 'member',
          order_type: 'normal',
          order_class: 'normal',
          auto_cancel_time: '1555990476',
          auto_cancel_seconds: -12801458,
          auto_finish_time: null,
          is_distribution: true,
          source_id: '0',
          monitor_id: '0',
          salesman_id: '0',
          delivery_corp: 'SF',
          delivery_code: '12124124124',
          delivery_status: 'DONE',
          cancel_status: 'NO_APPLY_CANCEL',
          delivery_time: 1555989649,
          end_time: '1555989776',
          end_date: '2019-04-23 11:22:56',
          receiver_name: '1',
          receiver_mobile: '13689122555',
          receiver_zip: '100010',
          receiver_state: '北京市',
          receiver_city: '北京市',
          receiver_district: '东城区',
          receiver_address: '密我吧台',
          member_discount: 0,
          coupon_discount: 0,
          discount_fee: 0,
          discount_info: [],
          create_time: 1555989576,
          update_time: 1555989776,
          fee_type: 'CNY',
          fee_rate: 1,
          fee_symbol: '￥',
          cny_fee: 2,
          point: 0,
          pay_type: '',
          remark: null,
          third_params: [],
          invoice: [],
          distributor_name: 'zling',
          items: [
            {
              id: '18298',
              order_id: '2669453000108238',
              company_id: '21',
              user_id: '48238',
              act_id: null,
              item_id: '1314',
              item_bn: 'test08',
              item_name: '寻真 沽源优质燕麦500g*2袋 非转基因产品 一件包邮',
              pic:
                'http://mmbiz.qpic.cn/mmbiz_jpg/Hw4SsicubkrdStFYibic5ibGXzw1EFnnlQ7RwoGmmh5gWE6P5PJicMISJ4M69JJeb1KnvyT5EltCwmehLkKTCYnFicPw/0?wx_fmt=jpeg',
              num: 1,
              price: 2,
              total_fee: 2,
              templates_id: 3,
              rebate: 0,
              total_rebate: 0,
              item_fee: 2,
              cost_fee: 0,
              item_unit: '件',
              member_discount: 0,
              coupon_discount: 0,
              discount_fee: 0,
              discount_info: [[]],
              shop_id: '260',
              is_total_store: true,
              distributor_id: '169',
              create_time: 1555989576,
              update_time: 1556294401,
              delivery_corp: 'SF',
              delivery_code: '12124124124',
              delivery_time: 1555989649,
              delivery_status: 'DONE',
              aftersales_status: 'CLOSED',
              refunded_fee: 0,
              fee_type: 'CNY',
              fee_rate: 1,
              fee_symbol: '￥',
              cny_fee: 2,
              item_point: 0,
              point: 0,
              item_spec_desc: null,
              order_item_type: 'normal',
              volume: 0,
              weight: 0,
            },
          ],
          order_status_des: 'DONE',
          order_status_msg: '已完成',
        },
        tradeInfo: {
          tradeId: '2669453000148238',
          orderId: '2669453000108238',
          shopId: '260',
          userId: '48238',
          mobile: '13681915816',
          openId: 'oBbMP0bMztBC67oZrJE0V7yxzFso',
          discountInfo: null,
          mchId: '1313844301',
          totalFee: '2',
          discountFee: '0',
          feeType: 'CNY',
          payFee: '2',
          tradeState: 'SUCCESS',
          payType: 'wxpay',
          transactionId: '4200000310201904233774823020',
          wxaAppid: 'wxbc41819b322cbd3f',
          bankType: 'COMM_CREDIT',
          body: '寻真 沽源优质燕麦500g*2袋 非转基因产品 一件包邮...',
          detail: '寻真 沽源优质燕麦500g*2袋 非转基因产品 一件包邮...',
          timeStart: '1555989576',
          timeExpire: '1555989584',
          companyId: '21',
          authorizerAppid: 'wx6b8c2837f47e8a09',
          curFeeType: 'CNY',
          curFeeRate: 1,
          curFeeSymbol: '￥',
          curPayFee: '2',
          distributorId: '169',
          tradeSourceType: 'normal',
          payDate: '2019-04-23 11:19:44',
        },
      },
    ],
    columns: [
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '售后单号',
        dataIndex: 'aftersales_bn',
      },
      {
        title: '订单号',
        dataIndex: 'order_id',
      },
      {
        title: '标题',
        dataIndex: 'item_name',
      },
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '售后类型',
        dataIndex: 'aftersales_type',
      },
      {
        title: '售后状态',
        dataIndex: 'aftersales_status',
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
    this.setDefaultList('afterStatusList', '售后状态');
    this.setDefaultList('afterTypeList', '售后类型');
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

  render() {
    const {
      columns,
      dpList,
      afterStatusList,
      afterTypeList,
      dataSource,
      visible,
      dataDetail,
    } = this.state;
    return (
      <div>
        <Row gutter={16}>
          <Col sm={12} lg={6} xl={4}>
            <Select
              showSearch
              allowClear
              style={{ width: '100%', marginBottom: 20 }}
              placeholder="选择店铺"
            >
              {dpList.map(item => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col sm={12} lg={6} xl={4}>
            <RangePicker style={{ width: '100%', marginBottom: 20 }} />
          </Col>
          <Col sm={12} lg={6} xl={4}>
            <Search
              style={{ width: '100%', marginBottom: 20 }}
              placeholder="订单号"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
          <Col sm={12} lg={6} xl={4}>
            <Search
              style={{ width: '100%', marginBottom: 20 }}
              placeholder="售后单号"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
          <Col sm={12} lg={6} xl={4}>
            <Select allowClear style={{ width: '100%', marginBottom: 20 }} placeholder="售后状态">
              {afterStatusList.map(item => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col sm={12} lg={6} xl={4}>
            <Select allowClear style={{ width: '100%', marginBottom: 20 }} placeholder="售后类型">
              {afterTypeList.map(item => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
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
export default AfterSalesList;
