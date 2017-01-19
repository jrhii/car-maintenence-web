import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.postLogin = this.postLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    postLogin() {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);

        const init = {method: 'POST',
            body: formData};

        fetch('/login',init).then((res) => {
            if (res.ok) {
                console.log('post success');
            } else {
                console.log('post unsuccess');
            }
        });
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

                <form onSubmit={this.postLogin}>
                    <input type="text" name="username" className="Username" placeholder="username" value={this.state.username} onChange={this.handleChange} required="required"/>
                    <input type="text" name="password" className="Password" placeholder="password" value={this.state.password} onChange={this.handleChange} required="required"/>
                    <input type="submit" value="Login"/>
                    <button type="button">Register</button>
                </form>

            </div>
        );
    }
}

export default App;
