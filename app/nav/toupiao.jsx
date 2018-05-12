import React,{Component} from 'react'
import { Form, Input, Button,Layout,message,Icon} from 'antd'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
const FormItem = Form.Item;
const { TextArea } = Input
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Toupiao extends Component{
    constructor(props){
        super(props)
        this.state={
            loginData:null,
            title:'',
            content:'',
            count:0,
        }
    }
    componentDidMount(){

        webApi.get(urls.getLoginPeo()).then((result)=>{
            this.setState({loginData:result[0]})
        })
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

    getXiangmu(){
        for(let i=0;i<this.state.count;i++){
            console.log(i)
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
                webApi.get(urls.addToupiao(values)).then((result)=>{
                    message.info('设置成功')
                })

            }
        });
    }
    addCount(){
        this.setState({
            count:this.state.count+1
        })
        setTimeout(()=>this.getXiangmu(),100)
    }

    render(){
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const add=(
            <a onClick={this.addCount.bind(this)} title='添加选项'><Icon type="plus-circle-o" /></a>
        )
        return(
            <div>
                <Form id='form1' layout="horizontal" onSubmit={this.handleSubmit}>
                    <FormItem
                        label='投票名字'>
                        {getFieldDecorator('title', {
                            initialValue:this.state.title,
                            rules: [{required:true,message:'请输入标题!'}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        extra='投票项目以中文分号隔开'
                        label='投票项目'>
                        {getFieldDecorator('xiangmu',{
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

export default Form.create()(Toupiao)

