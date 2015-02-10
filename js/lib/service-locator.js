var ServiceLocator = {};
ServiceLocator.ServiceNotFoundException = function() {};

define(
    'ServiceLocator',
    ["underscore"],
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

            this.resolve = function(deps, callback, context){
                var promises = [];

                if (typeof callback !== 'function') {
                    throw new Error('Service locator: callback must be specified');
                }

                _.each(deps, function(value){

                    if (!config.hasOwnProperty(value)) {
                        throw new ServiceLocator.ServiceNotFoundException('Service locator was unable to fetch or create an instance for ' + value);
                    }

                    var constructor = config[value];

                    var promise = constructor(this);

                    promises.push(promise);

                }, this);

                if (promises.length > 0) {
                    $.when.apply($, promises).then(function(){
                        _.each(arguments, function(instance, key){
                            instances[deps[key]] = instance;
                        });

                        callbackApply(deps, callback, context);
                    });
                } else {
                    callbackApply(deps, callback, context);
                }

            };

            var callbackApply = function(deps, callback, context) {
                var callbackArguments = [];

                _.each(deps, function(value){
                    callbackArguments.push(instances[value]);
                });

                callback.apply(context, callbackArguments);
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
};
var IntermediateInheritor = function() {};
IntermediateInheritor.prototype = Error.prototype;
ServiceLocator.ServiceNotFoundException.prototype = new IntermediateInheritor();