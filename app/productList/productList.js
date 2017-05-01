import React from "react"
import $ from "jquery"
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import ProductAddModal from './addProductModal'
import { Table, Icon ,Button,Popconfirm,message } from 'antd';
const tableData = [];


class ProductList extends React.Component{

	state = {
		listData:[],
		selectedRowKeys: [],
	}
	getProductList(){
		$.ajax({
			url:"../../mock/productList.json",
			type:'get',
			contentType:"application/json",
			success:(res)=>{
				this.handleData(res.data);
				this.setState({
					listData:res.data
				});
			}
		})
	}

	handleData(data){
		data.map((item)=>{
			tableData.push({
				id:item.id,
				key:item.id,
				name:item.name,
				brand:item.brand,
				cpu:item.cpu,
				rom:item.ram +'/'+item.rom,
				time:item.shelfTime,
				price:item.price
			})
		})
	}

	componentDidMount() {
		this.getProductList();
	}

	onSelectChange = (selectedRowKeys) => {
	    console.log('selectedRowKeys changed: ', selectedRowKeys);
	    this.setState({ selectedRowKeys });
	}

	removeProduct(ids){
		$.ajax({
			url:'/removeProduct.json',
			type:'post',
			contentType:'application/json',
			data:JSON.stringify(ids),
			success: (res)=>{
				console.log(res);
				message.success('删除成功！',2)
				this.getProductList();
			},
			error:(err)=>{
				message.error('删除失败！',2)
			}
		})
	}

	handleReomoveSingle(e){
		var single  = $(e.target).parents('tr').find('td').eq(1).text();
		console.log("single",single);
		this.removeProduct([single]);
	}

	handleRemoveMult(){
		console.log("more",this.state.selectedRowKeys)
		var ids = this.state.selectedRowKeys
		this.removeProduct(ids);
	}
	
	render(){
		const columns = [{
		  title: '商品编号',
		  dataIndex: 'id',
		  key: 'id',
		  render: text => <a href="#">{text}</a>,
		},{
		  title: '商品名称',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '品牌',
		  dataIndex: 'brand',
		  key: 'brand',
		   filters: [{
		    text: '小米',
		    value: '小米',
		  },{
		    text: 'vivo',
		    value: 'vivo',
		  },{
		    text: 'HUAWEI',
		    value: 'HUAWEI',
		  }],
		  onFilter: (value, record) => record.brand.indexOf(value) === 0,
		}, {
		  title: 'CPU型号',
		  dataIndex: 'cpu',
		  key: 'cpu',
		}, {
		  title: 'ROM/RAM',
		  dataIndex: 'rom',
		  key: 'rom',
		}, {
		  title: '价格',
		  dataIndex: 'price',
		  key: 'price',
		  filters: [{
		    text: '1599',
		    value: '1599',
		  }, {
		    text: '2499',
		    value: '2499',
		  }],
		  sorter: (a, b) => a.price - b.price,
		}, {
		  title: '上架时间',
		  dataIndex: 'time',
		  key: 'time',
		  sorter: (a, b) => a.time - b.time,
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      <a href="#" onClick={(e)=>{this.handleReomoveSingle(e)}}>下架</a>
		      <span className="ant-divider" />
		      <a href="#">编辑</a>
		    </span>
		  ),
		}];
		const { selectedRowKeys } = this.state;
		const rowSelection = {
	      selectedRowKeys,
	      onChange: this.onSelectChange,
	    };
		return(
			<div>
				<Header/>
            	<Sidebar/>
            	<ProductAddModal/>
            	<div className="main-content">
					<div className="my-container">
						<div className="row">
							<div className="col-xs-12">
								<div className="box">
									<div className="box-header">
										<h4 className="box-title">商品列表</h4>
										<Button type="primary" data-toggle="modal" data-target="#productAddModal">新增</Button>
										<Button type="danger" style={{marginLeft:'10px'}} onClick={(e)=>{this.handleRemoveMult(e)}}>删除</Button>
									</div>
									<div className="box-body">
										<Table columns={columns} rowSelection={rowSelection} dataSource={tableData} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}
export default ProductList