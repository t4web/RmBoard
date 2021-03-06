describe('Board suite', function() {
    var boardView;
    var tasks;
    var confirm;
    var columnsRealationsService;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['BoardView'],
            function (BoardView) {
                tasks = jasmine.createSpyObj('tasks', ['fetch', 'on', 'off']);
                confirm = jasmine.createSpyObj('confirm', ['render']);
                columnsRealationsService = jasmine.createSpyObj('columnsRealationsService', ['on', 'off']);

                boardView = new BoardView({
                    tasks: tasks,
                    confirm: confirm,
                    columnsRealationsService: columnsRealationsService
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
            app = jasmine.createSpyObj('app', ['getConfig']);
            confirm.render.and.returnValue(confirm);
            boardView.render();
        });

        it("tasks.fetch() will be called", function() {
            expect(tasks.fetch).toHaveBeenCalled();
        });

        it("confirm.render() will be called", function() {
            expect(confirm.render).toHaveBeenCalled();
        });

        it("el contain 7 columns", function() {
            expect($(boardView.el).find('#columns .col-md-2').length).toEqual(5);
            expect($(boardView.el).find('#columns .col-md-1').length).toEqual(2);
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
            expect($(boardView.el).find('#ready-for-prod')).toExist();
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