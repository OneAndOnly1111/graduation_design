import React from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import Header from './common/header'
import Login from './common/login'
import ProductList from './productList/productList'
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom'
require('../style/main.less');
require('../js/datatables/jquery.dataTables.js')
const routes = [
  { 
    path: '/productList',
    exact: true,
    main: () => <ProductList/>
  },
  {
   path: '/saleRanking',
    main: () => <div>saleRanking</div>
  },
  { 
    path: '/staffRanking',
    main: () => <div>staffRanking</div>
  },
  { 
    path: '/addMessage',
    main: () => <div>addMessage</div>
  },
  { 
    path: '/',
    main: () => <Login/>
  }
]

const Sidebar = () => (
  <Router>
    <div className="main-container">
      <div className="main-sidebar">
          <div className="user-panel">
            <div className="user-image">
              <img src="../../img/user.jpg"/>
            </div>
            <span>OneAndOnly</span>
          </div>
          <ul className="sidebar-menu">
            <li className="treeview">
              <NavLink to="/saleRanking" activeClassName="selected">  
                <i className="fa fa-tachometer"></i>
                <span className="text">销售排行</span>
              </NavLink>
            </li>
            <li className="treeview">
              <NavLink to="/staffRanking" activeClassName="selected"> 
                <i className="fa fa-files-o"></i>
                <span className="text">员工排行</span>
              </NavLink>
            </li>
            <li className="treeview">
              <NavLink to="/productList" activeClassName="selected"> 
                <i className="fa fa-pie-chart"></i>
                <span className="text">商品列表</span>
              </NavLink>
            </li>
            <li className="treeview">
              <NavLink to="/addMessage" activeClassName="selected"> 
                <i className="fa fa-line-chart"></i>
                <span className="text">销售信息录入</span>
              </NavLink>
            </li>
          </ul>
      </div>
      <div className="main-content">
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
    </div>
   </div>
  </Router>
)


class Wrapper extends React.Component {
  render() {
    return (
     <div>
        <Login/>
     </div>
    );
  }
}

ReactDOM.render(<Wrapper/>,document.getElementById('wrapper'));




