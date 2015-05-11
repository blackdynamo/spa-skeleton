"use strict";

require("./object-assign-polyfill.js");


global.resetDom = function(){
    global.window = require("jsdom").jsdom("<html><body></body></html>").parentWindow;
    global.document = window.document;
    global.navigator = window.navigator;
};

// React determines if it can depend on the DOM at require-time, so if we don"t
// set this up beforehand it will complain about not being able to do things
// with the DOM.
// Perhaps a bug in React?
resetDom();

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
require("react-tap-event-plugin")();

global.createStubReactComponent = require("./create-stub-react-component");