"use strict";

var _ = require("underscore"),
    dispatcher = require("app/dispatcher"),
    getInitialState = require("./get-initial-state"),
    handlers = require("./handlers")(),
    state = getInitialState();

dispatcher.register((action) => {
    var handler = handlers[action.actionType] || _.noop;
    return handler(state, action);
});

module.exports = {
    on(event, callback, context){
        state.on(event, (state) => callback(map(state)), context);
    },

    once(event, callback, context){
        state.once(event, (state) => callback(map(state)), context);
    },

    off(event, callback, context){
        state.off(event, callback, context);
    },

    get(name){
        var item = state.get(name);
        return item ? JSON.parse(JSON.stringify(item)) : item;
    }
};

function map(state) {
    var changed = state.changedAttributes(),
        previous = state.previousAttributes();

    return _.reduce(_.keys(changed), (memo, name) => {
        memo[name] = {
            value: changed[name],
            previousValue: previous[name]
        };

        return memo;
    }, {});
}