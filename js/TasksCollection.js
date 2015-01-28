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
                var _this = this;
                Backbone.Collection.prototype.fetch.call(
                    this,
                    {
                        success: function(collection, response, options) {
                            _this.trigger('fetch:success');
                        },
                        error: function(collection, response, options) {
                            _this.trigger('fetch:error');
                        }
                    }
                );
            }
        });

        return TasksCollection;
    }
);