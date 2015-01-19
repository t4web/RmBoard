describe('Board suite', function() {
    var boardController;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['BoardController'],
            function (BoardController) {
                boardController = new BoardController();
                expect(boardController).toBeDefined();
                done();
            }
        );
    });

    //run tests that use the myModule object
    //it("can access the AMD module", function() {
    //    expect(router.routes).toEqual(
    //        {'':'home'}
    //    );
    //});
});