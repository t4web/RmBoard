define(
    'TaskModel',
    ["backbone"],
    function (Backbone) {
        'use strict';

        var TaskModel = Backbone.Model.extend({
            defaults: {
                id: null,
                name: '',
                assignee: '',
                status: 1,
                type: 1,
                colorClass: 'bg-green'
            }
        });

        return TaskModel;
    }
);