define(
    'TasksCollection',
    ["backbone", "TaskModel"],
    function (Backbone, TaskModel) {
        'use strict';

        var TasksCollection = Backbone.Collection.extend({
            model: TaskModel,
            url: '/index.php?resource=/issues.json?limit=100',
            statusFactory: null,
            assignees: null,

            initialize: function(models, options) {
                this.statusFactory = options.statusFactory;
                this.assignees = options.assignees;
            },

            parse: function(response) {
                var rawTasks = [];

                if (response.issues.length == 0) {
                    this.trigger('empty-issues');
                    return rawTasks;
                }

                _.each(response.issues, function(value){

                    var colorClass = '';

                    switch (value.tracker.id) {
                        case 1:
                            colorClass = 'bg-red';
                            break;
                        case 2:
                            colorClass = 'bg-aqua';
                            break;
                        case 3:
                            colorClass = 'bg-yellow';
                            break;
                        case 4:
                            colorClass = 'bg-green';
                            break;
                        default:
                            colorClass = 'bg-green';
                    }

                    if (!value.hasOwnProperty('assigned_to')) {
                        return;
                    }

                    var status = this.statusFactory.create(value.status.id, value.subject);
                    var assignee = this.assignees.get(value.assigned_to.id);

                    if (typeof(assignee) == "undefined") {
                        return;
                    }

                    rawTasks.push({
                        id: value.id,
                        name: value.subject,
                        assignee: assignee.toJSON(),
                        status: status.get('id'),
                        type: value.tracker.id,
                        colorClass: colorClass
                    });
                }, this);

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