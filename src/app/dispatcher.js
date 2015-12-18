"use strict";

var _ = require("underscore"),
    uuid = require("node-uuid"),
    handlers = {};


var queue = require("async").queue((options, done) => {
    Promise
        .all(_.reduce(handlers, (memo, handler) => {
            memo.push(handler(options.action));

            return memo;
        }, []))
        .then(options.resolve)
        .catch(options.reject)
        .finally(() => Promise.resolve(done()))
    ;
}, 1);

module.exports = {
    register(handler){
        var id = uuid.v4();
        handlers[id] = handler;
        return id;
    },

    unregister(id){
        delete[id];
    },

    dispatch(action){
        return new Promise((resolve, reject) => queue.push({
            action: action,
            resolve: resolve,
            reject: reject
        }));
    }
};