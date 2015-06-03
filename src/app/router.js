"use strict";

var Backbone = require("backbone"),
    routes = require("./routes");

module.exports = Backbone.Router.extend({
    routes: function () {
        return {
            "": routes.root,

            //errors
            "*all": routes.errors.notFound
        };
    }
});