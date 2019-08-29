import React from 'react';
import { MathRandom } from '@/utils/utils';
import styles from './styles.less';

function Information(props) {
  const { infoList } = props;
  return (
    <div className={styles.infoWrap}>
      {infoList.map(item => {
        return (
          <div className={styles.infoItem} key={MathRandom()}>
            <p>{item.title}</p>
            <p>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Information;
