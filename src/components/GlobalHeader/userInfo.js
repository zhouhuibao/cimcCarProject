import React,{Component} from 'react';
import {Dropdown,Menu,Icon} from 'antd';
import { router } from 'umi';

class UserInfo extends Component{

    state={
        name:'13266768846'
    }
    
    render(){
        const {name} = this.state;
        const menu = (
            <Menu>
              <Menu.Item>
                <span
                    onClick={()=>{router.push('/user/login')}}
                >
                  退出登录
                </span>
              </Menu.Item>
            </Menu>
          ); 
        return(
            <Dropdown overlay={menu}>
                <span>{name}</span>
                {/* <a className="ant-dropdown-link" href="#">
                {name}
                    <Icon type="down" />
                </a> */}
            </Dropdown>
        )
    }
}

export default UserInfo;