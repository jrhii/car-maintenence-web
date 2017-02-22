import React, { Component } from 'react';
import SingleInput from '../components/SingleInput';
import Container from '../components/Container';
import { loginAuth, usernameCheck } from '../service/auth';
import { Router } from 'react-router';
//import {Link} from 'react-router';

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleEvent = this.handleEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.handleUsernameCheck = this.handleUsernameCheck.bind(this);
    }

    clearForm() {
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

        loginAuth(event.target.name, init, (success, resJson) => {
            if (success) {
                this.props.router.push(`/vehicles/user/${resJson}`);
                //react-router to details
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

        usernameCheck(init);
        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <form name="login" onSubmit={this.handleEvent}>
                    <div className="input-group">
                        <SingleInput
                            className={'form-control'}
                            inputType={'text'}
                            name={'username'}
                            controlFunc={this.handleChange}
                            content={this.state.username}
                            placeholder={'Username'} />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={this.handleUsernameCheck}>Check Username</button>
                        </span>
                    </div>
                    <SingleInput
                        className={'form-control'}
                        inputType={'text'}
                        name={'password'}
                        controlFunc={this.handleChange}
                        content={this.state.password}
                        placeholder={'Password'} />
                    <br/>
                    <div className="btn-group" role="group" aria-label="Login">
                        <input className="btn btn-primary" type="submit" value="Login"/>
                        <button type="button" className="btn btn-outline-primary" name="register" onClick={this.handleEvent}>Register</button>
                    </div>
                </form>
            </Container>
        );
    }
}

export default LoginFormContainer;
