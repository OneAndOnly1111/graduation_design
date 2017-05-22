import React from "react";
import $ from "jquery";
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
const loginBox={
	backgroundColor:"#fff",
	width:380,
	padding:'20px 25px',
	position:"absolute",
	left:'50%',
	marginLeft:-190,
	top:'50%',
	marginTop:-148,
	boxShadow:'1px 1px 10px #888888',
	borderRadius:4
}
class NormalLoginForm extends React.Component{
	
	handleSubmit = (e)=>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
	        console.log('Received values of form: ', values);
	        if(values.email && values.password){
	        	$.ajax({
	        		url:'http://localhost:7070/user/login',
					type:'post',
					contentType:"application/json",
					data:JSON.stringify({
						"email":values.email,
						"password":values.password
					}),
					success:(res)=>{
						res = JSON.parse(res);
						console.log(res);
						if(res.data){
							e.preventDefault();
							window.sessionStorage.setItem("email",res.data.email);
							window.sessionStorage.setItem("password",res.data.password);
							window.sessionStorage.setItem("nickname",res.data.nickname);
							window.sessionStorage.setItem("job",res.data.job);
							window.location.href=window.location.href+'productList';
						}else{
							message.error("邮箱或密码有误！");
						}
					}
	        	})
	        }
	    });
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<div style={loginBox}>
				<div style={{marginBottom:10}}>
					<img src="../../img/logo.svg" style={{width:50,marginRight:50}} />
					<h4 style={{display:'inline-block'}}>销售信息管理系统</h4>
				</div>
				<Form className="login-form">
			        <FormItem>
			          {getFieldDecorator('email', {
			             rules: [{
			              type: 'email', message: '邮箱格式不正确！',
			            }, {
			              required: true, message: '请先输入邮箱！',
			            }],
			          })(
			            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="邮箱" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('password', {
			            rules: [{ required: true, message: '请先输入密码!' }],
			          })(
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: true,
			          })(
			            <Checkbox>Remember me</Checkbox>
			          )}
			          <a className="login-form-forgot" href="">Forgot password</a>
			          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
			            Log in
			          </Button>
			          Or <Link to="/register">register now!</Link>
			        </FormItem>
			      </Form>
			</div>
		)
	}
}

const Login =  Form.create()(NormalLoginForm);
export default Login