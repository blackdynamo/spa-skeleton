"use strict";

var actionTypes = require("app/action-types");

module.exports = (handlers) => {
    handlers[actionTypes.filter.update] = (state, action) =>{
        state.set("filter", action.payload);

        return Promise.resolve();
    };
};