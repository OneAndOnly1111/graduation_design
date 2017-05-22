import React from "react"
import $ from "jquery"
import moment from 'moment'
import Header from '../common/header'
import Sidebar from '../common/sidebar'
import {Button, Table, Badge, Dropdown,Menu , Icon, message, Modal, Form, Input } from 'antd'
const FormItem = Form.Item;
const job = window.sessionStorage.getItem("job");

const expandedRowRender = (obj) => {
	const listData = [];
	if(obj.data){
		const job = {
			"saleman":"销售员",
			"manager":"销售经理"
		}
		obj.data.map((ele,i)=>{
			listData.push({
				key:i,
				joinTime:moment(ele.jointime).format('YYYY-MM-DD'),
				nickName:ele.nickname,
				job:job[ele.job],
				email:ele.email
			});
		});
	}
	
    const columns = [
      { title: '姓名', dataIndex: 'nickName', key: 'nickName' },
      { title: '加入时间', dataIndex: 'joinTime', key: 'joinTime' },
      { title: '职位', dataIndex: 'job', key: 'job'},
      { title: '邮箱', dataIndex: 'email', key: 'email'},
    ];

    return (
      <Table
        columns={columns}
        dataSource={listData}
        pagination={false}
      />
    );
};

class StoreManagerForm extends React.Component{

	state={
		dataSource:[],
		visible: false
	}

	getAllStore = ()=>{
		$.ajax({
			url:'http://127.0.0.1:7070/store/get_all_store_info',
			type:'GET',
			contentType:'application/json',
			success:(res)=>{
				console.log("res",res.data);
				res = JSON.parse(res);
				this.handleData(res.data);
			}
		})
	}
	componentDidMount() {
		this.getAllStore();
	}

	handleData = (data)=>{
		var arr = [];
		data.map((ele,i)=>{
			arr.push({
				key:i,
				id:ele.id,
				name:ele.name,
				data:ele.data
			});
		})
		this.setState({
			dataSource:arr
		})
	}
	
	removeStore = (e)=>{
		var id = $(e.target).parents("tr").find("td").eq(1).text();
		$.ajax({
			url:'http://127.0.0.1:7070/store/delete/'+id,
			contentType:'application/json',
			success:(res)=>{
				var res = JSON.parse(res);
				if(res.meta.message=='ok'){
					message.success("移除成功！");
					this.getAllStore();
				}else{
					message.error("移除失败！")
				}
			}
		})
	}

	onRowClick = (record,index)=>{
		console.log(record,index);
		this.setState({
			removeId:record.id
		});
	}

	onCellChange = (index, key) => {
		const dataSource = [...this.state.dataSource];
	    return (value) => {
	      // const dataSource = [...this.state.dataSource];
	      // dataSource[index][key] = value;
	      // this.setState({ dataSource });
	      $.ajax({
	      	url:'http://127.0.0.1:7070/store/edit',
	      	type:"POST",
	      	contentType:'application/json',
	      	data:JSON.stringify({
	      		id:this.state.removeId,
	      		name:value
	      	}),
	      	success:(res)=>{
	      		console.log(res);
	      		res = JSON.parse(res);
	      		if(res.meta.message=='ok'){
	      			message.success("修改成功！");
	      			this.getAllStore();
	      		}else{
	      			message.error("修改失败！");

	      		}
	      	}
	      })
	    };
	}

	render(){
		const columns = [
			{ title: '门店编号', dataIndex: 'id', key: 'id' },
			{ title: '门店信息', dataIndex: 'name', key: 'name',width:'50%',
				render: (text, record, index) => (
		        <EditableCell
		          value={text}
		          onChange={this.onCellChange(index, 'name')}
		        />
		      )
			},
			{ title: '操作', key: 'operation', render: () => 
				(
					job=='manager'?
					  <a href="#" onClick={this.removeStore}>移除</a>:<a href="#" disabled>移除</a>
				)
			}
		];
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };
		return (
			<div>
				<Header/>
		    	<Sidebar/>
		    	<div className="main-content">
		    		<div className="my-container">
		    			<div className="col-xs-12">
							<div className="box">
								<div className="box-header">
									<h4 className="box-title">门店列表</h4>
									<span>
										{
											job=='manager'?
											<Button type="primary" onClick={this.showModal}>新增</Button>
											:<Button type="primary" disabled>新增</Button>
										}
									</span>
									<Modal title="新增门店" visible={this.state.visible}
							          onOk={this.handleOk} onCancel={this.handleCancel}
							        >
							          	<FormItem label="门店名称" {...formItemLayout} >
								          {getFieldDecorator('name', {
								            rules: [{
								              required: true, message: '请先填写门店信息！',
								            }],
								          })(
								            <Input />
								          )}
								        </FormItem>
							        </Modal>
								</div>
								<div className="box-body">
									<Table columns={columns} 
										expandedRowRender={expandedRowRender}
      									dataSource={this.state.dataSource}
      									onRowClick={this.onRowClick}>
									</Table>
								</div>
							</div>
						</div>
		    		</div>
		    	</div>
			</div>
		)
	}

	showModal = () => {
	    this.setState({
	      visible: true,
	    });
  	}
  	handleOk = (e) => {
	    console.log(e);
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        $.ajax({
	        	url:'http://127.0.0.1:7070/store/add',
	        	type:'POST',
	        	contentType:'application/json',
	        	data:JSON.stringify({
	        		name:values.name
	        	}),
	        	success:(res)=>{
	        		res = JSON.parse(res);
	        		if(res.meta.message=='ok'){
	                    this.setState({
						    visible: false,
						});	
						this.getAllStore();
	                    // window.location.reload();
	                }else{
	                    message.error('添加失败！')
	                }
	        	}
	        })
	      }
	    });

	   
  	}
	handleCancel = (e) => {
	    this.setState({
	      visible: false,
	    });
	}
}

const StoreManager = Form.create()(StoreManagerForm);
export default StoreManager


class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}