import React from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';

/**
 * 参数说明
 * @param  {array}  menu  生成下拉列表
 * @param {function} handleMenuClick 点击下拉列表里面的事件
 */

function MoreBtn(props) {
  const { handleMenuClick, menu } = props;
  const menus = (
    <Menu onClick={handleMenuClick}>
      {menu.map(item => {
        return <Menu.Item key={item.key}>{item.value}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menus}>
      <Button>
        更多 <Icon type="down" />
      </Button>
    </Dropdown>
  );
}

export default MoreBtn;
