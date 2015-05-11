"use strict";

var proxyquire = require("proxyquire");

describe("pages.root", function () {
    var Root;

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();

        var components = {
            Button: "fakebutton"
        };

        Root = proxyquire("app/pages/_root.jsx", {"app/components": components});
    });

    afterEach(function () {
        resetDom();
        this.sandbox.restore();
    });

    it("should do something", function () {
        var component = TestUtils.renderIntoDocument(<Root />);

        expect(true).to.equal(true);
    });
});