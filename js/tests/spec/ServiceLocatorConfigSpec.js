describe('Service locator config suite', function() {

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['ServiceLocatorConfig'],
            function (slConfig) {
                expect(slConfig instanceof Object).toBeTruthy();
                done();
            }
        );
    });

    it("should resolve Status/StatusCollection", function(done) {
        require(
            ['ServiceLocator', 'ServiceLocatorConfig', 'Status/StatusCollection'],
            function (ServiceLocator, slConfig, StatusCollection) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(statusCollection) {
                        expect(statusCollection instanceof StatusCollection).toBeTruthy();
                        expect(statusCollection.length).toEqual(7);
                        done();
                    }
                };

                serviceLocator.resolve(["Status/StatusCollection"], app.run, app);
            }
        );

    });

    it("should resolve Assignee/Collection", function(done) {
        require(
            ['ServiceLocator', 'ServiceLocatorConfig', 'backbone'],
            function (ServiceLocator, slConfig, Backbone) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(assignees) {
                        expect(assignees instanceof Backbone.Collection).toBeTruthy();
                        expect(assignees.length).toEqual(4);
                        done();
                    }
                };

                serviceLocator.resolve(["Assignee/Collection"], app.run, app);
            }
        );

    });

    it("should resolve Status/Factory", function(done) {
        require(
            ['ServiceLocator', 'ServiceLocatorConfig', 'Status/Factory'],
            function (ServiceLocator, slConfig, StatusFactory) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(statusFactory) {
                        expect(statusFactory instanceof StatusFactory).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["Status/Factory"], app.run, app);
            }
        );

    });

    it("should resolve TasksCollection", function(done) {
        require(
            ['ServiceLocator', 'ServiceLocatorConfig', 'TasksCollection', 'backbone', 'Status/Factory'],
            function (ServiceLocator, slConfig, TasksCollection, Backbone, StatusFactory) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(tasks) {
                        expect(tasks instanceof TasksCollection).toBeTruthy();
                        expect(tasks.assignees instanceof Backbone.Collection).toBeTruthy();
                        expect(tasks.statusFactory instanceof StatusFactory).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["TasksCollection"], app.run, app);
            }
        );

    });

    it("should resolve BoardView", function(done) {
        require(
            ['ServiceLocator', 'ServiceLocatorConfig', 'BoardView', 'TasksCollection'],
            function (ServiceLocator, slConfig, BoardView, TasksCollection) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(board) {
                        expect(board instanceof BoardView).toBeTruthy();
                        expect(board.tasks instanceof TasksCollection).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["BoardView"], app.run, app);
            }
        );
    });

    it("should resolve LoginView", function(done) {
        require(
            ['ServiceLocator', 'ServiceLocatorConfig', 'LoginView', 'TasksCollection'],
            function (ServiceLocator, slConfig, LoginView, TasksCollection) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(login) {
                        expect(login instanceof LoginView).toBeTruthy();
                        expect(login.tasks instanceof TasksCollection).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["LoginView"], app.run, app);
            }
        );
    });

    it("should resolve ColumnsRelationsService", function(done) {
        require(
            ['ServiceLocator', 'ServiceLocatorConfig', 'ColumnsRelationsService'],
            function (ServiceLocator, slConfig, ColumnsRelationsService) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(service) {
                        expect(service instanceof ColumnsRelationsService).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["ColumnsRelationsService"], app.run, app);
            }
        );
    });

    it("should return same instance and callback should not call twice", function(done) {
        require(
            ['ServiceLocator', 'ServiceLocatorConfig'],
            function (ServiceLocator, slConfig) {

                var serviceLocator = new ServiceLocator(slConfig);

                var calledTimes = 0;

                var app = {
                    run: function(login, tasks) {
                        calledTimes++;
                        expect(login.tasks == tasks).toBeTruthy();
                        expect(calledTimes).toEqual(1);
                        done();
                    }
                };

                serviceLocator.resolve(["LoginView", "TasksCollection"], app.run, app);
            }
        );

    });
});