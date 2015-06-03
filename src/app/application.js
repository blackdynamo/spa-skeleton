"use strict";

var _ = require("underscore"),
    Backbone = require("backbone"),
    Wreqr = require("backbone.wreqr"),
    Callbacks = require("app/callbacks");

_.extend(Application.prototype, Backbone.Events);

function Application() {
    this._initCallbacks = new Callbacks();
    this.commands = new Wreqr.Commands();
}

Application.prototype.execute = function () {
    this.commands.execute.apply(this.commands, arguments);
};

Application.prototype.addInitializer = function (initializer) {
    this._initCallbacks.add(initializer);
};

Application.prototype.start = function (options) {
    this.trigger('before:start', options);
    this._initCallbacks.run(options, this);
    this.trigger('start', options);
};

var app = new Application();

app.on("start", function () {
    Backbone.history.start();
});

module.exports = app;