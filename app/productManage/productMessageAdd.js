import React from "react"
import $ from "jquery"
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import {Form, Select, InputNumber,DatePicker,Cascader, Switch, Slider,Radio,Button, Upload, Icon, Input} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
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
  value: 'MI',
  label: '小米',
  children: [{
    value: 'MI5',
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
export default class ProductMessageAdd extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			store:[],
		}
	}
	

	handleStoreChange(value,option){
	 	console.log(value,option);
	}
	handleSubmit = (e) => {
	   e.preventDefault();
	   var salePerson = this.refs.salePerson.refs.input.value;
	   var data = {
	   		salePerson:salePerson,
	   		store:'',
	   		productName:'',
	   		productPrice:'',
	   		productNumber:1,
	   		discount:'false',
	   		saleTime:'',
	   		payWay:'',
	   		ageRange:""
	   };
	   $.ajax({
	   		url:"/addSaleMessage.json",
	   		type:"post",
	   		data:JSON.stringify(data),
	   		success:(res)=>{
	   			console(res);
	   		}
	   })
	}

	render(){
		const formItemLayout = {
	      labelCol: { span: 7 },
	      wrapperCol: { span: 7 },
	    };
	    const buttonItemLayout = {
	      wrapperCol: { span: 14, offset: 4 },
	    }
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
		return(
			<div>
				<Header/>
	        	<Sidebar/>
	        	<div className="main-content">
	        		<div className="my-container">
	        			<Form layout='horizontal' onSubmit={this.handleSubmit}>
		        			<FormItem {...formItemLayout} label="销售人"><Input ref='salePerson' onChange={this.handleSalerChange}/></FormItem>
					        <FormItem {...formItemLayout} label="所属门店">
						        <Cascader options={residences} onChange={this.handleStoreChange}/>
					        </FormItem>
		        			<FormItem {...formItemLayout} label="售出商品">
		        				<Cascader options={productMessage}/>
		        			</FormItem>
					        <FormItem {...formItemLayout} label="售出价格">
					        	<InputNumber defaultValue={2000}
      								formatter={value => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
      								parser={value => value.replace(/\$\s?|(,*)/g, '')}
      							/>
      						</FormItem>
      						<FormItem {...formItemLayout} label="售出数量">
      							<InputNumber min={1} defaultValue={1}/>
      						</FormItem>
      						<FormItem {...formItemLayout} label="是否折扣">
					        	<RadioGroup>
					              <RadioButton value="yes">是</RadioButton>
					              <RadioButton value="no">否</RadioButton>
					            </RadioGroup>
					        </FormItem>
      						<FormItem {...formItemLayout} label="交易时间"><DatePicker/></FormItem>
					        <FormItem {...formItemLayout} label="付款方式">
					        	<Select placeholder="请选择顾客的支付方式">
					              <Option value="cash">现金交易</Option>
					              <Option value="card">银行卡交易</Option>
					              <Option value="alipay">支付宝交易</Option>
					              <Option value="weixin">微信交易</Option>
					              <Option value="other">其它</Option>
					            </Select>
					        </FormItem>
					        <FormItem {...formItemLayout} label="购买人年龄范围">
					        	<Slider range defaultValue={[20, 50]} />
					        </FormItem>
	        				<FormItem
					          wrapperCol={{
					            xs: { span: 24, offset: 0 },
					            sm: { span: 8, offset: 7},
					          }}
					        >
					          <Button type="primary" htmlType="submit" size="large">Submit</Button>
					        </FormItem>
	        			</Form>
	        		</div>
	        	</div>
			</div>
		)
	}
}