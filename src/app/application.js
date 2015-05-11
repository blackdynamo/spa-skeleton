"use strict";

var Backbone = require("backbone");

var Application = Backbone.Marionette.Application.extend({
    getContainer: function () {
        return document.getElementById("app");
    },

    navigate: function (fragment) {
        this.router.navigate(fragment, {trigger: true});
    }
});

var app = new Application();

app.addInitializer(function initializeMockjax() {
    var commands = require("app/commands");
    commands.registerWith(app);
});

app.addInitializer(function initializeRouter() {
    var Router = require("./router");
    this.router = new Router();
});

app.on("start", function () {
    Backbone.history.start();
});

module.exports = app;