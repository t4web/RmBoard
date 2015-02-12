describe('Columns Relations Service suite', function() {

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['ColumnsRelationsService'],
            function (ColumnsRelationsService) {
                expect(typeof ColumnsRelationsService == 'function').toBeTruthy();
                done();
            }
        );
    });
});