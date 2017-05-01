import React from "react";
import $ from "jquery";
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom'
export default class Register extends React.Component{

	handleRegister(){
		var name = this.refs.name.value;
		var email = this.refs.email.value;
		var password  = this.refs.password.value;
		var region   = this.refs.region.value;
		var job = this.refs.position.value;
		console.log(name,email,password,region,job);
		var data = {
			nickname:name,
			email:email,
			password:password,
			region:region,
			job:job
		}
		if(name&&email&&password&&region&&job){
			$.ajax({
				url:"http://127.0.0.1:7070/user/register",
				method:'post',
				contentType:'application/json',
				data:JSON.stringify(data),
				success:(res)=>{
					var res = JSON.parse(res);
					if(res.data){
						alert('恭喜你，注册成功，去登录吧~');
					}else{
						alert(res.meta.message);
					}
				}
			})
		}else{
			alert('请先填完整信息！');
		}
		
	}
	render(){
		return(
			<div className="register-container">
				<div className="register-box">
					<h3 className="reginster-text">注册</h3>
					<div className="form-group">
						<span><b>*</b>姓名：</span><input type="text" className="form-input" ref="name"/>
					</div>
					<div className="form-group">
						<span><b>*</b>邮箱：</span><input type="email" className="form-input" ref="email"/>
					</div>
					<div className="form-group">
						<span><b>*</b>密码： </span><input type="password" className="form-input" ref="password"/>
					</div>
					<div className="form-group">
						<span><b>*</b>所属地区：</span><select name="region" className="form-input" ref="region">
						<option>上海</option>
						<option>南昌</option>
						<option>苏州</option>
						<option>南京</option>
						<option>北京</option>
						</select>
					</div>
					<div className="form-group">
						<span><b>*</b>职位：</span><select name="region" className="form-input" ref="position">
						<option value="salesman">销售员</option>
						<option value="manager">销售经理</option>
						</select>
					</div>
					<div className="accept-box">
						<input type='checkbox' className="form-checkbox"/> <span>接受注册许可</span>
					</div>
					<button className="register-btn" onClick={this.handleRegister.bind(this)}>注册</button>
					<div className="accept-box">
						<span>已有账号？</span>
					</div>
					<Link to="/" className="login-btn">登录</Link>
				</div>
			</div>
		)
	}
}