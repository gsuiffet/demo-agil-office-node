var React = require("react");

class Numbers extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="list-group text-center col-xs-12 col-sm-6 col-md-3 col-lg-2">
                        <a className="list-group-item list-group-item-action">8002</a>
                        <a className="list-group-item list-group-item-action">8003</a>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Numbers;