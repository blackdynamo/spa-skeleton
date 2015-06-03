"use strict";

var React = require("react"),
    app = require("app/application");

module.exports = function(){
    var Page = require("app/pages").Root;

    React.render(<Page />, app.container);
};