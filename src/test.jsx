const HelloWorld = React.createClass({

    /*   <input ref="password" placeholder="password" required="required">
      <button ref="submit">Login</button>
    </form>
    <button ref="print" onclick={ print}>print</button>
*/

    render: function() {
        return React.createElement("h1", null, "Hello World!");
    }
});

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.username);
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
