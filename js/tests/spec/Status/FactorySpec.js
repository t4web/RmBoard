describe('Status/Factory suite', function() {
    var factory;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['Status/Factory', 'ServiceLocator', 'ServiceLocatorConfig'],
            function (Factory, ServiceLocator, slConfig) {
                expect(typeof Factory == 'function').toBeTruthy();

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(resolvedStatusFactory) {
                        factory = resolvedStatusFactory;
                        done();
                    }
                };

                serviceLocator.resolve(["Status/Factory"], app.run, app);
            }
        );
    });

    it("create should return status object [To do] if externalStatus = any, and taskName any", function() {
        var status = factory.create(111, 'bla-bla bla');

        expect(status.toJSON()).toEqual({id: 1, name: "To do"});
    });

    it("create should return status object [To do] if externalStatus = 1", function() {
        var status = factory.create(1, 'bla-bla bla');

        expect(status.toJSON()).toEqual({id: 1, name: "To do"});
    });

    it("create should return status object [In progress] if externalStatus = 2", function() {
        var status = factory.create(2, 'bla-bla bla');

        expect(status.toJSON()).toEqual({id: 2, name: "In progress"});
    });

    it("create should return status object [Ready fo test] if externalStatus = 3", function() {
        var status = factory.create(3, 'bla-bla bla');

        expect(status.toJSON()).toEqual({id: 3, name: "Ready fo test"});
    });

    it("create should return status object [Done] if externalStatus = 5", function() {
        var status = factory.create(5, 'bla-bla bla');

        expect(status.toJSON()).toEqual({id: 5, name: "Done"});
    });

    it("create should return status object [In Test] if taskName contain '[In Test]'", function() {
        var status = factory.create(1, 'bla-bla bla [In Test]');

        expect(status.toJSON()).toEqual({id: 31, name: "In Test"});
    });

    it("create should return status object [Ready for prod] if taskName contain '[Ready for prod]'", function() {
        var status = factory.create(1, 'bla-bla bla [Ready for prod]');

        expect(status.toJSON()).toEqual({id: 32, name: "Ready for prod"});
    });

    it("create should return status object [In prod] if taskName contain '[In prod]'", function() {
        var status = factory.create(1, 'bla-bla bla [In prod]');

        expect(status.toJSON()).toEqual({id: 33, name: "In prod"});
    });
});