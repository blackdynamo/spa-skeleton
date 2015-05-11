"use strict";

var _ = require("underscore"),
    Backbone = require("backbone"),
    routes = require("./routes"),
    app = require("app/application");

module.exports = Backbone.Marionette.AppRouter.extend({
    routes: function () {
        return {
            "": wrap(routes.root),

            //errors
            "*all": wrap(routes.errors.notFound)
        };
    }
});

function wrap(route) {
    return _.partial(route, app.getContainer());
}