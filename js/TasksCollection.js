define(
    'TasksCollection',
    ["backbone", "TaskModel"],
    function (Backbone, TaskModel) {
        'use strict';

        var TasksCollection = Backbone.Collection.extend({
            model: TaskModel,
            url: '/index.php?resource=/issues.json',

            parse: function(response, options) {
                var rawTasks = [];

                if (response.issues.length == 0) {
                    this.trigger('empty-issues');
                    return rawTasks;
                }

                _.each(response.issues, function(value){
                    rawTasks.push({
                        id: value.id,
                        name: value.subject,
                        assignee: value.assigned_to.name,
                        status: value.status.id
                    });
                });

                return rawTasks;
            },

            fetch: function() {
                this.trigger('fetch:before');

                Backbone.Collection.prototype.fetch.call(
                    this,
                    {
                        success: this.onSuccess,
                        error: this.onError
                    }
                );
            },

            onSuccess: function(collection, response, options) {
                collection.trigger('fetch:success', collection);
            },

            onError: function(collection, response, options) {
                collection.trigger('fetch:error', collection);
            }
        });

        return TasksCollection;
    }
);