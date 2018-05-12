import React,{Component} from 'react'
import { Form, Input, Button,Layout,message,Icon} from 'antd'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
const { Header, Content, Sider } = Layout
const FormItem = Form.Item;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            isRegister:false,

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.state.isRegister){
                    message.error('该用户名已经被注册，请重新输入用户名！')
                    return false
                }
                webApi.get(urls.setRegister(values)).then((result)=>{
                    message.info('注册成功')
                    if(this.props.regVisible){
                        this.props.regVisible(true)
                    }
                })
            }
        });
    }
    isRegister(e){
        webApi.get(urls.isRegister(e.target.value)).then((result)=>{
            if(result==0){
                this.setState({isRegister:false})
            }else {
                this.setState({isRegister:true})
            }
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        return (
            <Form id='form1' layout="horizontal" onSubmit={this.handleSubmit}>
                <FormItem
                    label='用户名：'
                >
                    {getFieldDecorator('username',{
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input  placeholder="用户名" onChange={this.isRegister.bind(this)}/>
                    )}
                    {this.state.isRegister&&<span style={{color:'red'}}>该用户名已经被注册！</span>}
                </FormItem>
                <FormItem
                    label='密码'
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input  placeholder="密码" />
                    )}
                </FormItem>

                <FormItem
                label='电话'>
                    {getFieldDecorator('tel',{
                        rules:[{required:true,message:'请输入电话'}]
                    })(
                        <Input placeholder='电话'/>
                    )}
                </FormItem>

                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        保存
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(Register)