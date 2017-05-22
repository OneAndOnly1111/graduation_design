import React from 'react'
import {Link} from 'react-router-dom'
import { Menu, Icon, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/' className="sign-out">
		<span>登出</span>
		<Icon type="logout" style={{fontSize:8,marginLeft:5}}/>
	  </Link>
    </Menu.Item>
  </Menu>
);

class Header extends React.Component{
	render(){
		const nickname = window.sessionStorage.getItem("nickname");
		return (
			<div className="main-header">
				<a className="logo">
					<span>AdminLTE</span>
				</a>
				<a className="shrink-btn"><i className="fa fa-bars"></i></a>
				<div style={{float:'right',marginRight:25}}>
					<Icon type="user" style={{marginRight:5}}/>
			        <Dropdown overlay={menu}>
		              <a href="#">
		                {nickname} <Icon type="down" />
		              </a>
	                </Dropdown>  	
                </div>
                <div style={{float:'right',marginRight:25}}>欢迎访问本系统！</div>
			</div>
		)
	}
}

export default Header