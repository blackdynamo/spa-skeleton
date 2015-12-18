"use strict";

var actionTypes = require("app/action-types"),
    dispatcher = require("app/dispatcher"),
    service = require("app/services").todos;

module.exports = () => {
    return service
        .clear()
        .then((todos) => dispatcher.dispatch({
            actionType: actionTypes.todos.update,
            payload: todos
        }));
};