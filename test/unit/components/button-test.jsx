"use strict";

var proxyquire = require("proxyquire");

describe("components.button", function () {
    var Button;

    beforeEach(function(){
        this.sandbox = sinon.sandbox.create();
        Button = proxyquire("app/components/_button.jsx", {});
    });

    afterEach(function(){
        resetDom();
        this.sandbox.restore();
    });

    it("should set the correct inner html", function(){
        var expected = "Test button";
        var component = TestUtils.renderIntoDocument(<Button value={ expected } />);

        expect(component.getDOMNode().innerHTML).to.equal(expected);
    });

    it("should set the correct classes", function(){
        var expected = "btn btn-primary";
        var component = TestUtils.renderIntoDocument(<Button type="primary" />);

        expect(component.getDOMNode().className).to.equal(expected);
    });

    it("should set the correct classes with the default type if one is not provided", function(){
        var expected = "btn btn-default";
        var component = TestUtils.renderIntoDocument(<Button />);

        expect(component.getDOMNode().className).to.equal(expected);
    });

    it("when clicked should call the onClick passed in", function () {
        var onClick = this.sandbox.stub();
        var component = TestUtils.renderIntoDocument(<Button value="Test button" type="danger" onClick={ onClick } />);

        TestUtils.Simulate.click(component.getDOMNode());

        expect(onClick).to.have.been.calledWithExactly();
    });
});