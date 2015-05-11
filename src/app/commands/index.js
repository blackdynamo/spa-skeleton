"use strict";

var _ = require("underscore");

function Commands(){
}

Commands.prototype.registerWith = function(app){
    _.each(this, function(group){
        group.registerWith(app);
    });
};

module.exports = new Commands();