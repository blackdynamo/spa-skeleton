"use strict";

var State = require("backbone").Model;

module.exports = () => new State({
    filter: "all",
    todos: []
});