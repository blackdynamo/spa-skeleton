"use strict";

var React = require("react");

module.exports = function stub(options) {
    options = options || {};

    return React.createClass({
        mixins: options.mixins,

        render: function() {
            return React.DOM.div();
        }
    });
};