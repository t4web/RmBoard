describe('Router suite', function() {
    var router;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['Router'],
            function (Router) {
                router = new Router();
                expect(router).toBeDefined();
                done();
            }
        );
    });

    //run tests that use the myModule object
    it("can access the AMD module", function() {

        expect(router.routes).toEqual({'':'home'});
    });
});