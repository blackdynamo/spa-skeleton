"use strict";

var React = require("react"),
    Button = require("app/components").Button;

module.exports = React.createClass({
    onClick: function () {
        alert("You clicked the test button!");
    },

    render: function () {
        return <div className="container">
            <h1>Simple SPA Skeleton</h1>
            <Button value="Test Button" type="primary" onClick={ this.onClick }/>
        </div>;
    }
});