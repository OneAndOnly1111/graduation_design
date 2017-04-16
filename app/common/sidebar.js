import React from "react"

class Sidebar extends React.Component{
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
						<a>	
							<i className="fa fa-tachometer"></i>
							<span className="text">Dashborad</span>
						</a>
					</li>
					<li className="treeview">
						<a>	
							<i className="fa fa-files-o"></i>
							<span className="text">总览</span>
						</a>
					</li>
					<li className="treeview">
						<a>	
							<i className="fa fa-pie-chart"></i>
							<span className="text">展示</span>
						</a>
					</li>
					<li className="treeview">
						<a>	
							<i className="fa fa-line-chart"></i>
							<span className="text">信息</span>
						</a>
					</li>
				</ul>
			</div>
		)
	}
}

export default Sidebar;