import React,{Component} from 'react'
import { Form, Input, Button,Layout,message,Table} from 'antd'
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
            content:'',
            replyData:null
        }
        this.colums=[
            {title:'id',dataIndex:'id',key:'id'},
            {title:'用户输入',dataIndex:'yonghu',key:'yonghu'},
            {title:'自动回复',dataIndex:'xitong',key:'xitong'},
            {title:'回复统计',dataIndex:'count',key:'count'},
        ]
    }
    componentDidMount(){
        webApi.get(urls.getLoginPeo()).then((result)=>{
            this.setState({loginData:result[0]})
            this.getMyReply(result[0].id)
        })
        // console.log(this.props.location.search.split('=')[1])
        if(this.props.location.search.split('=')[1]!=undefined){
            debugger
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

    getMyReply(id){
        webApi.get(urls.getMyReply(id)).then((results)=>{
            this.setState({replyData:results})
        })
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
                        this.getMyReply(this.state.loginData.id)
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

                { this.state.replyData&&<Table
                    columns={this.colums}
                    dataSource={this.state.replyData}
                >
                </Table>}
            </div>

        )
    }
}

export default Form.create()(Add)

