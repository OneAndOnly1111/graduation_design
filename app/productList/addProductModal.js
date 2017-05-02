import React from "react";
import { Modal, Button, message} from 'antd';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Upload, Icon,Input,DatePicker 
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export default class ProductAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: this.props.visible 
    }
  }

  addProduct(){
    var brand = this.refs.brand.refs.input.value;
    var model = this.refs.series.refs.input.value;
    var rom = this.refs.rom.refs.input.value;
    var ram = this.refs.ram.refs.input.value;
    var cpu = this.refs.cpu.refs.input.value;
    var price  = this.state.price;
    var shelfTime = this.state.shelfTime;
    console.log(brand,model,rom,ram,cpu,price,shelfTime);
    $.ajax({
      url:"http://localhost:7070/product/add",
      type:'post',
      contentType:"application/json",
      data:JSON.stringify({
        brand:brand,
        model:model,
        rom:rom,
        ram:ram,
        cpu:cpu,
        price:price,
        shelfTime:shelfTime
      }),
      success:(res)=>{
        res = JSON.parse(res);
        if(res.meta.message=='ok'){
          message.success('添加成功！',2);
          $('#productAddModal').modal('hide');
          window.location.reload();
        }else{
          message.error('添加失败！',2)
        }
      },
      error:()=>{
        message.error('添加失败！',2)
        $('#productAddModal').modal('hide');
      }
    })
  }


  handlePriceChange(val){
      console.log(val);
      this.setState({
        price:val
      })
  }

  handleTimeChange(field,val){
    console.log(field,val);
    this.setState({
      shelfTime:val
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <div className="modal fade" id='productAddModal' tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">新增商品</h4>
            </div>
            <div className="modal-body">
              <Form>
                <FormItem {...formItemLayout} label="品牌"><Input ref='brand'/></FormItem>
                <FormItem {...formItemLayout} label="型号"><Input ref='series'/></FormItem>
                <FormItem {...formItemLayout} label="ROM"><Input ref='rom'/></FormItem>
                <FormItem {...formItemLayout} label="RAM"><Input ref='ram'/></FormItem>
                <FormItem {...formItemLayout} label="CPU型号"><Input ref='cpu'/></FormItem>
                <FormItem {...formItemLayout} label="价格">
                  <InputNumber defaultValue={2000} onChange={this.handlePriceChange.bind(this)}
                      formatter={value => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="上架时间"><DatePicker onChange={this.handleTimeChange.bind(this)}/></FormItem>
              </Form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" className="btn btn-primary" onClick={()=>{this.addProduct()}}>保存</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

