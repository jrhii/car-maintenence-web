import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Car Maintenance Tracker</h1>
                </div>
                <div className="row"/>
                {this.props.children}
            </div>
        );
    }
}

export default App;
