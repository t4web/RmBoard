var ServiceLocator = {};
ServiceLocator.ServiceNotFoundException = function() {};

define(
    'ServiceLocator',
    [],
    function () {
        'use strict';

        /**
         * @param object config
         * var config =
         * {
         *      'Service1': function(serviceLocator) {
         *          return new Service1();
         *      },
         *      'Service2': function(serviceLocator) {
         *          return new Service2(serviceLocator.get('Service1'));
         *      },
         * }
         * @throws ServiceLocator.ServiceNotFoundException
         */
        return function(config) {
            var instances = {};

            if (typeof config == 'undefined') {
                throw Error('Service locator: config must be specified');
            }

            this.has = function(name) {

            };

            this.get = function(name) {
                if (instances.hasOwnProperty(name)) {
                    return instances[name];
                }

                if (!config.hasOwnProperty(name)) {
                    throw new ServiceLocator.ServiceNotFoundException('Service locator was unable to fetch or create an instance for ' + name);
                }

                var constructor = config[name];

                instances[name] = new constructor(this);

                return instances[name];
            };
        };
    }
);

ServiceLocator.ServiceNotFoundException = function () {
    var tmp = Error.apply(this, arguments);
    tmp.name = this.name = 'ServiceNotFoundException';

    this.message = tmp.message;
    Object.defineProperty(this, 'stack', { // getter for more optimizy goodness
        get: function() {
            return tmp.stack
        }
    });

    return this;
}
var IntermediateInheritor = function() {};
IntermediateInheritor.prototype = Error.prototype;
ServiceLocator.ServiceNotFoundException.prototype = new IntermediateInheritor();