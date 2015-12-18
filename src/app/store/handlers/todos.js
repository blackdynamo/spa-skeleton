"use strict";

var actionTypes = require("app/action-types");

module.exports = (handlers) => {
    handlers[actionTypes.todos.update] = (state, action) =>{
        state.set("todos", action.payload);

        return Promise.resolve();
    };
};