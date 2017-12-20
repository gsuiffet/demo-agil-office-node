var React = require("react");

class Numbers extends React.Component {
    constructor() {
        super();
    }
    handleClick(number) {
        console.log('number', number);
        fetch('https://ws.agiloffice.fr/demo/phone_call?number='+number, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        }).then(function(response) {
            if (response.status == 200) {
                console.log("response", response);
            }
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="list-group text-center col-xs-12 col-sm-6 col-md-3 col-lg-2">
                        <a href="#" onClick={this.handleClick.bind(this, 8002)} className="list-group-item list-group-item-action">8002</a>
                        <a href="#" onClick={this.handleClick.bind(this, 8003)} className="list-group-item list-group-item-action">8003</a>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Numbers;