import React, { Fragment } from 'react';
import { Icon } from 'antd';
import { Map, Markers } from 'react-amap';
import { amapKey } from '@/utils/utils';
import styles from './styles.less';

/**
 * 参数说明
 * @param  {Boolean}  visible  是否显示地图
 * @param {Function} closeAmap   关闭弹出的地图
 * @param {Array} position   覆盖物的经纬度
 */

function AmapComponent(props) {
  const { position, visible, closeAmap } = props;

  return (
    <Fragment>
      {visible ? (
        <div className={styles.amapWrap}>
          <Icon type="close" className={styles.closeAmap} onClick={closeAmap} />
          <div className={styles.amapComponent}>
            <Map
              plugins={['ToolBar']}
              zoom={10}
              center={position && position.length > 0 ? position[0].position : false}
              amapkey={amapKey}
            >
              <Markers markers={position} />
            </Map>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
export default AmapComponent;
