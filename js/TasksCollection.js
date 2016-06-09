define(
    'TasksCollection',
    ["backbone", "TaskModel"],
    function (Backbone, TaskModel) {
        'use strict';

        var offset = 0;

        function _fetch(collection, append) {

            collection.url = '/index.php?resource=/issues.json?limit=100ANDsort=updated_on:descANDoffset=' + offset;
            if (app.getConfig('project-id')) {
                collection.url += 'ANDproject_id=' + app.getConfig('project-id');
            }

            Backbone.Collection.prototype.fetch.call(
                collection,
                {
                    success: collection.onSuccess,
                    error: collection.onError,
                    remove: append ? false : true
                }
            );
        }

        var TasksCollection = Backbone.Collection.extend({
            model: TaskModel,
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

                    if (value.status.id == 4) {
                        colorClass += ' task-feedback';
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

                offset = 0;
                _fetch(this, true);
            },

            onSuccess: function(collection, response, options) {
                collection.trigger('fetch:success', collection);
                if (offset == 500) {
                    collection.trigger('fetch:success:end');
                    return;
                }

                offset += 100;
                _fetch(collection, true);
            },

            onError: function(collection, response, options) {
                collection.trigger('fetch:error', collection);
            }
        });

        return TasksCollection;
    }
);