import React from "react";
import {NavLink} from "react-router-dom";
import {Icon} from 'antd';

export default class Sidebar extends React.Component{
	render(){
		
		return(
	      	<div className="main-sidebar">
	          	<ul className="sidebar-menu">
	          		<li className="treeview">
		              <NavLink to="/storeManager" activeClassName="selected"> 
		                <Icon type="appstore-o" />
		                <span className="text">门店管理</span>
		              </NavLink>
		            </li>
		            <li className="treeview">
		              <NavLink to="/productList" activeClassName="selected"> 
		                <Icon type="shopping-cart" />
		                <span className="text">商品管理</span>
		              </NavLink>
		            </li>
		            <li className="treeview">
		              <NavLink to="/addMessage" activeClassName="selected"> 
		                <Icon type="file-add" />
		                <span className="text">销售信息录入</span>
		              </NavLink>
		            </li>
		            <li className="treeview">
		              <NavLink to="/staffRanking" activeClassName="selected"> 
		                <Icon type="user" />
		                <span className="text">员工排行</span>
		              </NavLink>
		            </li>
		            <li className="treeview">
		              <NavLink to="/saleRanking" activeClassName="selected">  
		                <Icon type="line-chart" />
		                <span className="text">销售排行</span>
		              </NavLink>
		            </li>
	          	</ul>
	      	</div>
		)
	}
}