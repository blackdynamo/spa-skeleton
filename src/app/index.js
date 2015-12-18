"use strict";

var _ = require("underscore"),
    Backbone = require("backbone");

module.exports = _.extend({
    navigate(route) {
        this.router.navigate(route, {trigger: true});
    },

    start() {
        this.router = new (require("app/router"))();
        Backbone.history.start();
    }
}, Backbone.Events);