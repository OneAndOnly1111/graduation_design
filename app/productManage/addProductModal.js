import React from "react";
import { Modal, Button, message} from 'antd';
import moment from 'moment';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Upload, Icon,Input,DatePicker 
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ProductAddModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: this.props.visible 
    }
  }

  addProduct = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
           $.ajax({
                url:"http://localhost:7070/product/add",
                type:'post',
                contentType:"application/json",
                data:JSON.stringify({
                  brand:values.brand,
                  model:values.series,
                  rom:values.rom,
                  ram:values.ram,
                  cpu:values.cpu,
                  price:values.price,
                  shelfTime:moment(values.shelfTime).format('YYYY-MM-DD')
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
                }
             });
          }
      });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    const { getFieldDecorator } = this.props.form;
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
                <FormItem {...formItemLayout} label="品牌">
                  {getFieldDecorator('brand', {
                    rules: [{ required: true, message: '请输入品牌名称!' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="型号">
                  {getFieldDecorator('series', {
                    rules: [{ required: true, message: '请输入型号!' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="RAM">
                  {getFieldDecorator('ram', {
                    rules: [{ required: true, message: '请输入RAM!' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="ROM">
                  {getFieldDecorator('rom', {
                    rules: [{ required: true, message: '请输入ROM!' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="CPU型号">
                  {getFieldDecorator('cpu', {
                    rules: [{ required: true, message: '请输入cpu类型!' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="价格">
                  {getFieldDecorator('price', {
                    rules: [{ required: true, message: '请输入价格!' }],
                  })(
                    <InputNumber/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="上架时间">
                  {getFieldDecorator('shelfTime', {
                    rules: [{ required: true, message: '请选择上架时间!' }],
                  })(
                    <DatePicker/>
                  )}
                </FormItem>
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

const ProductAddModal = Form.create()(ProductAddModalForm);
export default ProductAddModal