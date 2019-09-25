import React, { Component } from 'react';
import { Drawer, Table } from 'antd';
import Blockquote from '@/components/Blockquote';
import InfoDetail from '@/components/InfoDetail';

class OrderDetail extends Component {
  state = {
    infoList: [
      {
        id: '',
        label: '退换货编号',
        value: '1904231121436938',
      },
      {
        label: '申请时间',
        value: '2019-04-23 11:21:16',
      },
      {
        label: '申请处理进度',
        value: '售后关闭',
      },
      {
        label: '退换货类型',
        value: '退货退款',
      },
    ],
    orderInfo: [
      {
        label: '订单编号',
        value: '2669453000108238',
      },
      {
        label: '商家名称',
        value: '1',
      },
      {
        label: '订单状态',
        value: '订单完成',
      },
      {
        label: '会员信息',
        value: '13681915816',
        link: true,
      },
      {
        label: '下单时间',
        value: '2019-04-23 11:19:36',
      },
      {
        label: '收货信息',
        value: '北京市北京市东城区密我吧台',
      },
    ],
    payInfo: [
      {
        label: '退货货理由',
        value: '多买/错买',
      },
      {
        label: '问题描述',
        value: '',
      },
      {
        label: '图片信息',
        value: '无图片信息',
      },
    ],
    Result: [
      {
        label: '审核状态',
        value: '商家同意售后申请',
      },
      {
        label: '商家处理申请说明',
        value: '1949914',
      },
    ],
    wiliuInfo: [
      {
        label: '物流公司',
        value: 'EMS国内',
      },
      {
        label: '物流单号',
        value: '58585855',
      },
    ],
    columns: [
      {
        title: '商品图片',
        dataIndex: 'pic',
        width: 100,
        render: () => {
          return (
            <img
              style={{ width: '100%' }}
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1421194919,3695584663&fm=26&gp=0.jpg"
              alt="商品图片"
            />
          );
        },
      },
      {
        title: '商品名称',
        dataIndex: 'item_name',
      },
      {
        title: '规格',
        dataIndex: 'item_unit',
      },
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '总价',
        dataIndex: 'price',
      },
    ],
    dataSource: [
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
  };

  afterVisibleChange = visible => {
    if (visible) {
      const { dataDetail } = this.props;
      console.log(visible);
      console.log(dataDetail);
    }
  };

  render() {
    const { infoList, dataSource, columns, orderInfo, payInfo, Result, wiliuInfo } = this.state;
    const { visible, onClose } = this.props;
    return (
      <Drawer
        title="退换货详情"
        placement="right"
        width="70%"
        onClose={onClose}
        visible={visible}
        afterVisibleChange={e => {
          this.afterVisibleChange(e);
        }}
      >
        <InfoDetail title="退换货信息" list={infoList} />
        <InfoDetail title="订单信息" list={orderInfo} />
        <Blockquote title="退换货商品信息" style={{ marginTop: 20 }} />
        <Table
          style={{ marginBottom: 20 }}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.order_id}
        />

        <InfoDetail title="售后申请信息" list={payInfo} />
        <InfoDetail title="审核结果" list={Result} />
        <InfoDetail title="用户退换货物流信息" list={wiliuInfo} />
      </Drawer>
    );
  }
}
export default OrderDetail;
