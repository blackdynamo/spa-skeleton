"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.title = process.env.appName;

    window.jQuery = window.$ = require("jquery");
    window.Promise = require("bluebird");
    require("bootstrap");

    var app = require("app");

    app.container = document.getElementById("container");
    app.modal = document.getElementById("modal");
    app.store = require("app/store");
    app.start();
});