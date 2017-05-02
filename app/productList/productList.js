import React from "react"
import $ from "jquery"
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import ProductAddModal from './addProductModal'
import { Table, Icon ,Button,Popconfirm,message } from 'antd';

class ProductList extends React.Component{
	state = {
		tableData:[],
		selectedRowKeys: [],
	}
	getProductList(){
		$.ajax({
			url:"http://localhost:7070/product/getAll",
			type:'get',
			contentType:"application/json",
			success:(res)=>{
				res = JSON.parse(res);
				this.handleData(res.data);
			}
		})
	}

	handleData(data){
		var tableData = [];
		data.map((item)=>{
			tableData.push({
				id:item.id,
				key:item.id,
				model:item.model,
				brand:item.brand,
				cpu:item.cpu,
				rom:item.ram +'/'+item.rom,
				time:item.shelfTime,
				price:item.price
			})
		});
		console.log('tableData',tableData);
		this.setState({
			tableData:tableData
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
			url:'http://localhost:7070/product/delete',
			type:'post',
			contentType:'application/json',
			data:JSON.stringify(ids),
			success: (res)=>{
				res = JSON.parse(res);
				console.log(res);
				if(res.meta.message=='ok'){
					message.success('删除成功！',2);
					this.getProductList();
				}else{
					message.error('删除失败！',2);
				}
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
		},{
		  title: '商品名称',
		  dataIndex: 'model',
		  key: 'model',
		},{
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
		  sorter: (a, b) => a.price - b.price,
		}, {
		  title: '上架时间',
		  dataIndex: 'time',
		  key: 'time',
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
										<Button type="danger" style={{marginLeft:'10px'}} onClick={(e)=>{this.handleRemoveMult(e)}}>下架</Button>
									</div>
									<div className="box-body">
										<Table columns={columns} rowSelection={rowSelection} dataSource={this.state.tableData} />
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