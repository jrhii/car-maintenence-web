import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleEvent = this.handleEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleEvent(event) {
        const init = {method: 'post',
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        };

        fetch(`/${event.target.name}`,init).then((res) => {
            if (res.ok) {
                console.log('post success');
            } else {
                console.log('post unsuccess');
            }
        });

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <form name="login" onSubmit={this.handleEvent}>
                    <input type="text" name="username" className="Username" placeholder="username" value={this.state.username} onChange={this.handleChange} required="required"/>
                    <input type="text" name="password" className="Password" placeholder="password" value={this.state.password} onChange={this.handleChange} required="required"/>
                    <input type="submit" value="Login"/>
                    <button type="button" name="register" onClick={this.handleEvent}>Register</button>
                </form>

            </div>
        );
    }
}

export default App;
