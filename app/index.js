import React from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import Header from './common/header'
import Sidebar from './common/sidebar'
import Login from './common/login'
import Register from './common/register'
import ProductList from './productManage/productList'
import SaleRanking from './productManage/saleRanking'
import SaleMessageAdd from './saleManage/saleMessageAdd'
import StaffRanking from './saleManage/salerRanking'
import StoreManager from './storeManager/storeManager'
import {BrowserRouter as Router,Route,Link,NavLink,IndexRoute,browserHistory} from 'react-router-dom'
require('../style/main.less');  
require('../js/datatables/jquery.dataTables.js');
require('../node_modules/jquery/dist/jquery.js');
require('../style/bootstrap/dist/js/bootstrap.js');

ReactDOM.render((
    <Router>
      <div>
        <Route exact path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/productList" component={ProductList}/>
        <Route path="/addMessage" component={SaleMessageAdd}/>
        <Route path='/staffRanking' component={StaffRanking}/>
        <Route path='/saleRanking' component={SaleRanking}/>
        <Route path='/storeManager' component={StoreManager}/>
      </div>
    </Router>
),document.getElementById('wrapper'));




