import React, { Component } from 'react';
import { Input, Empty, message } from 'antd';
import { isEmpty, dataType } from '@/utils/utils';
import styles from '../styles.less';

// const {Option} = Select;

let map = null;

class SearchAddress extends Component {
  state = {
    addressList: [],
    show: false,
    address: '',
  };

  componentDidMount() {
    // eslint-disable-next-line
    map = new AMap.Map('containers', {
      resizeEnable: true,
    });

    document.onclick = () => {
      this.setState({
        show: false,
      });
    };
  }

  searchAds = keyWord => {
    // eslint-disable-next-line
    new AMap.plugin('AMap.Autocomplete', () => {
      // 实例化Autocomplete
      const autoOptions = {
        // city 限定城市，默认全国
        city: '全国',
      };
      // eslint-disable-next-line
      const autoComplete = new AMap.Autocomplete(autoOptions);
      autoComplete.search(keyWord, (status, result) => {
        this.setState({
          addressList: status === 'complete' ? result.tips : [],
        });
      });
    });
  };

  change = e => {
    this.searchAds(e.target.value);
    this.setState({
      address: e.target.value,
      show: isEmpty(e.target.value) || false,
    });
  };

  clickItem = (e, props, index) => {
    e.nativeEvent.stopImmediatePropagation();
    const { addressList } = this.state;
    addressList.forEach((item, i) => {
      if (index === i) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    if (dataType(props.location) === 'Object') {
      const { lng, lat } = props.location;
      const position = [lng, lat];
      this.setMarkerOrCenter(position);
      this.setState({
        address: props.name,
        addressList,
        show: false,
      });

      // 把选中的位置信息返回给父组件
      const { selected } = this.props;
      selected(props);
    } else {
      message.error('该地址无效,请重新选择地址');
    }
  };

  search = e => {
    console.log(e);
    this.searchAds(e);
  };

  setMarkerOrCenter = positions => {
    // eslint-disable-next-line
    const marker = new AMap.Marker({
      position: positions,
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    });

    const THIS = this;
    // 先清除地图上的所有覆盖物
    map.clearMap();
    // 添加新的覆盖物
    map.add(marker);
    // 设置地图的中心点和放大比例
    map.setZoomAndCenter(14, positions);

    marker.on('click', e => {
      console.log(e);
      const { lng, lat } = e.lnglat;
      THIS.openInfo([lng, lat]);
    });
  };

  openInfo = positions => {
    const info = [];
    info.push(
      '<div class=\'input-card content-window-card\'><div><img style="float:left;" src=" https://webapi.amap.com/images/autonavi.png "/></div> ',
    );
    info.push('<div style="padding:7px 0px 0px 0px;"><h4>高德软件</h4>');
    info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
    info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");

    // eslint-disable-next-line
    const infoWindow = new AMap.InfoWindow({
      content: info.join(''), // 使用默认信息窗体框样式，显示信息内容
      offset: new AMap.Pixel(0, -35),
    });

    infoWindow.open(map, positions);
  };

  isActive = item => {
    if (dataType(item.active) === 'Boolean') {
      if (item.active) {
        return true;
      }
      return false;
    }
    return false;
  };

  render() {
    const { addressList, show, address } = this.state;
    return (
      <div className={styles.SearchAddress}>
        <div id="containers" style={{ width: 400, height: 400 }}>
          <div className={styles.addressInput}>
            <Input
              onChange={e => {
                this.change(e);
              }}
              value={address}
            />
            {show ? (
              <div className={`${styles.addressListWrap} addressWrap`}>
                {addressList.length > 0 ? (
                  addressList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.addressItem} ${
                          this.isActive(item) ? styles.active : ''
                        }`}
                        onClick={e => {
                          this.clickItem(e, item, index);
                        }}
                      >
                        {item.name} &ensp;<span style={{ color: '#666' }}>{item.district}</span>
                      </div>
                    );
                  })
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default SearchAddress;
