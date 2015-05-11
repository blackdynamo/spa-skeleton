"use strict";

var proxyquire = require("proxyquire");

describe("pages.root", function () {
    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        resetDom();
        this.sandbox.restore();
    });

    it("should create a test button", function () {
        var components = {
            Button: createStubReactComponent()
        };

        this.sandbox.spy(components, "Button");

        var Component = proxyquire("app/pages/_root.jsx", {"app/components": components});
        var component = TestUtils.renderIntoDocument(<Component />);

        expect(components.Button).to.have.been.calledWith({value: "Test Button", type: "primary", onClick: component.onClick});
    });

    describe(".onClick", function () {
        it("should alert that the button was clicked", function () {
            global.alert = this.sandbox.stub();

            var Component = require("app/pages/_root.jsx");
            var component = TestUtils.renderIntoDocument(<Component />);

            component.onClick();

            expect(global.alert).to.have.been.calledWithExactly("You clicked the test button!");
        });

    });
});