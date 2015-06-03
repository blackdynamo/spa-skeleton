"use strict";

var _ = require("underscore"),
    $ = require("jquery");

function Callbacks() {
    this._deferred = $.Deferred();
    this._callbacks = [];
}

Callbacks.prototype.add = function (callback, contextOverride) {
    var promise = _.result(this._deferred, "promise");

    this._callbacks.push({cb: callback, ctx: contextOverride});

    promise.then(function (args) {
        if (contextOverride) {
            args.context = contextOverride;
        }

        callback.call(args.context, args.options);
    });
};

Callbacks.prototype.run = function (options, context) {
    this._deferred.resolve({
        options: options,
        context: context
    });
};

Callbacks.prototype.reset = function () {
    var callbacks = this._callbacks;
    this._deferred = $.Deferred();
    this._callbacks = [];

    _.each(callbacks, function (cb) {
        this.add(cb.cb, cb.ctx);
    }, this);
};

module.exports = Callbacks;