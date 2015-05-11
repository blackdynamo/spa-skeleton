"use strict";

(function () {
    document.title = process.env.APP_TITLE;

    initializeReact();
    initializeReactTapEvent();
    initializeBackbone();
    initializeMarionette();

    require("app/application").start();
})();

function initializeReact() {
    window.React = require("react");
}

function initializeReactTapEvent() {
    //https://github.com/zilverline/react-tap-event-plugin
    require("react-tap-event-plugin")();
}

function initializeBackbone() {
    var Backbone = require("backbone");

    Backbone.$ = Backbone.$ || require("jquery");
}

function initializeMarionette() {
    require("backbone.marionette");
}