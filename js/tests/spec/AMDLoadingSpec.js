describe('AMD loading', function() {

    // Use require.js to fetch the module
    it("BoardView should load", function(done) {
        require(
            ['BoardView'],
            function (BoardView) {
                tasks = jasmine.createSpyObj('tasks', ['fetch']);

                boardView = new BoardView({'tasks': tasks});
                expect(boardView).toBeDefined();
                done();
            }
        );
    });

    it("TasksCollection should load", function(done) {
        require(
            ['TasksCollection'],
            function (TasksCollection) {
                loaded = new TasksCollection();
                expect(loaded).toBeDefined();
                done();
            }
        );
    });
});