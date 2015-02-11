describe('Task View suite', function() {
    var tasks;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['TaskView'],
            function (TaskView) {
                task = jasmine.createSpyObj('task', ['on', 'off', 'get']);

                taskView = new TaskView({ model: task });

                expect(taskView).toBeDefined();
                done();
            }
        );
    });

    it("test binding to model:change must call render", function(done) {
        require(
            ['TaskView', 'TaskModel'],
            function (TaskView, TaskModel) {
                var spy = spyOn(TaskView.prototype, "render");

                var task = new TaskModel();

                new TaskView({
                    model: task
                });

                task.set({name: 'XXX'});
                expect(spy).toHaveBeenCalled();
                done();
            }
        );
    });

});