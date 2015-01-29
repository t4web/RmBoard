describe('Login template suite', function() {

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['template/login-form'],
            function (loginFormTpl) {
                expect(loginFormTpl.length).toBeGreaterThan(0);
                done();
            }
        );
    });
});