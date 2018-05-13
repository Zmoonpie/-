import React,{Component} from 'react'
import { Card,Col,Row,Input, Button,message,Popconfirm } from 'antd'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'


export default class MyInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            loginData:null,
            userInfo:null
        }
    }
    componentWillMount(){
        webApi.get(urls.getLoginPeo()).then((result)=>{
            this.setState({loginData:result[0]})
            if(result==undefined||result.length<1){
                alert('请先登录！')
                window.location.href='http://localhost:8000/'
            }else if(result[0].username!='admin'){
                alert('当前登录不是超级管理员，没有查看权限！')
                window.location.href='http://localhost:8000/'
            }
        })
    }
    componentDidMount(){
        webApi.get(urls.getMyinfo()).then((result)=>{
            let data=[]
            if(result.flag){
                result.userInfo.forEach((item)=>{
                    if(item.username!='admin'){
                        data.push(item)
                    }
                })
                this.setState({userInfo:data})
                setTimeout(()=>console.log(this.state.userInfo),100)
            }
        })
    }

    onConfirm(id){
       webApi.get(urls.setOperationUser(id)).then((result)=>{
            if(result){
                setTimeout(()=>location.reload(),100)
            }
       })
    }

    getCard(){
        const {userInfo}=this.state
        let data=[]
        userInfo.forEach((item)=>{
            data.push(
                <Col span={8}>
                    <Popconfirm
                    title='确认要操作该账号吗？'
                    onConfirm={this.onConfirm.bind(this,item.id)}
                    >
                        <Card style={{marginBottom:'10px'}} title={item.username} bordered={false}>Card content</Card>
                    </Popconfirm>

                </Col>
            )
        })
        return data
    }

    render(){
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    {this.state.userInfo&&this.getCard()}
                </Row>
            </div>
        )
    }
}