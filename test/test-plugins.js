"use strict";

var chai = require("chai"),
    sinon = require("sinon"),
    sinonChai = require("sinon-chai"),
    React = require("react/addons");

chai.use(sinonChai);

global.sinon = sinon;
global.expect = chai.expect;
global.React = React;
global.TestUtils = React.addons.TestUtils;