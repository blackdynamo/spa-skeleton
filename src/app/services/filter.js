"use strict";

var storage = require("app/storage");

module.exports = {
    get(){
        return storage.get("filter");
    },

    update(filter){
        return storage.set("filter", filter);
    }
};
