define(
    'TasksView',
    ["backbone", "template/task"],
    function(Backbone, taskTpl) {
        'use strict';

        var TasksView = Backbone.View.extend({

            tasks: null,
            status: null,

            initialize: function(options) {
                this.status = options.status;
                this.tasks = options.tasks;

                //this.id = this.status;

                this.listenTo(this.tasks, 'fetch:success', this.render);
            },

            render: function() {
                
                var tasks = this.tasks.where({status: this.status});

                var template = _.template(taskTpl);

                $('#to-do').html('');

                _.each(tasks, function(task){
                    $('#to-do').append(template(task.toJSON()));
                });
            }

        });

        return TasksView;
    }
);
