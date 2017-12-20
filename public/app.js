var React = require('react');
var ReactDOM = require('react-dom');

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <h1 className="title"> Liste de contacts</h1>
                <div className="container">
                    <div className="row">
                        <h1>Authentification</h1>
                        <form>
                            <div className="form-group" >
                                <label>Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter votre username"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="password" name="password" placeholder="Password"/>
                            </div>
                            <input type="submit" className="btn btn-primary" id="valider" value="Submit"/>
                        </form>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="list-group text-center col-xs-12 col-sm-6 col-md-3 col-lg-2">
                            <a href="#" className="list-group-item list-group-item-action">8002</a>
                            <a href="#" className="list-group-item list-group-item-action">8003</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);