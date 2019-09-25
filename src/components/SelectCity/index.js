import React, { Component } from 'react';
import { Modal, Checkbox, Icon } from 'antd';
import { data } from '@/utils/city.json';
import styles from './styles.less';

class SelectCity extends Component {
  state = {
    checkedList: [],
    cityData: data,
    cityList: [],
    areaList: [],
    defaultCityList: [],
    defaultAreaList: [],
  };

  onChange = checkedValues => {
    console.log(checkedValues);
  };

  onChangeCity = checkedValues => {
    console.log(checkedValues);
    this.setState({
      defaultCityList: checkedValues,
    });
  };

  onChangeArea = checkedValues => {
    console.log(checkedValues);
    this.setState({
      defaultAreaList: checkedValues,
    });
  };

  checkItem = (e, item) => {
    console.log(e);
    console.log(item);
    this.checkedCityOrArea(item);
  };

  // 点击右边的更多样式按钮 >
  clickRight = (item, type) => {
    console.log(item);

    this.setState(
      {
        [type]: item.children,
      },
      () => {
        const { cityList, cityData } = this.state;

        if (type === 'cityList') {
          this.setActive(cityData, item.id, 'cityData');
        } else {
          this.setActive(cityList, item.id, 'cityList');
        }
      },
    );
  };

  checkedCityOrArea = props => {
    const cityarr = [];
    const areaarr = [];
    if (props.parent_id === '0') {
      props.children.forEach(item => {
        console.log(item);
        cityarr.push(item.id);
        item.children.forEach(childrenItem => {
          areaarr.push(childrenItem.id);
        });
      });
    } else {
      props.children.forEach(item => {
        areaarr.push(item.id);
      });
    }

    this.setState({
      defaultCityList: cityarr,
      defaultAreaList: areaarr,
    });
  };

  // 选择省之后把市和区选中
  checkProvinceItem = (e, props) => {
    const cityarr = [];
    const areaarr = [];
    if (e.target.checked) {
      props.children.forEach(item => {
        cityarr.push(item.id);
        item.children.forEach(childrenItem => {
          areaarr.push(childrenItem.id);
        });
      });
    }
    this.setState({
      defaultCityList: cityarr,
      defaultAreaList: areaarr,
    });
  };

  // 选择市之后把对应的省选中,把市下面的所有区选中
  checkCityItem = (e, props) => {
    console.log(e.target.checked);
    const areaarr = [];
    if (e.target.checked) {
      props.children.forEach(item => {
        areaarr.push(item.id);
      });
    }
    this.setState({
      defaultAreaList: areaarr,
    });
  };

  // 选择区域
  checkAreaItem = (e, props) => {
    const { defaultAreaList, defaultCityList } = this.state;
    const arr = [];
    console.log(defaultAreaList);
    if (defaultAreaList.length <= 1) {
      defaultCityList.forEach((item, index) => {
        if (item.id !== props.parent_id) {
          arr.push(item.id);
        }
      });
      console.log(arr);
    }
  };

  // 设置选中的样式添加Active
  setActive = (arr, activeId, type) => {
    arr.forEach(item => {
      if (item.id === activeId) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    this.setState({
      [type]: arr,
    });
  };

  render() {
    const {
      checkedList,
      cityList,
      areaList,
      cityData,
      defaultCityList,
      defaultAreaList,
    } = this.state;
    const { visible, onOk, onCancel } = this.props;
    return (
      <Modal title="选择区域" visible={visible} onOk={onOk} width={1000} onCancel={onCancel}>
        <div className={styles.SelectCity}>
          <div className={styles.SelectCityItem}>
            <p style={{ padding: '10px 0 0 10px' }}>省份</p>
            <Checkbox.Group onChange={this.onChange} style={{ width: '100%' }}>
              {cityData.map(item => {
                return (
                  <div
                    className={`${styles.cityWrap} ${item.active ? styles.active : ''}`}
                    key={item.id}
                  >
                    <div className={styles.checkCity}>
                      <Checkbox
                        value={item.id}
                        onChange={e => {
                          this.checkProvinceItem(e, item);
                        }}
                      >
                        {item.label}
                      </Checkbox>
                    </div>
                    <div
                      className={styles.moreRight}
                      onClick={() => {
                        this.clickRight(item, 'cityList');
                      }}
                    >
                      <Icon type="caret-right" />
                    </div>
                  </div>
                );
              })}
            </Checkbox.Group>
          </div>
          <div className={styles.SelectCityItem}>
            <p style={{ padding: '10px 0 0 10px' }}>城市</p>
            <Checkbox.Group
              onChange={this.onChangeCity}
              value={defaultCityList}
              style={{ width: '100%' }}
            >
              {cityList.map(item => {
                return (
                  <div
                    className={`${styles.cityWrap} ${item.active ? styles.active : ''}`}
                    key={item.id}
                  >
                    <div className={styles.checkCity}>
                      <Checkbox
                        value={item.id}
                        onChange={e => {
                          this.checkCityItem(e, item);
                        }}
                      >
                        {item.label}
                      </Checkbox>
                    </div>
                    <div
                      className={styles.moreRight}
                      onClick={() => {
                        this.clickRight(item, 'areaList');
                      }}
                    >
                      <Icon type="caret-right" />
                    </div>
                  </div>
                );
              })}
            </Checkbox.Group>
          </div>
          <div className={styles.SelectCityItem}>
            <p style={{ padding: '10px 0 0 10px' }}>地区</p>
            <Checkbox.Group onChange={this.onChangeArea} value={defaultAreaList}>
              {areaList.map(item => {
                return (
                  <div className={styles.cityWrap} key={item.id}>
                    <div className={styles.checkCity}>
                      <Checkbox
                        value={item.id}
                        onChange={e => {
                          this.checkAreaItem(e, item);
                        }}
                      >
                        {item.label}
                      </Checkbox>
                    </div>
                  </div>
                );
              })}
            </Checkbox.Group>
          </div>
          <div className={styles.SelectCityItem}>
            <p style={{ padding: '10px 0 0 10px' }}>已选</p>
          </div>
        </div>
      </Modal>
    );
  }
}
export default SelectCity;
