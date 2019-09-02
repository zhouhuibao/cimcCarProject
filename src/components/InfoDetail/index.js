import React, { Fragment, Component } from 'react';
import { Icon, Row, Col } from 'antd';
// import { CSSTransition } from 'react-transition-group';
import { MathRandom } from '@/utils/utils';
import styles from './styles.less';

/**
 * 参数说明
 * @param  {String}  title  详情的标题
 * @param {Array} list   详情的列表,用于显示每-个字段
 */

class InfoDetail extends Component {
  state = {
    slideToggle: true,
    totalHeight: 0,
    itemClassName: '',
  };

  componentDidMount() {
    this.setState(
      {
        itemClassName: `detailItem${MathRandom()}`,
      },
      () => {
        const { itemClassName } = this.state;
        const domItem = document.getElementsByClassName(itemClassName);
        let total = 0;
        for (let i = 0; i < domItem.length; i += 1) {
          total += domItem[i].offsetHeight;
        }
        this.setState({
          totalHeight: total,
        });
      },
    );
  }

  slideToggle = () => {
    const { slideToggle } = this.state;
    this.setState({ slideToggle: !slideToggle });
  };

  render() {
    const { title, list } = this.props;
    const { slideToggle, totalHeight, itemClassName } = this.state;

    // 把传过来的一维数组转成二位数组
    const bigArr = [];
    for (let i = 0; i < list.length; i += 2) {
      const arr = [];
      for (let j = 0; j < 2; j += 1) {
        if (list[j + i] !== undefined) {
          arr.push(list[j + i]);
        }
      }
      bigArr.push(arr);
    }

    return (
      <Fragment>
        <div
          className={styles.infoTitle}
          onClick={() => {
            this.slideToggle();
          }}
        >
          <Icon
            type="caret-down"
            className={styles.iconDown}
            style={{ transform: `rotate(${slideToggle ? 0 : -90}deg)` }}
          />
          &ensp;{title}
        </div>
        <div className={styles.infoWrap} style={{ height: slideToggle ? `${totalHeight}px` : 0 }}>
          <Row gutter={16}>
            {bigArr.map(divItem => {
              return (
                <div key={MathRandom()} className={`${itemClassName} clearfix`}>
                  {divItem.map(item => {
                    return (
                      <Col className="gutter-row " span={12} key={MathRandom()}>
                        <div className={`${styles.detailItemWrap} clearfix`}>
                          <div className={styles.label}>{item.label}</div>
                          <div className={styles.value}>
                            {item.link ? <a onClick={item.click}>{item.value}</a> : item.value}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </div>
              );
            })}
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default InfoDetail;
