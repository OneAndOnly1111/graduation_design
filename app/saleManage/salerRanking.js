import React from "react"
import $ from "jquery"
import moment from 'moment'
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import {Table, Input, Button, Icon, Badge, Menu, Dropdown, } from 'antd';


const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);


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
  		url:'../../mock/sale_ranking.json',
  		type:'get',
  		success:(res)=>{
			this.handleData(res.data);
  		}
  	});
  }

  handleData = (res) => {
  	var arr = [];
  	res.map((obj,index)=>{
  		arr.push({
  			key:index,
		  	name: obj.name,
		  	region: obj.region,
		  	saleNumber: obj.saleNumber,
		  	summaryPrice:'￥ '+obj.summaryPrice,
		  	ranking:index+1
  		});
  	})
  	console.log('arr',arr);
	this.setState({
		data:arr
	})
	this.listData = arr;
  }


  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.listData.map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }



expandedRowRender = () => {
    const columns = [
      { title: '品牌', dataIndex: 'brand', key: 'brand' },
      { title: '售出台数', dataIndex: 'saleNumber', key: 'saleNumber' },
      { title: '总价格', dataIndex: 'summaryPrice', key: 'summaryPrice' },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        brand: '小米',
        saleNumber: 2,
        summaryPrice: 10000,
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };




  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }, () => this.searchInput.focus()),
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
	    				dataSource={this.state.data}
	    			    title={() => '本月员工销售排行'} />
	    		</div>
	    	</div>
		</div>
    )
  }
}
