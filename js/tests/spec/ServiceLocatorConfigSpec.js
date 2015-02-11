describe('Service locator config suite', function() {

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['ServiceLocatorConfig'],
            function (slConfig) {
                expect(slConfig instanceof Object).toBeTruthy();
                done();
            }
        );
    });
});