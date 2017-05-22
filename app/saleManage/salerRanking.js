import React from "react"
import $ from "jquery"
import moment from 'moment'
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import {Table, Input, Button, Icon, Badge, Menu, Dropdown, } from 'antd';

export default class StaffRanking extends React.Component {
  state = {
    filterDropdownVisible: false,
    data:[],
    searchText: '',
    filtered: false,
  };

  componentDidMount() {
  	this.getSaleData();
  }

  getSaleData(){
  	$.ajax({
      url:'http://127.0.0.1:7070/sale/achievement',
  		type:'get',
      contentType:'application/json',
  		success:(res)=>{
        res = JSON.parse(res);
        console.log(res);
        var arr = [];
        for(var name in res.data){
          if(res.data[name].length){
            arr.push(name);
          }
        };
        console.log("arr",arr);
        var arrTotal =[];
        arr.map((ele,index)=>{
            console.log(res.data[ele].count);
            arrTotal.push({
                key:index,
                name:ele,
                region:res.data[ele][0].region,
                saleNumber:this.getSummary(res.data[ele],"count"),
                summaryPrice:'￥'+this.getSummary(res.data[ele],"price"),
                // ranking:index+1
            });
        });
        console.log("arrTotal",arrTotal);
        arrTotal.sort(function(a,b){
          return b.saleNumber-a.saleNumber
        });
        arrTotal.map((ele,index)=>{
          ele.ranking = index+1
        })
        console.log("sort",arrTotal);
        this.setState({
          arrTotal:arrTotal,
          data:res.data
        });
  		}
  	});
  }

  sort = (data)=>{
    
  }

  getSummary = (data,type)=>{
    var total = 0;
    data.map((ele)=>{
      if(type=='price'){
        total += parseInt(ele[type])*ele.count;
      }else{
        total += parseInt(ele[type]);
      }
    });
    return total;
  }

  expandedRowRender = (obj) => {
    var name = obj.name;
    console.log("name",obj,name);
    const arrList = [];
    this.state.data[name].map((item,i)=>{
      arrList.push({
        key:i,
        brand:(item.productInfo).split("/")[0],
        saleNumber:item.count,
        summaryPrice:'￥'+(item.price)*item.count
      });
    })
    const columns = [
      { title: '品牌', dataIndex: 'brand', key: 'brand' },
      { title: '售出台数', dataIndex: 'saleNumber', key: 'saleNumber' },
      { title: '总价格', dataIndex: 'summaryPrice', key: 'summaryPrice' },
    ];
    return (
      <Table
        columns={columns}
        dataSource={arrList}
        pagination={false}
      />
    );
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '所属门店',
      dataIndex: 'region',
      key: 'region',
    }, {
      title: '销售总金额',
      dataIndex: 'summaryPrice',
      key: 'summaryPrice',
    }, {
      title: '销售台数',
      dataIndex: 'saleNumber',
      key: 'saleNumber',
      sorter: (a, b) => a.saleNumber - b.saleNumber,
    }, {
      title: '排行',
      dataIndex: 'ranking',
      key: 'ranking',
      sorter: (a, b) => a.ranking - b.ranking,
    }];
    return (
    	<div>
			  <Header/>
	    	<Sidebar/>
	    	<div className="main-content">
	    		<div className="my-container">
	    			<Table
	    				bordered
	    				columns={columns} 
	    				expandedRowRender={this.expandedRowRender}
	    				dataSource={this.state.arrTotal}
	    			    title={() => '本月员工销售排行'} />
	    		</div>
	    	</div>
		</div>
    )
  }
}
