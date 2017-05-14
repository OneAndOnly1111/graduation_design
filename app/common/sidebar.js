import React from "react";
import {NavLink} from "react-router-dom";

export default class Sidebar extends React.Component{
	render(){
		return(
	      	<div className="main-sidebar">
		        <div className="user-panel">
		            <div className="user-image">
		                 <img src="../../img/user.jpg"/>
		            </div>
		            <span>OneAndOnly</span>
		        </div>
	          	<ul className="sidebar-menu">
	          		<li className="treeview">
		              <NavLink to="/productList" activeClassName="selected"> 
		                <i className="fa fa-pie-chart"></i>
		                <span className="text">商品列表</span>
		              </NavLink>
		            </li>
		            <li className="treeview">
		              <NavLink to="/addMessage" activeClassName="selected"> 
		                <i className="fa fa-line-chart"></i>
		                <span className="text">销售信息录入</span>
		              </NavLink>
		            </li>
		            <li className="treeview">
		              <NavLink to="/staffRanking" activeClassName="selected"> 
		                <i className="fa fa-files-o"></i>
		                <span className="text">员工排行</span>
		              </NavLink>
		            </li>
		            <li className="treeview">
		              <NavLink to="/saleRanking" activeClassName="selected">  
		                <i className="fa fa-tachometer"></i>
		                <span className="text">销售排行</span>
		              </NavLink>
		            </li>
	          	</ul>
	      	</div>
		)
	}
}