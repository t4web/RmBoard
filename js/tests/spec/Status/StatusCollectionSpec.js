describe('Status/StatusCollection suite', function() {
    var statuses;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['Status/StatusCollection'],
            function (StatusCollection) {
                statuses = new StatusCollection();
                expect(statuses).toBeDefined();
                done();
            }
        );
    });

});