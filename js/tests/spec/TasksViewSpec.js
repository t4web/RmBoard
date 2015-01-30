describe('Tasks View suite', function() {
    var loginView;
    var tasks;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['TasksView'],
            function (TasksView) {
                tasks = jasmine.createSpyObj('tasks', ['fetch', 'on', 'off']);

                tasksView = new TasksView({
                    status: 'to-do',
                    tasks: tasks
                });

                expect(tasksView).toBeDefined();
                done();
            }
        );
    });

    it("test binding to fetch:success:STATUS must call render", function(done) {
        require(
            ['TasksView', 'TasksCollection'],
            function (TasksView, TasksCollection) {
                var spyOnRender = spyOn(TasksView.prototype, "render");

                var tasks = new TasksCollection();

                new TasksView({
                    status: 'XXX',
                    tasks: tasks
                });

                tasks.trigger("fetch:success:XXX");
                expect(spyOnRender).toHaveBeenCalled();
                done();
            }
        );
    });

});