import React from 'react'

class Header extends React.Component{
	render(){
		return (
			<div className="main-header">
				<a className="logo">
					<span>AdminLTE</span>
				</a>
				<a className="shrink-btn"><i className="fa fa-bars"></i></a>
				<a className="sign-out">
					<i className="fa fa-sign-out"></i>
					<span>登出</span>
				</a>
			</div>
		)
	}
}

export default Header