import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginFormContainer from './containers/LoginFormContainer';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LoginFormContainer}/>
        </Route>
    </Router>),
    document.getElementById('root')
);
