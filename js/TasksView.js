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

                this.listenTo(this.tasks, 'fetch:success', this.render);
            },

            render: function() {

                this.$el = $('#' + this.id);
                
                var tasks = this.tasks.where({status: this.status});

                var template = _.template(taskTpl);

                this.$el.html('');

                _.each(tasks, function(task){
                    this.$el.append(template(task.toJSON()));
                }, this);
            }

        });

        return TasksView;
    }
);
