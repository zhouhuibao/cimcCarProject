import React, { Component } from 'react';
import { Drawer, Table } from 'antd';
import Blockquote from '@/components/Blockquote';
import InfoDetail from '@/components/InfoDetail';

class OrderDetail extends Component {
  state = {
    infoList: [
      {
        id: '',
        label: '姓名',
        value: '张坤(个体)',
      },
      {
        label: '手机',
        value: '13761924721',
      },
      {
        label: '会员等级',
        value: '铁牌会员',
      },
    ],
    orderInfo: [
      {
        label: '订单类型',
        value: '实体订单',
      },
      {
        label: '订单号',
        value: '2817427000093592',
      },
      {
        label: '商品金额',
        value: '￥0.01',
      },
      {
        label: '订单总金额',
        value: '￥0.01',
        link: true,
      },
      {
        label: '货币',
        value: 'CNY',
      },
      {
        label: '货币汇率',
        value: '1',
      },
      {
        label: '订单状态',
        value: '已完成',
      },
      {
        label: '订单创建时间',
        value: '2019-09-18 10:40:55',
      },
    ],
    payInfo: [
      {
        label: '交易单号',
        value: '2817427000163592',
      },
      {
        label: '交易流水号',
        value: '4200000390201909184669997837',
      },
      {
        label: '货币',
        value: 'CNY',
      },
      {
        label: '货币汇率(>RMB)',
        value: '1',
        link: true,
      },
      {
        label: '支付金额(RMB)',
        value: '￥0.01',
      },
      {
        label: '总金额',
        value: '￥ 0.01',
      },
      {
        label: '优惠金额',
        value: '- ￥0',
      },
      {
        label: '支付类型',
        value: '微信支付',
      },
      {
        label: '交易单状态',
        value: '支付成功',
      },
      {
        label: '交易时间',
        value: '2019-09-18 10:40:55',
      },
      {
        label: '交易结束时间',
        value: '2019-09-18 10:40:55',
      },
    ],
    columns: [
      {
        title: '商品图片',
        dataIndex: 'url',
      },
      {
        title: '商品名称',
        dataIndex: 'gopdsName',
      },
      {
        title: '规格',
        dataIndex: 'guig',
      },
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '总价',
        dataIndex: 'totalPrice',
      },
      {
        title: '货币',
        dataIndex: 'unit',
      },
      {
        title: '货币汇率',
        dataIndex: 'huilv',
      },
    ],
    dataSource: [],
  };

  afterVisibleChange = visible => {
    if (visible) {
      const { dataDetail } = this.props;
      console.log(visible);
      console.log(dataDetail);
    }
  };

  render() {
    const { infoList, dataSource, columns, orderInfo, payInfo } = this.state;
    const { visible, onClose } = this.props;
    return (
      <Drawer
        title="订单详情"
        placement="right"
        width="70%"
        onClose={onClose}
        visible={visible}
        afterVisibleChange={e => {
          this.afterVisibleChange(e);
        }}
      >
        <InfoDetail title="购买人信息" list={infoList} />
        <Blockquote title="商品信息" style={{ marginTop: 20 }} />
        <Table
          style={{ marginBottom: 20 }}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.order_id}
        />
        <InfoDetail title="订单信息" list={orderInfo} />
        <Blockquote title="促销信息" style={{ marginTop: 20 }} />
        <InfoDetail title="支付信息" list={payInfo} />
      </Drawer>
    );
  }
}
export default OrderDetail;
