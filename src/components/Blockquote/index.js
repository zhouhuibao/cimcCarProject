import React from 'react';
import { MathRandom } from '@/utils/utils';
import styles from './styles.less';

console.log(MathRandom());

/**
 * 参数说明
 * @param  {String}  title  引用的文字
 * @param {Array} btnData   按钮列表
 */

function Blockquote(props) {
  const { title, style, btnData } = props;
  return (
    <div className={styles.blockquote} style={style}>
      <div className="clearfix">
        <div className={styles.blockquoteLeft}>
          <span />
          {title}
        </div>
        {btnData && btnData.length > 0 ? (
          <div className={styles.blockquoteRight}>
            <div className="clearfix">
              {btnData.map((item, i) => {
                return (
                  <div className={styles.blockquoteRightItem} key={MathRandom()}>
                    {i + 1 !== btnData.length ? <em /> : null}
                    <a onClick={item.click}>{item.title}</a>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Blockquote;
