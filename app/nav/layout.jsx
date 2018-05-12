import React from 'react';
import { Layout, Menu, Breadcrumb, Icon,Modal } from 'antd';
import Login from './login'
import {webApi} from "../utils/index";
import  urls from '../utils/urls'
import Register from './register'
import {BrowserRouter, Link} from 'react-router-dom';




const { Header, Content,Sider } = Layout;
const SubMenu = Menu.SubMenu;
export default class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.routeDIC = {};
      this.state = {
          collapsed: false,
          navDatas: [],
          visible:false,
          username:'',
          regVisible:false,
          loginData:null,

      }
  }
   ;
  componentDidMount() {
    this.getRoute();
    this.getLogin()
  }

  getRoute() {

    var result = [
      { "name": "我的文章", "path": "/", "icon": "file" },
      { "name": "自动回复配置", "path": "/demo2", "icon": "user" },
        { "name": "自动回复演示", "path": "/demo3", "icon": "user" },
        { "name": "投票配置", "path": "/demo4", "icon": "file" },
        { "name": "投票展示", "path": "/demo5", "icon": "file" },
        { "name": "抽奖", "path": "/demo6", "icon": "user" },
    ];
    result.forEach((item) => {
      if (this.routeDIC[item.path] == undefined) {
        this.routeDIC[item.path] = item;
      }
    })
    this.setState({
      navDatas: result,
    })

  }

  onCollapse = (collapsed) => {
    console.log(this.props);

    this.setState({ collapsed });
  }

  createMenuItem = (datas) => {
    let doms = [];
    datas.forEach((item, index) => {
      if (item.children) {
        doms.push(
          <SubMenu
            key={item.name + index}
            title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
          >
            {
              this.createMenuItem(item.children)
            }
          </SubMenu>
        );

      } else {
        doms.push(
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        );
      }

    });
    return doms;
  }


  zcClick(){
    this.setState({
        regVisible:true
    })
  }

  dlClick(){
      this.setState({
          visible:true
      })
  }

  tcClick(){
     // debugger;
   webApi.get(urls.loginOut(this.state.loginData[0].id)).then((result)=>{
       if(result){
           this.setState({loginData:null,
               username:''  ,
               visible:false
           })

            setTimeout(()=>location.reload(),100)


       }

   })
  }

  onOk(){
    this.setState({
        visible:false
    })
  }

  onCancel(){
      this.setState({
          visible:false
      })
  }

    onRegok(){
        this.setState({
            regVisible:false
        })
    }

    onRegcancel(){
        this.setState({
            regVisible:false
        })
    }
    regVisible(){
      this.setState({regVisible:false})
    }

  username(){
       this.getLogin()
  }

  getLogin(){
      webApi.get(urls.getLoginPeo()).then((result)=>{
        if(result[0]){
            this.setState({loginData:result,
                username:result[0].username  ,
                visible:false
            })
        }

      })
  }


  render() {
    const { navDatas } = this.state;
    return (
      <BrowserRouter >
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
              {this.createMenuItem(navDatas)}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} >
              <h1 style={{float:'left'}}>微信公众号管理</h1>   {this.state.username==''?
                <div style={{float:'right'}}><a onClick={()=>this.zcClick()}>注册</a> | <a onClick={()=>this.dlClick()}>登录</a></div>:
                <div style={{float:'right'}}><a>{this.state.loginData&&this.state.loginData[0].username}</a> | <a onClick={()=>this.tcClick()}>退出</a></div>}
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item><Link to='/'>首页</Link></Breadcrumb.Item>
                <Breadcrumb.Item>演示</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.props.children}

              </div>
            </Content>

          </Layout>
          <Modal
              width={600}
              visible={this.state.visible}
              title='登录'
              onOk={this.onOk.bind(this)}
              onCancel={this.onCancel.bind(this)}
          >
          <Login username={this.username.bind(this)}></Login>
          </Modal>

            <Modal
            width={600}
            visible={this.state.regVisible}
            title='注册'
            onOk={this.onRegok.bind(this)}
            onCancel={this.onRegcancel.bind(this)}>
                <Register regVisible={this.regVisible.bind(this)}></Register>
            </Modal>
        </Layout>
      </BrowserRouter>
    );
  }
}

