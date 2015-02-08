describe('ServiceLocator suite', function() {
    var serviceLocator;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['ServiceLocator'],
            function (ServiceLocator) {
                var config = {
                    'Service1': function(sl) {
                        return {};
                    },
                    'Service2': function(sl) {
                        return {};
                    }
                };
                serviceLocator = new ServiceLocator(config);
                expect(serviceLocator).toBeDefined();
                done();
            }
        );
    });

    it("get() should throws Exception on unregistered service", function() {
        expect(function() {
            serviceLocator.get('SomeService');
        }).toThrowError("Service locator was unable to fetch or create an instance for SomeService");
    });

    it("get() should throws ServiceLocator.ServiceNotFoundException on unregistered service", function() {
        try {
            serviceLocator.get('SomeService');
        } catch (e) {
            expect(e instanceof ServiceLocator.ServiceNotFoundException).toBeTruthy();
        }
    });

    it("get() should instance registered service", function(done) {
        require(
            ['ServiceLocator'],
            function (ServiceLocator) {

                var serviceLocator;

                var Service1 = function() {
                    this.bar = function(){};
                    this.baz = function(){};
                };

                var Service2 = function() {
                    this.foo = function(){};
                    this.zoo = function(){};
                };

                var config = {
                    'Service1': function(sl) {
                        return new Service1();
                    },
                    'Service2': function(sl) {
                        return new Service2();
                    }
                };
                serviceLocator = new ServiceLocator(config);

                var service1 = serviceLocator.get('Service1');
                var service2 = serviceLocator.get('Service2');

                expect(service1).toBeDefined();
                expect(service2).toBeDefined();

                expect(service1 instanceof Service1).toBeTruthy();
                expect(service2 instanceof Service2).toBeTruthy();
                done();
            }
        );

    });

    it("get() should instance registered service with resolved dependencies", function(done) {
        require(
            ['ServiceLocator'],
            function (ServiceLocator) {

                var serviceLocator2;

                var Service1 = function() {
                    this.bar = function(){};
                    this.baz = function(){};
                };

                var Service2 = function(dependencyService1) {
                    this.foo = function(){
                        dependencyService1.bar();
                    };
                    this.zoo = function(){
                        dependencyService1.baz();
                    };
                    this.getService1 = function(){
                        return dependencyService1;
                    };
                };

                var config = {
                    'Service1': function(sl) {
                        return new Service1();
                    },
                    'Service2': function(sl) {
                        return new Service2(sl.get('Service1'));
                    }
                };
                serviceLocator2 = new ServiceLocator(config);

                var service1 = serviceLocator2.get('Service1');
                var service2 = serviceLocator2.get('Service2');


                expect(service1).toBeDefined();
                expect(service2).toBeDefined();

                expect(service1 instanceof Service1).toBeTruthy();
                expect(service2 instanceof Service2).toBeTruthy();

                expect(service2.getService1() instanceof Service1).toBeTruthy();
                expect(service2.getService1()).toBe(service1);
                done();
            }
        );

    });

});