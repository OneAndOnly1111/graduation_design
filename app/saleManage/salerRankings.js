import React from "react"
import $ from "jquery"
import moment from 'moment'
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import {Table, Input, Button, Icon} from 'antd';

export default class StaffRanking extends React.Component{


	getSaleData(){
		$.ajax({
			url:"../../mock/sale_ranking.json",
			type:"get",
			success:(res)=>{
				this.handleData(res.data)
			}
		})
	}

	handleData(data){
		data.map((item)=>{
 			this.table.row.add({
 				"姓名":"<td>"+item.name+"</td>",
 				"所属店铺":"<td>"+item.region+"</td>",
 				"销售总金额":"<td>"+item.summaryPrice+"</td>",
 				"销售台数":"<td>"+item.saleNumber+"</td>",
 				"排行":"<td>"+item.ranking+"</td>"
 			}).draw(false);
 		});
	}

	componentDidMount() {
		this.getSaleData();
 		this.table = $('#productList').DataTable({
 			"paging": true,
             "searching": true,
             "autoWidth": true,
             "lengthChange": true,
             "ordering": true,
             "pageLength": 8,
             "lengthMenu": [8, 10, 20,30],
 			columns: [{
 				data:'姓名'
 			},{
 				data:"所属店铺"
 			},{
 				data:"销售总金额"
 			},{
 				data:"销售台数"
 			},{
 				data:"排行"
 			}]
 		});	
	}

	render(){
		return(
			<div>
				<Header/>
		    	<Sidebar/>
		    	<div className="main-content">
					<div className="my-container">
		 				<div className="row">
		 					<div className="col-xs-12">
		 						<div className="box">
		 							<div className="box-header">
		 								<h4 className="box-title">当月员工销售排行</h4>
		 							</div>
		 							<div className="box-body">
		 								<table id="productList" className="table table-striped table-bordered table-hover" cellSpacing="0">
		 									<thead>
												<tr>
													<th>姓名</th>
													<th>所属店铺</th>
													<th>销售总金额</th>
													<th>销售台数</th>
													<th>排行</th>
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
				</div>
			</div>
		)
	}
}