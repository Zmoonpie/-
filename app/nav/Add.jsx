import React,{Component} from 'react'
import { Form, Input, Button,Layout,message} from 'antd'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
const FormItem = Form.Item;
const { TextArea } = Input
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Add extends Component{
    constructor(props){
        super(props)
        this.state={
            loginData:null,
            title:'',
            content:''
        }
    }
    componentDidMount(){
        webApi.get(urls.getLoginPeo()).then((result)=>{
            this.setState({loginData:result[0]})
        })
        // console.log(this.props.location.search.split('=')[1])
        if(this.props.location.search.split('=')[1]!=undefined){
            const ediId=this.props.location.search.split('=')[1]
            webApi.get(urls.getEditArt(ediId)).then((result)=>{
                // console.log(result)
                this.setState({
                    title:result[0].title,
                    content:result[0].content
                })
            })
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.state.loginData&&this.state.loginData.id!=undefined){
                    values.id=this.state.loginData.id
                }else {
                    message.error("请登录")
                    return false
                }
                    webApi.get(urls.reply(values)).then((result)=>{
                        message.info("配置成功")
                    })
                }
        });
    }

    render(){
        const { getFieldDecorator, getFieldsError } = this.props.form;
        return(
            <div>
                <Form id='form1' layout="horizontal" onSubmit={this.handleSubmit}>
                    <FormItem
                        label='用户输入'>
                        {getFieldDecorator('yonghu', {
                            initialValue:this.state.title,
                            rules: [{required:true,message:'请输入标题!'}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label='系统自动回复'>
                        {getFieldDecorator('xitong',{
                            initialValue:this.state.content,
                            rules:[{required:true,message:'请输入内容'}]
                        })(
                            <TextArea row={4} />
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
            </div>

        )
    }
}

export default Form.create()(Add)

