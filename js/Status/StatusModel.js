define(
    'Status/StatusModel',
    ["backbone"],
    function (Backbone) {
        'use strict';

        var StatusModel = Backbone.Model.extend({
            defaults: {
                id: null,
                name: null
            }
        });

        return StatusModel;
    }
);