import React from 'react';
import { Cascader } from 'antd';
import CityData from '@/utils/city.json';
import { isEmpty } from '@/utils/utils';

function SelectAddress(props) {
  const { change, placeholder, style } = props;
  return (
    <div>
      <Cascader
        style={style}
        placeholder={isEmpty(placeholder) ? placeholder : '选择省/市/区'}
        options={CityData.data}
        onChange={change}
        fieldNames={{ label: 'label', value: 'id', children: 'children' }}
      />
    </div>
  );
}

export default SelectAddress;
