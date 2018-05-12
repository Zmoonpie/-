import React,{Component} from 'react'
import { Form, Input, Button,Layout,message} from 'antd'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
const { Header, Content, Sider } = Layout
const FormItem = Form.Item;


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state={
            initialValues:{id:'',address:'',type:'',content:'',ip:'',duankou:'',gongneng:[]},
            username:''
        }
        this.hide=true
    }
    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                webApi.get(urls.getLogin(values)).then((result)=>{
                    if(result.flag){
                        if(this.props.username){
                            this.props.username(result.name)
                        }
                        this.setState({
                            username:result.name
                        })
                        message.info('登录成功')
                        setTimeout(()=>location.reload(),100) ;
                    }else{
                        message.error(result.errorMessage)
                    }
                })
            }
        });
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
                        <Input  placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem
                    label='密码'
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input type='password' placeholder="密码" />
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

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);

// function

class Login extends Component{

    username(data){
        if(this.props.username){
            this.props.username(data)
        }
    }

    render(){
        return(
            <Layout>
                    <WrappedHorizontalLoginForm username={this.username.bind(this)} />
            </Layout>
        )
    }
}

export default Login