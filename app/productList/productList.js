import React from "react"
import $ from "jquery"
class ProductList extends React.Component{

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	getProductList(){
		$.ajax({
			url:"../../mock/productList.json",
			type:'get',
			contentType:"application/json",
			success:(res)=>{
				this.handleData(res.data);
			}
		})
	}

	handleData(data){
		data.map((item)=>{
			this.table.row.add({
				"商品名称":"<td>"+item.name+"</td>",
				"品牌":"<td>"+item.brand+"</td>",
				"CPU型号":"<td>"+item.cpu+"</td>",
				"RAM / ROM":"<td>"+item.ram+' / '+item.rom+"</td>",
				"上架时间":"<td>"+item.shelfTime+"</td>",
				"价格":"<td>"+item.price+"</td>",
				"操作":"<td class='last'><button style='margin-right:10px' class='btn btn-default btn-sm'>修改</button><button class='btn btn-default btn-sm'>下架</button></td>"
			}).draw(false);
		});
	}

	componentDidMount() {
		this.getProductList();
		this.table = $('#productList').DataTable({
			"paging": true,
            "searching": true,
            "autoWidth": true,
            "lengthChange": true,
            "ordering": true,
            "pageLength": 8,
            "lengthMenu": [8, 10, 20,30],
			columns: [{
				data:'商品名称'
			},{
				data:"品牌"
			},{
				data:"CPU型号"
			},{
				data:"RAM / ROM"
			},{
				data:"上架时间"
			},{
				data:"价格"
			},{
				data:"操作"
			}]
		});	
	}

	render(){
		return(
			<div className="my-container">
				<div className="row">
					<div className="col-xs-12">
						<div className="box">
							<div className="box-header">
								<h4 className="box-title">商品列表</h4>
								<button className="btn btn-primary btn-add">新 增</button>
							</div>
							<div className="box-body">
								<table id="productList" className="table table-striped table-bordered table-hover" cellSpacing="0">
									<thead>
										<tr>
											<th>商品名称</th>
											<th>品牌</th>
											<th>CPU型号</th>
											<th>RAM / ROM</th>
											<th>上架时间</th>
											<th>价格</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ProductList