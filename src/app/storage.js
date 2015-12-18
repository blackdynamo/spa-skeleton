"use strict";

module.exports = {
    get: function (name) {
        var item = localStorage.getItem(name);

        return Promise.resolve(item ? JSON.parse(item) : undefined);
    },

    set: function (name, value) {
        localStorage.setItem(name, JSON.stringify(value));
        return Promise.resolve(value);
    },

    clear: function (name) {
        localStorage.removeItem(name);
        return Promise.resolve();
    }
};