import React ,{Component} from 'react'
import {Input,Button,message,Table,Modal} from 'antd'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
const { TextArea } = Input

export default class TsMessage extends Component{
    constructor(props){
        super(props)
        this.state={
            message:'',
            loginData:null,
            messageData:null,
            oneTsMessage:null,
            visible:false
        }

        this.colums=[
            {title:'id',dataIndex:'id',key:'id'},
            {title:'推送消息',dataIndex:'message',key:'message'},
            {title:'时间',dataIndex:'date',key:'date'},
            {title:'操作',dataIndex:'n1',key:'n1',render:(text,record)=>(
                <Button onClick={this.TsMessage.bind(this,record.id)}>推送</Button>
            )}
        ]
    }

    componentDidMount(){
        webApi.get(urls.getLoginPeo()).then((result)=>{
            this.setState({loginData:result[0]})
            webApi.get(urls.getTsMessage(result[0].id)).then((results)=>{
                this.setState({messageData:results})
            })
        })
    }

    TsMessage(id){
        webApi.get(urls.tsMessage(id)).then((result)=>{
            this.setState({
                oneTsMessage:result,
                visible:true
            })
        })
    }

    messageChange(e){
        this.setState({message:e.target.value})
    }

    submit(){
        let data={
            id:this.state.loginData.id,
            message:this.state.message
        }
        webApi.post(urls.addTsMessage(),data).then((result)=>{
            message.info('保存成功')
            webApi.get(urls.getTsMessage(this.state.loginData.id)).then((results)=>{
                this.setState({messageData:results})
            })
        })
    }
    render(){
        return (
            <div>
                <TextArea
                value={this.state.message}
                onChange={this.messageChange.bind(this)}
                ></TextArea>
                <Button onClick={this.submit.bind(this)}>保存</Button>
                <br/>
                <br/>
                {this.state.messageData&&<Table
                columns={this.colums}
                dataSource={this.state.messageData}
                ></Table>}

                {this.state.oneTsMessage&& <Modal
                title='推送消息'
                visible={this.state.visible}
                onOk={()=>this.setState({visible:false})}
                onCancel={()=>this.setState({visible:false})}
                >
                    {this.state.oneTsMessage[0].message}
                </Modal>}

            </div>
        )
    }
}