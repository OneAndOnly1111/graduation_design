import React from "react"
import $ from "jquery"
import moment from 'moment'
import echarts from 'echarts'
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import {Form, Select, InputNumber,DatePicker,Cascader, 
Switch, Slider,Radio,Button, Upload, Icon, Input,message,Row,Col,Card,Badge} from 'antd';
const Option = Select.Option;

export default class SaleRanking extends React.Component{

	constructor(props) {
		super(props);
		this.state={
			storeData:[],
			brandSummary:[],
			storeVal:''
		}
	}

	getStore(){
		$.ajax({
			"url":"http://127.0.0.1:7070/store/get_all",
			"type":"get",
			success:(res)=>{
				res = JSON.parse(res);
				var storeVal = res.data[0].name;
				this.setState({
					storeData:res.data,
					storeVal:storeVal
				});
				this.getDailySale(storeVal);
				this.getPieSale(storeVal);
			}
		});
	}

	getDailySale(store_name){
		$.ajax({
			"url":"http://127.0.0.1:7070/store/get_sale_by_store/"+store_name,
			"type":"get",
			success:(res)=>{
				res = JSON.parse(res);
				var time =[] ,dailyData=[];
				res.data.sort(function(a,b){
					return a.time-b.time
				});
				res.data.map((ele)=>{
					var date=new Date(Math.round(ele.time));
					date = moment(date).format('YYYY-MM-DD');
					time.push(date);
					dailyData.push(ele.total);
				});
				this.setState({
					timestrap:time,
					dailyData:dailyData
				});
			}
		});
	}

	getPieSale(store_name){
		$.ajax({
			"url":"http://127.0.0.1:7070/store/get_count_by_store/"+store_name,
			"type":"get",
			success:(res)=>{
				res = JSON.parse(res);
				console.log("pieData",res.data);
				this.setState({
					pieData:res.data,
				});
			}
		});
	}

	componentDidMount() {
		this.getStore();
		$.ajax({
			"url":"http://127.0.0.1:7070/store/get_current_month_sum",
			"type":"get",
			success:(res)=>{
				res = JSON.parse(res);
				this.setState({
					summary:res.data
				})
			}
		});
		$.ajax({
			"url":"http://127.0.0.1:7070/store/get_each_store_sum",
			"type":"get",
			success:(res)=>{
				res = JSON.parse(res);
				console.log(res);
				this.setState({
					brandSummary:res.data
				})
			}
		})
	}

	componentDidUpdate(prevProps, prevState) {
		this.drawChart();
	}

	drawChart(){
		var brandChart = echarts.init(document.getElementById('brandChart'));
		brandChart.setOption({
		    title : {
		        text: '本月销售统计',
		        x:'center',
		        textStyle:{
		        	fontSize:16
		        }
		    },
		    backgroundColor: "#fff",
		    tooltip : {
		        trigger: 'axis',
		        formatter: "{a} <br/>{b} : ￥{c}"
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    grid: {
		        left: '4%',
		        right: '6%',
		        bottom: '3%',
		        containLabel: true
		    },
		    dataZoom:[{
		    	type: 'inside'
		    }],
		    yAxis:  {
		        type: 'value'
		    },
		    xAxis: {
		        type: 'category',
		        data: this.state.timestrap
		    },
		    series: [{
		        name: '销量',
		        type: 'line',
		        markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
		        data: this.state.dailyData
		    }]
		});

		var ageChart = echarts.init(document.getElementById('ageChart'));
		ageChart.setOption({
		     title : {
		        text: '本月占比分析',
		        x:'center',
		        textStyle:{
		        	fontSize:16
		        }
		    },
		    backgroundColor: "#fff",
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}台 ({d}%)"
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    series: [{
		        name: '销量',
		        type: 'pie',
		        data: this.state.pieData
		    }]
		});
	}

	onStoreChange = (val)=>{
		console.log(val)
		this.setState({
			storeVal:val
		})
		this.getDailySale(val);
		this.getPieSale(val);
	}
	
	render(){
		const storeOption = this.state.storeData.map(store=><Option key={store.name}>{store.name}</Option>)
		return(
			<div>
				<Header/>
            	<Sidebar/>
            	<div className="main-content">
            		<div className="my-container">
            			<Row gutter={16}>
            				<Col span={7}>
            					<Card style={{ width: '100%',height:100}} bodyStyle={{ padding: 0 }}>
            						<span style={{display:'inline-block',width:'30%',lineHeight:'100px',textAlign:'center',backgroundColor:'#24C0F9',color:'#fff',fontSize:'28px'}}>
            							<Icon type="bank" />
            						</span>
            						<span style={{display:'inline-block',width:'70%',textAlign:'center'}}>
            							<span style={{fontSize:14}}>本月销售金额</span>
            							<div style={{fontSize:24,fontWeight:"bold"}}>￥ {this.state.summary}</div>
            						</span>
								</Card>
            				</Col>
            				<Col span={17}>
            					<Card style={{ width: '100%',height:100}} bodyStyle={{ padding: 0 }}>
            						{
            							this.state.brandSummary.length?this.state.brandSummary.map((ele,i)=>{
            								return <span style={{display:'inline-block',padding:'13px 1px'}} key={i}>{ele.name}：
            										<span style={{fontSize:14,fontWeight:"bold"}}>￥{ele.value}</span>
            									</span>
            							}):null
            						}
								</Card>
            				</Col>
            			</Row>
            			<Row style={{margin:'20px 0px'}}>
            				<Col span={24}>
            					请选择门店：<Select value={this.state.storeVal} style={{width:250}} onChange={this.onStoreChange}>
            						{storeOption}
            					</Select>
            				</Col>
            			</Row>
            			<Row gutter={16}>
        					<Col span={14}>
        						<div id='brandChart' style={{width:'100%',height:350}}>
								</div>
            				</Col>
            				<Col span={10}>
            					<div id='ageChart' style={{width:'100%',height:350}}>
								</div>
            				</Col>
            			</Row>
            		</div>
            	</div>
			</div>
		)
	}
	
}