var React = require('react');
var ReactDOM = require('react-dom');
var Numbers = require("./components/numbers");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            connect: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        var connect = this;
        fetch('https://ws.agiloffice.fr/demo/session_login?username='+this.state.username+'&password='+this.state.password, {
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
            credentials: "include",
        }).then(function(response) {
            if (response.status == 200) {
                connect.setState({
                    connect: true,
                });
            }
            return response.json()
        }).then(function(userInfo) {
            console.log("userInfo",userInfo);
        });
        event.preventDefault();
    }
    render() {
        var numberList = [];
        if (this.state.connect == true) {
            //console.log("this.state.connect", this.state.connect);
            numberList.push(
                <div key={0} >
                    <Numbers/>
                </div>
            );
        }
        return (
            <div>
                <h1 className="title"> Liste de contacts</h1>
                <div className="container">
                    <div className="row">
                        <h1>Authentification</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group" >
                                <label>Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter votre username" value={this.state.valueUsername} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="password" name="password" placeholder="Password" value={this.state.valuePassword} onChange={this.handleChange}/>
                            </div>
                            <input type="submit" className="btn btn-primary" id="valider" value="Submit"/>
                        </form>
                    </div>
                </div>
                {numberList}
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);