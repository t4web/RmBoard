describe('Board suite', function() {
    var boardView;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['BoardView'],
            function (BoardView) {
                boardView = new BoardView();
                expect(boardView).toBeDefined();
                done();
            }
        );
    });

    it("el must be <div class='wrapper row-offcanvas'>", function() {
        expect(boardView.el.tagName.toLowerCase()).toBe('div');
        expect(boardView.className).toBe('wrapper row-offcanvas');
    });

    describe('Rendering', function() {
        beforeEach(function(){
            boardView.render();
        });

        it("el contain 6 columns", function() {
            expect($(boardView.el).find('to-do-column')).toBe('div');
        });

        afterEach(function(){
            boardView.remove();
        });
    });
});