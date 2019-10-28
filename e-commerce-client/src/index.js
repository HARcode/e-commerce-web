import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from './containers/addItem';
import detail from './components/detail'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router} from 'react-router-dom';


const routing = (
  <Router>
    
      
        <Route exact path="/" component={AddItem} />
        <Route path="/detail" component={detail} />
      
    
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
