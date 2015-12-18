"use strict";

var actionTypes = require("app/action-types"),
    dispatcher = require("app/dispatcher"),
    service = require("app/services").filter;

module.exports = () => {
    return service
        .get()
        .then((filter) => dispatcher.dispatch({
            actionType: actionTypes.filter.update,
            payload: filter
        }));
};