import React from "react";
import $ from "jquery";
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message, Select, Cascader} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const registerBox = {
	width:600,
	border:'1px solid #ddd',
	backgroundColor:'#fff',
	position:"absolute",
	left:'50%',
	marginLeft:-300,
	top:'50%',
	marginTop:-233,
	padding:'20px 0 0 0',
	boxShadow:'1px 1px 10px #888888',
	borderRadius:4
}

class RegistrationForm extends React.Component{

	state = {
		store:[]
	}

	componentDidMount() {
		$.ajax({
			url:"http://127.0.0.1:7070/store/get_all",
			contentType:'application/json',
			success:(res)=>{
				res = JSON.parse(res);
				console.log(res);
				const arr = [];
				res.data.map(ele=>{
					arr.push(ele.province+ele.district+ele.name)
				});
				this.setState({
					store:arr
				})
			}
		})
	}

	handleRegister = (e)=>{
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        if(values.nickname && values.email && values.password && values.region && values.job){
	        	$.ajax({
					url:"http://127.0.0.1:7070/user/register",
					method:'post',
					contentType:'application/json',
					data:JSON.stringify({
						nickname:values.nickname,
						email:values.email,
						password:values.password,
						region:values.region,
						job:values.job
					}),
					success:(res)=>{
						var res = JSON.parse(res);
						if(res.data){
							message.success('注册成功！即将3s后跳转至登录页面');
							window.setTimeout(()=>{
								window.location.href='http://127.0.0.1:8080'
							},3000);
						}else{
							message.error(res.meta.message);
						}
					}
				});
	        }
	      }
	    });
	}
	
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };
	     const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 14,
	          offset: 6,
	        },
	      },
	    };
	    const storeOption = this.state.store.map(store=><Option key={store}>{store}</Option>)
		return(
			<div style={registerBox}>
				<div style={{marginBottom:20,textAlign:'center'}}>
					<img src="../../img/logo.svg" style={{width:40,marginRight:10,verticalAlign:'middle'}} />
					<h4 style={{display:'inline-block',verticalAlign:'middle'}}>注册</h4>
				</div>
				<Form onSubmit={this.handleRegister}>
					<FormItem {...formItemLayout} label="姓名">
						{getFieldDecorator('nickname', {
				            rules: [{
				              required: true, message: '请填写姓名！',
				            }],
				          })(
				            <Input />
				          )}
					</FormItem>
					<FormItem {...formItemLayout} label="邮箱">
						{getFieldDecorator('email', {
				            rules: [{
				              type: 'email', message: '邮箱格式不正确！',
				            }, {
				              required: true, message: '请填写邮箱！',
				            }],
				          })(
				            <Input />
				          )}
					</FormItem>
					<FormItem {...formItemLayout} label="密码">
						{getFieldDecorator('password', {
				            rules: [{
				              required: true, message: '请填写密码！',
				            }],
				          })(
				            <Input type="password" />
				          )}
					</FormItem>
					<FormItem
			          {...formItemLayout}
			          label="所属门店"
			        >
			          {getFieldDecorator('region', {
			            rules: [{
				              required: true, message: '请选择您所属的门店！',
				         }],
			          })(
			            <Select>{storeOption}</Select>
			          )}
			        </FormItem>
					<FormItem {...formItemLayout} label="职位">
						{getFieldDecorator('job', {
				            rules: [{
				              required: true, message: '请选择您的岗位！',
				            }],
				          })(
				            <Select>
				            	<Option value="saleman">销售员</Option>
				            	<Option value="manager">销售经理</Option>
				            </Select>
				          )}
					</FormItem>
					<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
			          {getFieldDecorator('agreement', {
			            valuePropName: 'checked',
			          })(
			            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
			          )}
			        </FormItem>
			        <FormItem {...tailFormItemLayout}>
			          <Button type="primary" htmlType="submit" size="large">Register</Button>
			        </FormItem>
				</Form>
			</div>
		)
	}
}

const Register = Form.create()(RegistrationForm);
export default Register