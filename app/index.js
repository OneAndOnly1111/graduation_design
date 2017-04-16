import React from 'react'
import ReactDOM from 'react-dom'
import Header from './common/header'
import Sidebar from './common/sidebar'
import Content from './content'
import Dashboard from './dashboard'
import { Router, Route, browserHistory ,IndexRoute} from 'react-router'
require('../style/main.less');

class Wrapper extends React.Component {
  render() {
    return (
     <div>
       <Header/>
       <Sidebar/>
        <Content/>
     </div>
    );
  }
}

ReactDOM.render(
  <Wrapper/>,
  document.getElementById('wrapper')
);


// class Wrapper extends React.Component{
//   render(){
//     return(  
//         <div>
//             <Header/>
//             <Sidebar/>
//             {this.props.children}
//         </div>
//     )
//   }
// }


// ReactDOM.render((
//   <Router history={browserHistory}>
//     <Route path='/'>
//       <IndexRoute component={Wrapper} />
//       <Route path='/content' component={Content} />
//       <Route path='/dashboard' component={Dashboard} />
//     </Route>
//   </Router>
// ),document.getElementById('wrapper'));





