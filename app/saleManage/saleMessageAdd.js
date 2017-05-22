import React from "react"
import $ from "jquery"
import _ from "underscore"
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


class SaleMessageForm extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			store:[],
			name:'李美玲',
			storeInfo:'江西省南昌市红谷滩店'
		}
	}

	componentDidMount() {
		this.getAllSaler();
		this.getProductInfo();
	}

	getProductInfo = ()=>{
		$.ajax({
			url:"http://127.0.0.1:7070/product/getAll",
			contentType:'application/json',
			success:(res)=>{
				res = JSON.parse(res);
				console.log("res",res);
				var productInfo = [];
				res.data.map((item)=>{
					productInfo.push(item.brand);
				});
				this.setState({
					productInfo:_.uniq(productInfo)
				});
				console.log("productInfo",productInfo);
			}
		})
	}

	getAllSaler = ()=>{
		$.ajax({
			url:"http://127.0.0.1:7070/user/getsaleman_name",
			contentType:'application/json',
			success:(res)=>{
				res = JSON.parse(res);
				console.log(res);
				if(res.data){
					this.setState({
						salerData:res.data
					});
				}
			}
		});
	}

	handleSubmit = (e) => {
	    // e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	console.log('Received values of form: ', values);
	    	if(values.salePerson && values.product[0] && values.price &&
	    		values.saleNumber && values.discount && values.time && values.payWay && values.ageRange){
		    		$.ajax({
		    		url:"http://localhost:7070/sale/add",
		    		type:"post",
		    		contentType:'application/json',
		    		data:JSON.stringify({
		    			"region":values.store,
		    			"people":values.salePerson,
		    			"product_id":"123",
		    			"product_info":values.product,
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
		    				message.success('保存成功！');
		    			}else{
		    				message.error('保存失败');
		    			}
		    		}
		    	});
	    	}
	    });
  	}

  	onSaleChange = (val)=>{
  		console.log(val);
  		this.state.salerData?this.state.salerData.map((info)=>{
			if(info.nickname == val){
				this.setState({
					storeInfo:info.region
				});
			}
		}):null;
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
	    const salerOption = this.state.salerData?this.state.salerData.map((info)=><Option key={info.nickname}>{info.nickname}</Option>):null
		const productOption = this.state.productInfo?this.state.productInfo.map((info)=><Option key={info}>{info}</Option>):null
		return(
			<div>
				<Header/>
	        	<Sidebar/>
	        	<div className="main-content">
	        		<div className="my-container">
	        			<Form layout='horizontal'>
		        			<FormItem {...formItemLayout} label="销售人">
		        				{getFieldDecorator('salePerson', {
		        					initialValue:'李美玲',
		        					rules: [{ required: true, message: '请填写销售人姓名！' }]
		        				})(
		        					<Select onChange={this.onSaleChange}>{salerOption}</Select>
		        				)}
		        			</FormItem>
					        <FormItem {...formItemLayout} label="所属门店">
					        	{getFieldDecorator('store', {
		        					initialValue:this.state.storeInfo,
						        	rules: [{ required: true, message: '请选择门店信息！' }]
						        })(
						        	<Select></Select>
						        )}
					        </FormItem>
		        			<FormItem {...formItemLayout} label="售出商品">
		        				{getFieldDecorator('product', {
		        					initialValue:'小米',
						        	rules: [{ required: true, message: '请选择售出商品的信息！' }]
						        })(
						        	<Select>{productOption}</Select>
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
					          <Button type="primary" htmlType="submit" size="large" onClick={this.handleSubmit}>保存</Button>
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