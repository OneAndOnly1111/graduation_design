import React from "react";

export default class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	render(){
		return(
			<div className="login-container">
				<div className="login-box">
					<div className="form-box">
						<label>用户名</label>
						<input type="text"/>
					</div>
					<div className="form-box">
						<label>密码</label>
						<input type="password"/>
					</div>
					<button className="login-btn">登 录</button>
				</div>
				<div className="create-user-box">
					<span>还是新用户？ <a>创建一个账号</a></span>
				</div>
			</div>
			
		)
	}
}