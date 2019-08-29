import React, { Fragment, Component } from 'react';
import { Icon } from 'antd';
import { CSSTransition } from 'react-transition-group';
import styles from './styles.less';

class InfoDetail extends Component {
  state = {
    height: 0,
    open: true,
    slideToggle: true,
  };

  slideToggle = () => {
    this.setState({ slideToggle: !this.state.slideToggle });
  };

  render() {
    const { title, list, open } = this.props;
    const { slideToggle } = this.state;
    return (
      <Fragment>
        <div
          className={styles.infoTitle}
          onClick={() => {
            this.slideToggle();
          }}
        >
          <Icon type="caret-down" />
          &ensp;{title}
        </div>
        <CSSTransition
          in={slideToggle}
          timeout={300}
          classNames="alert"
          unmountOnExit
          onEntered={el => {
            console.log(el);
            //   el.style.color='blue'   //可选，动画入场之后的回调，el指被包裹的dom，让div内的字体颜色等于蓝色
          }}
          onExited={el => {
            console.log(el);
            // xxxxx   //同理，动画出场之后的回调，也可以在这里来个setState啥的操作
          }}
          //   onEnter={() => setShowButton(false)}
          //   onExited={() => setShowButton(true)}
        >
          <div className={styles.infoWrap}>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
            <p>123123</p>
          </div>
        </CSSTransition>
      </Fragment>
    );
  }
}
export default InfoDetail;
