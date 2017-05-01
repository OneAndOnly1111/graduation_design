import React from "react";
import $ from "jquery";
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom'
export default class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			userData:[]
		}
	}

	componentDidMount() {
		console.log("userData",this.state.userData);
	}
	componentDidMount() {
		console.log("userData",this.state.userData);
	}
	handleSubmit(event){
		event.persist();
		var email = $("input[name='email']").val();
		var password = $("input[name='password']").val();
		if(email&&password){
			$.ajax({
				url:'http://localhost:7070/user/login',
				type:'post',
				contentType:"application/json",
				data:JSON.stringify({
					"email":email,
					"password":password
				}),
				success:(res)=>{
					res = JSON.parse(res);
					if(res.data){
						console.log(res.data);
						this.setState({
							userData:res.data
						});
						window.location.href=window.location.href+'productList';
					}else{
						alert(res.meta.message);
						event.preventDefault();
					}
				}
			});
		}else{
			alert('请先填写邮箱或者密码！');
			event.preventDefault();
		}
	}
	render(){
		return(
			<div className="login-container">
				<div className="login-box">
					<div className="form-box">
						<label>邮箱</label>
						<input type="text" name="email"/>
					</div>
					<div className="form-box">
						<label>密码</label>
						<input type="password" name="password"/>
					</div>
					<button className="login-btn" onClick={this.handleSubmit.bind(this)}>登 录</button>
				</div>
				<div className="create-user-box">
					<span>还是新用户？ <Link to="/register">创建一个账号</Link></span>
				</div>
			</div>
			
		)
	}
}