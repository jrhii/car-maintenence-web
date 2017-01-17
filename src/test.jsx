

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.socket = io();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        this.socket.emit('login', this.state.username, this.state.password);
        console.log('A name was submitted: ' + this.state.username);
        event.preventDefault();
    }

    handleRegister(event) {
        this.socket.emit('register', this.state.username, this.state.password);
        console.log('A name was submitted to be registered: ' + this.state.username);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} required="required"/>
                <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required="required"/>
                <input type="submit" value="Login"/>
                <button type="button" onClick={this.handleRegister}>Register</button>
            </form>
        );
    }
}

const mainElement = document.querySelector("main");

ReactDOM.render(React.createElement(NameForm), mainElement);
