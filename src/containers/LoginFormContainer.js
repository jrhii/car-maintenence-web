import React, { Component } from 'react';
import SingleInput from '../components/SingleInput';

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleEvent = this.handleEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.handleUsernameCheck = this.handleUsernameCheck.bind(this);
    }

    clearForm(){
        this.setState({username : '', password: ''});
    }

    handleEvent(event) {
        const init = {
            method: 'post',
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

        this.clearForm();

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleUsernameCheck(event) {
        const init = {
            method: 'post',
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
            }),
        };

        fetch('/checkUsername',init).then((res) => {
            if (res.ok) {
                console.log('post success');
            } else {
                console.log('post unsuccess');
            }
        });

    }

    render() {
        return (
            <form name="login" onSubmit={this.handleEvent}>
                <SingleInput
                    className={'form-control'}
                    inputType={'text'}
                    name={'username'}
                    controlFunc={this.handleChange}
                    content={this.state.username}
                    placeholder={'Username'} />
                <SingleInput
                    className={'form-control'}
                    inputType={'text'}
                    name={'password'}
                    controlFunc={this.handleChange}
                    content={this.state.password}
                    placeholder={'Password'} />
                <button className="btn btn-secondary" type="button" onClick={this.handleUsernameCheck}>Check Username</button>
                <br/>
                <div className="btn-group" role="group" aria-label="Login">
                    <input className="btn btn-primary" type="submit" value="Login"/>
                    <button type="button" className="btn btn-outline-primary" name="register" onClick={this.handleEvent}>Register</button>
                </div>
            </form>
        );
    }
}

export default LoginFormContainer;
