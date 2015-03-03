describe('Task Model suite', function () {
    var TaskModel;

    beforeEach(function(){
        app.config = {};
        app.config.env = 'test';
        spyOn($, 'ajax').and.callFake(function() { return; });
    });

    // Use require.js to fetch the module
    it("should load the AMD module", function (done) {
        require(
            ['TaskModel'],
            function (TaskModelDefinition) {
                TaskModel = TaskModelDefinition;
                var task = new TaskModel();

                expect(task).toBeDefined();
                done();
            }
        );
    });

    it("mergedToTest() should add [In Test] to name, set status = 31 and remove other markers", function () {
        var task = new TaskModel({ status:1, name: 'bla-bla-bla [Ready for Prod]'});

        task.mergedToTest();

        expect(task.get('status')).toEqual(31);
        expect(task.get('name')).toMatch("[In Test]");
        expect(task.get('name')).not.toMatch("Ready for Prod");
        expect(task.get('name')).not.toMatch("In Prod");
    });

    it("inProgress() should set status 2 and remove other markers", function () {
        var task = new TaskModel({ status:1, name: 'bla-bla-bla [Ready for Prod]'});

        task.inProgress();

        expect(task.get('status')).toEqual(2);
        expect(task.get('name')).not.toMatch("In Test");
        expect(task.get('name')).not.toMatch("Ready for Prod");
        expect(task.get('name')).not.toMatch("In Prod");
    });

    it("readyForTest() should set status 3 and remove other markers", function () {
        var task = new TaskModel({ status:1, name: 'bla-bla-bla [Ready for Prod]'});

        task.readyForTest();

        expect(task.get('status')).toEqual(3);
        expect(task.get('name')).not.toMatch("In Test");
        expect(task.get('name')).not.toMatch("Ready for Prod");
        expect(task.get('name')).not.toMatch("In Prod");
    });

    it("setAsNew() should set status 1 and remove other markers", function () {
        var task = new TaskModel({ status:2, name: 'bla-bla-bla [Ready for Prod]'});

        task.setAsNew();

        expect(task.get('status')).toEqual(1);
        expect(task.get('name')).not.toMatch("In Test");
        expect(task.get('name')).not.toMatch("Ready for Prod");
        expect(task.get('name')).not.toMatch("In Prod");
    });

    it("readyForProduction() add [Ready for Prod] to name, set status = 32 and remove other markers", function () {
        var task = new TaskModel({ status:2, name: 'bla-bla-bla [In Test]'});

        task.readyForProduction();

        expect(task.get('status')).toEqual(32);
        expect(task.get('name')).not.toMatch("In Test");
        expect(task.get('name')).toMatch("Ready for Prod");
        expect(task.get('name')).not.toMatch("In Prod");
    });

    it("inProduction() add [Ready for Prod] to name, set status = 32 and remove other markers", function () {
        var task = new TaskModel({ status:2, name: 'bla-bla-bla [In Prod]'});

        task.inProduction();

        expect(task.get('status')).toEqual(33);
        expect(task.get('name')).not.toMatch("In Test");
        expect(task.get('name')).not.toMatch("Ready for Prod");
        expect(task.get('name')).toMatch("In Prod");
    });

    it("done() set status = 5 and remove other markers", function () {
        var task = new TaskModel({ status:2, name: 'bla-bla-bla [In Prod]'});

        task.done();

        expect(task.get('status')).toEqual(5);
        expect(task.get('name')).not.toMatch("In Test");
        expect(task.get('name')).not.toMatch("Ready for Prod");
        expect(task.get('name')).not.toMatch("In Prod");
    });

});