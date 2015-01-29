// Sets the require.js configuration for your application.
require.config({
    baseUrl: "/js",
    // 3rd party script alias names
    paths: {
        // Core Libraries
        "underscore": "lib/underscore.1.7.0.min",
        "backbone": "lib/backbone.1.1.2.min"
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "backbone": {
            "deps": [ "underscore" ],
            "exports": "Backbone"
        }

    }
});

define('jquery', function() { return jQuery; });