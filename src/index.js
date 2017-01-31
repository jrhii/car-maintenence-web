import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginFormContainer from './containers/LoginFormContainer';
import Vehicles from './containers/Vehicles';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LoginFormContainer}/>
        </Route>
        <Route path="vehicles" component={App}>
            <IndexRoute component={Vehicles}/>
        </Route>
    </Router>),
    document.getElementById('root')
);
