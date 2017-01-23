import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginFormContainer from './containers/LoginFormContainer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Car Maitenence Tracker</h2>
                </div>

                <LoginFormContainer />

            </div>
        );
    }
}

export default App;
