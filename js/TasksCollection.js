define(
    'TasksCollection',
    ["backbone", "TaskModel"],
    function (Backbone, TaskModel) {
        'use strict';

        var TasksCollection = Backbone.Collection.extend({
            model: TaskModel,
            url: '/index.php?resource=/issues.json'
        });

        return TasksCollection;
    }
);