define(
    'Status/StatusCollection',
    ["backbone", "Status/StatusModel"],
    function (Backbone, StatusModel) {
        'use strict';

        var StatusCollection = Backbone.Collection.extend({
            model: StatusModel
        });

        return StatusCollection;
    }
);