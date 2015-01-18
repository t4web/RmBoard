// Sets the require.js configuration for your application.
require.config({
    baseUrl: "/js",
    // 3rd party script alias names
    paths: {
        // Core Libraries
        "jquery": "lib/jquery.2.0.2.min",
        "underscore": "lib/underscore.1.7.0.min",
        "backbone": "lib/backbone.1.1.2.min"
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "backbone": {
            "deps": [ "underscore", "jquery" ],
            "exports": "Backbone"
        }

    }
});