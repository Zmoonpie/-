import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {Route} from 'react-router-dom';
import Layout from './nav/layout';
import List from './nav/List'
import Add from './nav/Add'
import Addartcle from './nav/addArticle'
import AddShow from './nav/showAdd'
import Toupiao from './nav/toupiao'
import ShowToupiao from './nav/showToupiao'
import Choujiang from './nav/choujiang'
import MyInfo from './nav/myInfo'

ReactDOM.render(
    <Layout>
      <Route  exact path="/" component={List}/>
        <Route path='/demo1' component={MyInfo}/>
      <Route  path="/demo2" component={Add} />
        <Route path="/addArticle" component={Addartcle}/>
        <Route path="/demo3" component={AddShow}/>
        <Route path="/demo4" component={Toupiao}/>
        <Route path="/demo5" component={ShowToupiao}/>
        <Route path="/demo6" component={Choujiang}/>
    </Layout>,
  document.getElementById('root')
);
