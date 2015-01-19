describe('Board template suite', function() {

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['template/board'],
            function (boardTpl) {
                expect(boardTpl.length).toBeGreaterThan(0);
                done();
            }
        );
    });
});