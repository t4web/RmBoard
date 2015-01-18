define(
    'TaskModel',
    ["backbone"],
    function (Backbone) {
        'use strict';

        var TaskModel = Backbone.Model.extend({
            defaults: {
                'id': null,
                'name': '',
                'assignee': '',
                'status': 'to-do'
            }
        });

        return TaskModel;
    }
);