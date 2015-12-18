"use strict";

module.exports = () => {
    var handlers = {};

    require("./filter")(handlers);
    require("./todos")(handlers);

    return handlers;
};