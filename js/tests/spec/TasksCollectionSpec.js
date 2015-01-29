describe('Tasks Collection suite', function () {
    var tasks;

    // Use require.js to fetch the module
    it("should load the AMD module", function (done) {
        require(
            ['TasksCollection'],
            function (TasksCollection) {
                tasks = new TasksCollection();
                expect(tasks).toBeDefined();
                done();
            }
        );
    });

    it("parse should return the array of model attributes", function () {
        var parsedData;
        var response =
            '{' +
                '"total_count":1457,' +
                '"limit":25,' +
                '"issues":' +
                '[' +
                    '{' +
                        '"status":' +
                        '{' +
                            '"name":"\u041d\u043e\u0432\u0430\u044f",' +
                            '"id":1' +
                        '},' +
                        '"tracker":' +
                        '{' +
                            '"name":"\u041e\u0448\u0438\u0431\u043a\u0430",' +
                            '"id":1' +
                        '},' +
                        '"updated_on":"2015/01/26 17:17:07 +0200",' +
                        '"description":"",' +
                        '"subject":"subject 1",' +
                        '"assigned_to":' +
                        '{' +
                            '"name":"Mickey",' +
                            '"id":14' +
                        '},' +
                        '"start_date":"2015/01/26",' +
                        '"author":' +
                        '{' +
                            '"name":"Donald",' +
                            '"id":19' +
                        '},' +
                        '"done_ratio":0,' +
                        '"project":' +
                        '{' +
                            '"name":"Project name",' +
                            '"id":3' +
                        '},' +
                        '"created_on":"2015/01/26 17:15:14 +0200",' +
                        '"id":5457,' +
                        '"parent":' +
                        '{' +
                            '"id":5444' +
                        '},' +
                        '"priority":' +
                        '{' +
                            '"name":"\u041d\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u044b\u0439",' +
                            '"id":4' +
                        '}' +
                    '}' +
            '],' +
            '"offset":0' +
        '}';

        parsedData = tasks.parse(JSON.parse(response));

        expect(parsedData).toEqual([
            {
                id: 5457,
                name: 'subject 1',
                assignee: 'Mickey',
                status: 1
            }
        ]);
    });

    it("fetch should trigger 'success' event", function () {
        var handler = jasmine.createSpy('event');
        tasks.on('fetch:success', handler);

        spyOn(Backbone, 'sync').and.callFake(function(method, collection, options) {
            options.success({"total_count":1459,"limit":25,"issues":[{"id":123,"subject":"subject","assigned_to":{"name":"name"},"status":{"id":1}}],"offset":0});
        });

        tasks.fetch();

        expect(handler).toHaveBeenCalledWith(tasks);
    });

    it("fetch should trigger 'error' event", function () {
        var handler = jasmine.createSpy('event');
        tasks.on('fetch:error', handler);

        spyOn(Backbone, 'sync').and.callFake(function(method, collection, options) {
            options.error({"mssage":"some reason"});
        });

        tasks.fetch();

        expect(handler).toHaveBeenCalledWith(tasks);
    });

    it("fetch should trigger 'empty-issues' event", function () {
        var handler = jasmine.createSpy('event');
        tasks.on('empty-issues', handler);

        spyOn(Backbone, 'sync').and.callFake(function(method, collection, options) {
            options.success({"total_count":1459,"limit":25,"issues":[],"offset":0});
        });

        tasks.fetch();

        expect(handler).toHaveBeenCalledWith();
    });

});