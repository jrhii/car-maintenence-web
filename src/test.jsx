

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.socket = io();
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        this.socket.emit('register', this.state.username, this.state.password);
        console.log('A name was submitted: ' + this.state.username);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsername} required="required"/>
                <input type="text" placeholder="password" value={this.state.password} onChange={this.handlePassword} required="required"/>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

const mainElement = document.querySelector("main");

ReactDOM.render(React.createElement(NameForm), mainElement);
