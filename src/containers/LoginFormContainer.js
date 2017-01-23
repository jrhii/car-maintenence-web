import React, { Component } from 'react';
import SingleInput from '../components/SingleInput';

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleEvent = this.handleEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
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

    render() {
        return (
            <form name="login" onSubmit={this.handleEvent}>
                <SingleInput
                    inputType={'text'}
                    name={'username'}
                    controlFunc={this.handleChange}
                    content={this.state.username}
                    placeholder={'Username'} />
                <SingleInput
                    inputType={'text'}
                    name={'password'}
                    controlFunc={this.handleChange}
                    content={this.state.password}
                    placeholder={'Password'} />
                <input className="btn btn-primary" type="submit" value="Login"/>
                <button type="button" className="btn btn-secondary" name="register" onClick={this.handleEvent}>Register</button>
            </form>
        );
    }
}

export default LoginFormContainer;
