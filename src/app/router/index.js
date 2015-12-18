"use strict";

var Router = require("backbone").Router,
    routes = require("./routes");

module.exports = Router.extend({
    routes: {
        "todos": routes.todos,
        "*all": routes.home
    }
});