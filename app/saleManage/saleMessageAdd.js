import React from "react"
import $ from "jquery"
import moment from 'moment'
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import {Form, Select, InputNumber,DatePicker,Cascader, 
Switch, Slider,Radio,Button, Upload, Icon, Input,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM/DD';

const residences = [{
  value: '浙江',
  label: '浙江',
  children: [{
    value: '杭州',
    label: '杭州',
    children: [{
      value: '西湖店',
      label: '西湖店',
    }],
  },{
    value: '绍兴',
    label: '绍兴',
    children: [{
      value: '越城区',
      label: '越城区店',
    }],
  }],
}, {
  value: '江苏',
  label: '江苏',
  children: [{
    value: '南京',
    label: '南京',
    children: [{
      value: '夫子庙店',
      label: '夫子庙店',
    }],
  }],
}];

const productMessage = [{
  value: '小米',
  label: '小米',
  children: [{
    value: '小米5',
    label: '小米5',
    children: [{
      value: '3GB/32GB',
      label: '3GB/32GB',
    },{
      value: '3GB/64GB',
      label: '3GB/32GB',
    }],
  },{
    value: 'MI6',
    label: '小米6',
    children: [{
      value: '6GB/64GB',
      label: '6GB/64GB',
    },{
      value: '6GB/128GB',
      label: '6GB/128GB',
    }],
  }],
}, {
  value: 'iphone',
  label: 'iphone',
  children: [{
    value: 'iphone7',
    label: 'iphone7',
    children: [{
      value: '2GB/64GB',
      label: '2GB/64GB',
    }],
  }],
}];

class SaleMessageForm extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			store:[],
		}
	}

	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	console.log('Received values of form: ', values);
	    	$.ajax({
	    		url:"http://localhost:7070/sale/add",
	    		type:"post",
	    		contentType:'application/json',
	    		data:JSON.stringify({
	    			"region":values.store[0]+values.store[1]+values.store[2],
	    			"people":values.salePerson,
	    			"product_id":"123",
	    			"product_info":values.product[0]+values.product[1]+values.product[2],
	    			"price":values.price,
	    			"count":values.saleNumber,
	    			"discount":values.discount,
	    			"time":moment(values.time).format('X')*1000,
	    			"pay":values.payWay,
	    			"age":values.ageRange
	    		}),
	    		success:(res)=>{
	    			res = JSON.parse(res);
	    			console.log(res);
	    			if(res.meta.message=='ok'){
	    				message.success('您已成功添加一条记录！');
	    			}else{
	    				message.error('您已成功添加一条记录！');
	    			}
	    		}
	    	})
	    });
  	}

	render(){
		const formItemLayout = {
	      labelCol: { span: 7 },
	      wrapperCol: { span: 9 },
	    };
	    const buttonItemLayout = {
	      wrapperCol: { span: 14, offset: 4 },
	    }
	    const { getFieldDecorator } = this.props.form;
		return(
			<div>
				<Header/>
	        	<Sidebar/>
	        	<div className="main-content">
	        		<div className="my-container">
	        			<Form layout='horizontal'>
		        			<FormItem {...formItemLayout} label="销售人">
		        				{getFieldDecorator('salePerson', {
		        					initialValue:'张三',
		        					rules: [{ required: true, message: '请填写销售人姓名！' }]
		        				})(
		        					<Input />
		        				)}
		        			</FormItem>
					        <FormItem {...formItemLayout} label="所属门店">
						        {getFieldDecorator('store', {
						        	initialValue:['浙江', '杭州', '西湖店'],
						        	rules: [{ required: true, message: '请选择门店！' }]
						        })(
						        	<Cascader options={residences}/>
						        )}
					        </FormItem>
		        			<FormItem {...formItemLayout} label="售出商品">
		        				{getFieldDecorator('product', {
		        					initialValue:['小米', '小米5', '3GB/32GB'],
						        	rules: [{ required: true, message: '请选择售出商品的信息！' }]
						        })(
						        	<Cascader options={productMessage}/>
						        )}
		        			</FormItem>
					        <FormItem {...formItemLayout} label="售出价格">
					        	{getFieldDecorator('price', {
					        		initialValue:'2000',
						        	rules: [{ required: true, message: '请输入价格' }]
						        })(
						        	<InputNumber
      								
      								/>
						        )}
      						</FormItem>
      						<FormItem {...formItemLayout} label="售出数量">
      							{getFieldDecorator('saleNumber', {
      								initialValue:'1',
						        	rules: [{ required: true, message: '请输入售出数量！' }]
						        })(
						        	<InputNumber min={1} />
						        )}
      						</FormItem>
      						<FormItem {...formItemLayout} label="是否折扣">
      							{getFieldDecorator('discount', {
      								initialValue:'1',
						        	rules: [{ required: true, message: '请选择！' }]
						        })(
						        	<RadioGroup>
						              <RadioButton value="0">是</RadioButton>
						              <RadioButton value="1">否</RadioButton>
						            </RadioGroup>
						        )}
					        </FormItem>
      						<FormItem {...formItemLayout} label="交易时间">
      							{getFieldDecorator('time', {
						        	rules: [{ required: true, message: '请选择时间' }]
						        })(
						        	<DatePicker format={dateFormat}/>
						        )}
      						</FormItem>
					        <FormItem {...formItemLayout} label="付款方式">
					        	{getFieldDecorator('payWay', {
      								initialValue:'card',
						        	rules: [{ required: true, message: '请选择付款方式' }]
						        })(
						        	<Select placeholder="请选择顾客的支付方式">
						              <Option value="cash">现金交易</Option>
						              <Option value="card">银行卡交易</Option>
						              <Option value="alipay">支付宝交易</Option>
						              <Option value="weixin">微信交易</Option>
						              <Option value="other">其它</Option>
						            </Select>
						        )}
					        </FormItem>
					        <FormItem {...formItemLayout} label="购买人年龄范围">
						        {getFieldDecorator('ageRange', {
						        	initialValue:'under25',
							        rules: [{ required: true, message: '请选择范围' }]
							    })(
						        	<RadioGroup>
						        	  <Radio value="up18">18以下</Radio>
						              <Radio value="under25">18-25</Radio>
						              <Radio value="under35">25-35</Radio>
						              <Radio value="under50">35-50</Radio>
						              <Radio value="up50">50以上</Radio>
						            </RadioGroup>
							    )}
					        </FormItem>
	        				<FormItem
					          wrapperCol={{
					            xs: { span: 24, offset: 0 },
					            sm: { span: 8, offset: 7},
					          }}
					        >
					          <Button type="primary" htmlType="submit" size="large" onClick={this.handleSubmit}>Submit</Button>
					        </FormItem>
	        			</Form>
	        		</div>
	        	</div>
			</div>
		)
	}
}

const SaleMessageAdd = Form.create()(SaleMessageForm)

export default SaleMessageAdd