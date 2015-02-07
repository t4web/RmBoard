describe('Status/StatusModel suite', function() {
    var status;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['Status/StatusModel'],
            function (StatusModel) {
                status = new StatusModel();
                expect(status).toBeDefined();
                done();
            }
        );
    });

});