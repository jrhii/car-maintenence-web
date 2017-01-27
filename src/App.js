import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Car Maitenance Tracker</h2>
                </div>
                <br/>

                {this.props.children}

            </div>
        );
    }
}

export default App;
