"use strict";

var React = require("react"),
    classNames = require("classnames");

module.exports = React.createClass({
    getClasses: function () {
        var classes = {
            "btn": true
        };

        var type = this.props.type || "default";
        classes["btn-" + type] = true;

        return classNames(classes);
    },

    onClick: function () {
        if (this.props.onClick) {
            this.props.onClick();
        }
    },

    render: function () {
        return <button className={ this.getClasses() } onTouchTap={ this.onClick }>{ this.props.value }</button>;
    }
});