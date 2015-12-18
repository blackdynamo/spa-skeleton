"use strict";

var actionTypes = require("app/action-types"),
    dispatcher = require("app/dispatcher"),
    service = require("app/services").filter;

module.exports = (filter) => {
    return service
        .update(filter)
        .then((filter) => dispatcher.dispatch({
            actionType: actionTypes.filter.update,
            payload: filter
        }));
};