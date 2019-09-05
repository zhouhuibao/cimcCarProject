import React, { Component } from 'react';
import { Icon } from 'antd';
import { MathRandom } from '@/utils/utils';
import styles from './styles.less';

class CardComponent extends Component {
  state = {
    status: true,
    height: 'auto',
    itemClassName: '',
  };

  componentDidMount() {
    this.setState(
      {
        itemClassName: `detailItem${MathRandom()}`,
      },
      () => {
        const { itemClassName } = this.state;
        const domContent = document.getElementsByClassName(itemClassName)[0];
        this.setState({
          height: domContent.offsetHeight,
        });
      },
    );
  }

  clickDown = () => {
    const { status } = this.state;
    this.setState({
      status: !status,
    });
  };

  render() {
    const { title, children, dom } = this.props;
    const { status, height, itemClassName } = this.state;
    return (
      <div className={styles.CardWrap}>
        <div className="clearfix" style={{ padding: '16px 24px' }}>
          <div className={styles.CardHeaderLeft}>{title}</div>
          <div className={styles.CardHeaderRight}>
            {dom || (
              <Icon
                type="caret-up"
                style={{ cursor: 'pointer', transition: '.5s' }}
                className={status ? styles.down : styles.up}
                onClick={() => {
                  this.clickDown();
                }}
              />
            )}
          </div>
        </div>
        <div
          className={`${itemClassName} ${status ? styles.CardContentDown : styles.CardContentUp}`}
          style={{ minHeight: status ? height : 0, height: status ? 'auto' : 0, transition: '.3s' }}
        >
          <div style={{ padding: '16px 24px' }}>{children}</div>
        </div>
      </div>
    );
  }
}
export default CardComponent;
