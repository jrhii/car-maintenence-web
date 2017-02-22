import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginFormContainer from './containers/LoginFormContainer';
import Vehicles from './containers/vehicle/Vehicles';
import AddVehicle from './containers/vehicle/AddVehicle';
import EditVehicle from './containers/vehicle/EditVehicle.js';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LoginFormContainer}/>
            <Route path="login" component={LoginFormContainer}/>
            <Route path="vehicles"  >
                <Route path="user/:userId" component={Vehicles}/>
                <Route path="new/:userId" component={AddVehicle}/>
                <Route path="edit/:userId/:year/:make/:model/:opt/:vehicleId" component={EditVehicle}/>
            </Route>
        </Route>
    </Router>),
    document.getElementById('root')
);
