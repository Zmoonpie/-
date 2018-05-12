import React,{Component} from 'react'
import { Form, Input, Button,Layout,message,Icon,Card, Row,Col,Radio,Modal} from 'antd'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
const RadioGroup = Radio.Group;
export default class ShowToupiao extends Component{
    constructor(props){
        super(props)
        this.state={
            loginData:null,
            data:[],
            dataCount:null,
            visible:false,
            modalData:null
        }
    }

    componentWillMount(){

        webApi.get(urls.getLoginPeo()).then((result)=>{
            this.setState({loginData:result[0]})
            webApi.get(urls.showToupiao(result[0].id)).then((result)=>{
                let data=[]
                result.forEach((item)=>{
                    const newData={id:'',parentId:'',xiangmus:null,title:''}
                    newData.id=item.id
                    newData.title=item.title
                    newData.parentId=item.parentId
                    newData.xiangmus=item.xiangmus.split('；')
                    if(newData!=undefined)
                        data.push(newData)
                })
                this.setState({
                    data:data
                })

            })
        })
    }
    componentDidMount(){
        setTimeout(()=>console.log(this.state.data),1000)
    }

    onChange(item,e){
       this.setState({
           dataCount:{id:item,value:e.target.value}
       })
    }

    onClick(item){
        if(this.state.dataCount&&this.state.dataCount.id==item){
            webApi.get(urls.addCount(this.state.dataCount)).then((result)=>{
                message.info('投票成功')
            })
        }
    }

    onClick2(id){
        webApi.get(urls.showCount(id)).then((result)=>{
            let a=[]
            let b={};
            result.forEach((item)=>{
                a.push(item.xuanxiang)
            })
            let resultarr = [...new Set(a)];
           // console.log(resultarr); //[1,2,3]
            for(let i=0;i<resultarr.length;i++){
                let s=0
                result.forEach((item)=>{
                    if(item.xuanxiang==resultarr[i])
                        s=s+1
                })
                b[i]=resultarr[i]+':'+s+'票'

            }
            this.setState({modalData:b,visible:true})
        })
    }

    onClick3(id){
        webApi.get(urls.cancelToupiao(id)).then((result)=>{
            message.info('删除成功')
            webApi.get(urls.getLoginPeo()).then((result)=>{
                this.setState({loginData:result[0]})
                webApi.get(urls.showToupiao(result[0].id)).then((result)=>{
                    let data=[]
                    result.forEach((item)=>{
                        const newData={id:'',parentId:'',xiangmus:null,title:''}
                        newData.id=item.id
                        newData.title=item.title
                        newData.parentId=item.parentId
                        newData.xiangmus=item.xiangmus.split('；')
                        if(newData!=undefined)
                            data.push(newData)
                    })
                    this.setState({
                        data:data
                    })

                })
            })
        })
    }

    handleOk(){
        this.setState({visible:false})
    }
    handleCancel(){
        this.setState({visible:false})
    }

    getModalData(){
        let a=[]
       // console.log(this.state.modalData)
        for(let i in this.state.modalData){
            a.push(
                <div>
                    <span>{this.state.modalData[i]}</span>
                    <br/>
                </div>

            )
        }

        return a
    }

    getToupiao(){
        let a=[]
        this.state.data.forEach((item)=>{
            a.push(
                <Col span={8} key={item.id}>
                    <Card  key={item.id} title={item.title} bordered={false}>
                        <RadioGroup onChange={this.onChange.bind(this,item.id)}>
                            {this.getOption(item.xiangmus)}
                        </RadioGroup>
                        <br/><br/><br/>
                        <Button onClick={this.onClick.bind(this,item.id)}>提交</Button>
                        <Button onClick={this.onClick2.bind(this,item.id)}>查看投票结果</Button>
                        <Button onClick={this.onClick3.bind(this,item.id)}>删除投票</Button>
                    </Card>
                </Col>
            )
        })

        return a
    }

    getOption(data){
       let a=[]
        for(let i=0;i<data.length;i++){
           a.push(
               <Radio style={{display:'block'}} value={data[i]}>
                   {data[i]}
               </Radio>
           )
        }
        return a
    }

    render(){
        return(
            <div>
                <Row gutter={16}>
                    {this.state.data&&this.getToupiao()}
                </Row>
                <Modal
                    title="统计结果"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}>
                    {this.state.modalData&&this.getModalData()}
                </Modal>
            </div>
        )
    }
}
