var React = require("react");

class Numbers extends React.Component {
    constructor() {
        super();
        this.state = {
            post: ""
        };
    }
    handleClick(number) {
        var postNumber = this;
        console.log('number', number);
        fetch('https://ws.agiloffice.fr/demo/phone_call?number='+number, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        }).then(function(response) {
            var socket = io.connect();
            if (response.status == 200) {
                socket.emit('subscribe', '8003');
                //console.log("socket", socket);
                socket.on ('messageSuccess', function (post) {
                    console.log("call", post);
                    postNumber.setState({
                        post: post,
                    });
                });
            }
        });
    }
    render() {
        var alert = "";
        if (this.state.post == "8003" ) {
            alert = <i className="fa fa-bell" aria-hidden="true"></i>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="list-group text-center col-xs-12 col-sm-6 col-md-3 col-lg-2">
                        <a href="#" onClick={this.handleClick.bind(this, 8002)} className="list-group-item list-group-item-action">8002</a>
                        <a href="#" onClick={this.handleClick.bind(this, 8003)} className="list-group-item list-group-item-action">8003 {alert}</a>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Numbers;