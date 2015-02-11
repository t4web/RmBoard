define(
    'TasksView',
    ["backbone", "TaskView"],
    function(Backbone, TaskView) {
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

                this.$el.html('');

                _.each(tasks, function(task){
                    var view = new TaskView({ model: task });
                    this.$el.append(view.render().el);
                }, this);
            }

        });

        return TasksView;
    }
);
