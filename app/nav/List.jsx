import React,{Component} from 'react'
import {Layout,Input,Icon,Col,Row,Popconfirm,message,Modal,Table,Button,Confirm} from 'antd'
import {Link} from 'react-router-dom';
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
import './index.css'

export default class Shouye extends Component{
    constructor(props){
        super(props)
        this.state={
            loginData:null,
            dataSource:null,
            //a:this.props.okid
        }
        this.colums=[{title:'编号',dataIndex:'id',key:'id'},
            {title:'文章',dataIndex:'title',key:'title'},
            {title:'创建时间',dataIndex:'date',key:'date'},
            {title:'操作',dataIndex:'caozuo',key:'caozuo',width:'300',render:(text,record)=>(
                <div key={record.id}>
                    <Link to={`/addArticle?id=${record.id}&show=true`}> <Button type='primary'>查看</Button> </Link>
                    <Link to={`/addArticle?id=${record.id}`}> <Button type='primary'>编辑</Button> </Link>
                   <Popconfirm title='确定删除吗？' onConfirm={this.cancelEdi.bind(this,(record.id))}> <Button type='primary'>删除</Button></Popconfirm>
                </div>
            )}
        ]
    }

    componentWillMount(){

    }

    componentDidMount(){
        this.getLogin()
      // debugger;
        setTimeout(()=>
            {
                if(this.state.loginData&&this.state.loginData.id!=undefined){
                    this.getData()
                }
            }
            ,100)

    }

    getData(){
        webApi.get(urls.getMyArticle(this.state.loginData.id)).then((result)=>{
            this.setState({
                dataSource:result
            })
        })
    }

    cancelEdi(id,e){
        webApi.get(urls.cancelEdi(id)).then((result)=>{
            console.log(result)
            this.getData()
        })
    }

    getLogin(){
        webApi.get(urls.getLoginPeo()).then((result)=>{
            if(result[0]){
                this.setState({loginData:result[0],
                })
            }

        })
    }

    render(){
        return (
            <div>
                <Row>
                    <Col><h1>文章列表</h1></Col>
                    <Col>
                        <div style={{float:'right'}}>
                            <Link to={'/addArticle'}> <Button type="primary">添加文章</Button></Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Table columns={this.colums} dataSource={this.state.dataSource}></Table>
                </Row>
            </div>
        )
    }
}