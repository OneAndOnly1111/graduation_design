import React from "react"
import $ from "jquery"
import moment from 'moment'
import echarts from 'echarts'
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import {Form, Select, InputNumber,DatePicker,Cascader, 
Switch, Slider,Radio,Button, Upload, Icon, Input,message,Row,Col,Card,Badge} from 'antd';


export default class SaleRanking extends React.Component{

	constructor(props) {
		super(props);
		this.state={
			timeArr:[]
		}
	}


	getRankingData(){
		$.ajax({
			"url":"../../mock/brandRanking.json",
			"type":"get",
			success:(res)=>{
				console.log("brandData",res.data);
				this.handleData(res.data);
			}
		})
	}


	handleData = (data)=>{
		var time=[],iphone=[],sanxing=[],huawei=[],xiaomi=[],vivo=[],oppo=[],total=[];
		for(var timestrap in data){
			time.push(timestrap);
		}
		var tt = time.sort();
		for(var i=0; i<tt.length; i++){
			iphone.push(data[time[i]].iphone);
			sanxing.push(data[time[i]].sanxing);
			huawei.push(data[time[i]].huawei),
			xiaomi.push(data[time[i]].xiaomi);
			vivo.push(data[time[i]].vivo);
			oppo.push(data[time[i]].oppo);
			total.push(data[time[i]].total);
		}
		console.log(iphone);
		this.setState({
			timeArr:time,
			iphoneArr:iphone,
			sanxingArr:sanxing,
			huaweiArr:huawei,
			xiaomiArr:xiaomi,
			vivoArr:vivo,
			oppoArr:oppo,
			totalArr:total
		});

		console.log("xiaomii",this.state.xiaomiArr)

	}

	componentDidUpdate(prevProps, prevState) {
		this.drawChart();
	}

	drawChart(){
		var brandChart = echarts.init(document.getElementById('brandChart'));
		brandChart.setOption({
		    title : {
		        text: '销售统计',
		        x:'center',
		        textStyle:{
		        	fontSize:16
		        }
		    },
		    backgroundColor: "#fff",
		    tooltip : {
		        trigger: 'axis',
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
		    legend: {
		        data:['iphone','三星','华为','小米','vivo','oppo'],
		        top:25
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
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
		        data: this.state.timeArr
		    },
		    series: [{
		        name: 'iphone',
		        type: 'bar',
		        stack: '总量',
		        data:this.state.iphoneArr

		    },{
		        name: '三星',
		        type: 'bar',
		        stack: '总量',
		        data:this.state.sanxingArr

		    },{
		        name: '小米',
		        type: 'bar',
		        stack: '总量',
		        data:this.state.xiaomiArr

		    },{
		        name: '华为',
		        type: 'bar',
		        stack: '总量',
		        data:this.state.huaweiArr

		    },{
		        name: 'vivo',
		        type: 'bar',
		        stack: '总量',
		        data:this.state.vivoArr

		    },{
		        name: 'oppo',
		        type: 'bar',
		        stack: '总量',
		        barMaxWidth:20,
		        data:this.state.oppoArr

		    },{
	            name:'总量',
	            type:'line',
	            symbolSize:10,
            	symbol:'circle',
            	"itemStyle": {
	                "normal": {
	                    "color": "rgba(252,230,48,1)",
	                    "barBorderRadius": 0,
	                    "label": {
	                        "show": true,
	                        "position": "top",
	                        formatter: function(p) {
	                            return p.value > 0 ? (p.value) : '';
	                        }
	                    }
	                }
	            },
	            data:this.state.totalArr
        	}]
		});

		var ageChart = echarts.init(document.getElementById('ageChart'));
		ageChart.setOption({
		     title : {
		        text: '占比分析',
		        x:'center',
		        textStyle:{
		        	fontSize:16
		        }
		    },
		    backgroundColor: "#fff",
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['iphone','三星','小米','华为','vivo','oppo']
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
		        data: [{
		        	name:"iphone",
		        	value:300
		        },{
		        	name:"三星",
		        	value:120
		        },{
		        	name:"小米",
		        	value:190
		        },{
		        	name:"华为",
		        	value:100
		        },{
		        	name:"vivo",
		        	value:230
		        },{
		        	name:"oppo",
		        	value:90
		        },]
		    }]
		});
	}

	componentDidMount() {
		this.getRankingData();
	}


	render(){
		return(
			<div>
				<Header/>
            	<Sidebar/>
            	<div className="main-content">
            		<div className="my-container">
            			<Row gutter={16}>
            				<Col span={8}>
            					<Card style={{ width: '100%',height:100}} bodyStyle={{ padding: 0 }}>
            						<span style={{display:'inline-block',width:'30%',lineHeight:'100px',textAlign:'center',backgroundColor:'#24C0F9',color:'#fff',fontSize:'28px'}}>
            							<Icon type="bank" />
            						</span>
            						<span style={{display:'inline-block',width:'70%',textAlign:'center'}}>
            							<span style={{fontSize:14}}>本月销售金额</span>
            							<div style={{fontSize:24}}>￥ 129034.90</div>
            						</span>
								</Card>
            				</Col>
            				<Col span={16}>
            					<Card style={{ width: '100%',height:100}} bodyStyle={{ padding: 0 }}>
								    <span style={{display:'inline-block',width:140,padding:'13px'}}>小米：<span style={{fontSize:14,marginLeft:20}}>10</span>台</span>
								    <span style={{display:'inline-block',width:140,padding:'12px'}}>iphone：<span style={{fontSize:14,marginLeft:20}}>10</span>台</span>
								    <span style={{display:'inline-block',width:140,padding:'12px'}}>华为：<span style={{fontSize:14,marginLeft:20}}>10</span>台</span>
								    <span style={{display:'inline-block',width:140,padding:'12px'}}>三星：<span style={{fontSize:14,marginLeft:20}}>10</span>台</span>
								    <span style={{display:'inline-block',width:140,padding:'13px'}}>乐视：<span style={{fontSize:14,marginLeft:20}}>10</span>台</span>
								    <span style={{display:'inline-block',width:140,padding:'12px'}}>魅族：<span style={{fontSize:14,marginLeft:20}}>10</span>台</span>
								    <span style={{display:'inline-block',width:140,padding:'12px'}}>OPPO：<span style={{fontSize:14,marginLeft:20}}>10</span>台</span>
								    <span style={{display:'inline-block',width:140,padding:'12px'}}>VIVO：<span style={{fontSize:14,marginLeft:20}}>10</span>台</span>
								</Card>
            				</Col>
            			</Row>
            			<Row style={{margin:'20px 0px'}}>
            				<Col span={24}>
            					<DatePicker/>
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