"use strict";

var app = require("app/application");

(function () {
    document.title = process.env.APP_TITLE;

    window.React = require("react");
    require("backbone").$ = require("jquery");

    app.addInitializer(function initializeMockjax() {
        var commands = require("app/commands");
        commands.registerWith(app);
    });

    app.addInitializer(function initializeMockjax() {
        this.container = document.getElementById("app");
    });

    app.addInitializer(function initializeRouter() {
        var Router = require("./router");
        this.router = new Router();
    });

    app.start();
})();