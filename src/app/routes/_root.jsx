"use strict";

var React = require("react");

module.exports = function(container){
    var Page = React.createFactory(require("app/pages").Root);

    React.render(new Page(), container);
};