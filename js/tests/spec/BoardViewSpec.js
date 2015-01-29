describe('Board suite', function() {
    var boardView;
    var tasks;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['BoardView'],
            function (BoardView) {
                tasks = jasmine.createSpyObj('tasks', ['fetch', 'on', 'off']);
                var tasksView = jasmine.createSpyObj('tasksView', ['listenTo', 'render']);

                boardView = new BoardView({
                    tasks: tasks,
                    tasksView: tasksView
                });
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

        it("tasks.fetch() will be called", function() {
            expect(tasks.fetch).toHaveBeenCalled();
        });

        it("el contain 6 columns", function() {
            expect($(boardView.el).find('#columns .col-md-2').length).toEqual(6);
        });

        it("'To do' column should exists", function() {
            expect($(boardView.el).find('#to-do')).toExist();
        });

        it("'In progress' column should exists", function() {
            expect($(boardView.el).find('#in-progress')).toExist();
        });

        it("'In Test' column should exists", function() {
            expect($(boardView.el).find('#in-test')).toExist();
        });

        it("'Ready for merge' column should exists", function() {
            expect($(boardView.el).find('#ready-for-merge')).toExist();
        });

        it("'In prod' column should exists", function() {
            expect($(boardView.el).find('#in-prod')).toExist();
        });

        it("'Done' column should exists", function() {
            expect($(boardView.el).find('#done')).toExist();
        });

        afterEach(function(){
            boardView.remove();
        });
    });

    describe('Refreshing', function() {

        beforeEach(function(){
            boardView.refresh();
        });

        it("tasks.fetch() will be called", function() {
            expect(tasks.fetch).toHaveBeenCalled();
        });

    });


});