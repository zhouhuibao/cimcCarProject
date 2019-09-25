import React, { Component } from 'react';
import { Drawer } from 'antd';
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
    dpList: [
      {
        id: '',
        label: '店铺名称',
        value: '芮欧百货店',
      },
    ],
    goodsList: [
      {
        label: '商品名称',
        value: '商务妆容',
      },
      {
        label: '商品数量',
        value: '1',
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
  };

  afterVisibleChange = visible => {
    if (visible) {
      const { dataDetail } = this.props;
      console.log(visible);
      console.log(dataDetail);
    }
  };

  render() {
    const { infoList, orderInfo, dpList, goodsList } = this.state;
    const { visible, onClose } = this.props;
    return (
      <Drawer
        title="订单详情"
        placement="right"
        width="500"
        onClose={onClose}
        visible={visible}
        afterVisibleChange={e => {
          this.afterVisibleChange(e);
        }}
      >
        <InfoDetail title="购买人信息" list={infoList} />
        <InfoDetail title="店铺信息" list={dpList} />
        <InfoDetail title="商品信息" list={goodsList} />
        <InfoDetail title="订单信息" list={orderInfo} />
        <Blockquote title="促销信息" style={{ marginTop: 20 }} />
      </Drawer>
    );
  }
}
export default OrderDetail;
