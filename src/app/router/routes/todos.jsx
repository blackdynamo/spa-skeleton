"use strict";

var app = require("app"),
    React = require("react"),
    ReactDOM = require("react-dom"),
    actions = require("app/actions");

module.exports = () => {
    var Page = require("app/pages/todos/index.jsx");

    Promise
        .all([
            actions.todos.find(),
            actions.filter.get()
        ])
        .then(() => ReactDOM.render(<Page/>, app.container));
};