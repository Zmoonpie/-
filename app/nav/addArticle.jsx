import React,{Component} from 'react'
import { Form, Input, Button,Layout,message,Icon} from 'antd'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

import HommilyEditor from 'HommilyEditor';

const FormItem = Form.Item;
const { TextArea } = Input
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Addartcle extends Component{
    constructor(props){
        super(props)
        this.state={
            loginData:null,
            title:'',
            content:'',
            pageView:null
        }
    }
    componentWillMount(){
        if(this.getQueryString('show')){
            webApi.get(urls.getPageViwe(this.getQueryString('id'))).then((result)=>{
            })
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
                   content:result[0].content,
                   pageView:result[0].pageView
               })
           })
       }

    }


    handleChange(e){
        console.log(e)
    }

    handleChange = (content) => {
        console.log(content)
        this.setState({
            content:content
        })
    }
    submit(){
        let values={
            content:this.state.content,
            id:this.state.loginData.id,
            title:this.state.title
        }
        if(this.state.loginData&&this.state.loginData.id!=undefined){
            values.id=this.state.loginData.id
        }else {
            message.error("请登录")
            return false
        }
        if(values.title==null||values.title=='')
        {
            message.error('请输入标题!')
            return false
        }
        if(values.content==null||values.content=='')
        {
            message.error('请输入文章内容!')
            return false
        }
        if(this.getQueryString('id')){
            values.id=this.getQueryString('id')
            webApi.post(urls.editArt(),values).then((result)=> {
                message.info("编辑文章成功")
                history.back()
            })
        }else {
            values.pageView=0
            webApi.post(urls.addArtcle(),values).then((result)=> {
                message.info("添加文章成功")
                history.back()
            })
        }

    }

  titleChange(e){
        this.setState({title:e.target.value})
  }


    updata(param){
        const serverURL = urls.updata()
        const xhr = new XMLHttpRequest
        const fd = new FormData()

        // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
        console.log(param.libraryId)

        const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            param.success({
                url: xhr.responseText,
                meta: {
                    id: 'xxx',
                    title: 'xxx',
                    alt: 'xxx',
                    loop: true, // 指定音视频是否循环播放
                    autoPlay: true, // 指定音视频是否自动播放
                    controls: true, // 指定音视频是否显示控制栏
                    poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                }
            })
        }

        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
        }

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: 'unable to upload.'
            })
        }

        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)

        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)
    }
    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    render(){
        const editorProps = {
            media:{
                image:true,
                uploadFn:this.updata.bind(this)
            },
            height: 500,
            contentFormat: 'html',
            initialContent: this.state.content,
            onChange: this.handleChange,
            //onRawChange : this.handleRawChange
        }
        const { getFieldDecorator, getFieldsError } = this.props.form;
        return(
            <div>
                { ((!this.getQueryString('show')&&this.state.content)||!this.getQueryString('id')&&!this.getQueryString('show'))&&<div>
                    <Button onClick={this.submit.bind(this)}>保存</Button>
                    <Input placeholder='请输入文章标题' value={this.state.title} onChange={this.titleChange.bind(this)}/>
                    <br/>
                    <div className="demo">
                        <BraftEditor {...editorProps}/>
                    </div>
                </div>}

                {this.getQueryString('show')&&
                <div>
                    <div style={{textAlign:'center',fontSize:'25px',marginBottom:'5px'}}>{this.state.title}</div>
                    <div dangerouslySetInnerHTML={{__html:this.state.content}}></div>
                    <Icon style={{float:'right',fontSize:'20px'}} type="message" />
                    <div style={{float:'right',fontSize:'14px',marginRight:'10px'}}>阅读  {this.state.pageView}</div>
                </div>
                 }





                {/*<Form id='form1' layout="horizontal" onSubmit={this.handleSubmit}>*/}
                    {/*<FormItem*/}
                        {/*label='标题'>*/}
                        {/*{getFieldDecorator('title', {*/}
                            {/*initialValue:this.state.title,*/}
                            {/*rules: [{required:true,message:'请输入标题!'}]*/}
                        {/*})(*/}
                            {/*<Input/>*/}
                        {/*)}*/}
                    {/*</FormItem>*/}
                    {/*<FormItem*/}
                        {/*label='内容'>*/}
                        {/*{getFieldDecorator('content',{*/}
                            {/*initialValue:this.state.content,*/}
                            {/*rules:[{required:true,message:'请输入内容'}]*/}
                        {/*})(*/}
                            {/*<TextArea row={4} />*/}
                        {/*)}*/}

                    {/*</FormItem>*/}
                    {/*<FormItem>*/}
                        {/*<Button*/}
                            {/*type="primary"*/}
                            {/*htmlType="submit"*/}
                            {/*disabled={hasErrors(getFieldsError())}*/}
                        {/*>*/}
                            {/*保存*/}
                        {/*</Button>*/}
                    {/*</FormItem>*/}
                {/*</Form>*/}
            </div>

        )
    }
}

export default Form.create()(Addartcle)

