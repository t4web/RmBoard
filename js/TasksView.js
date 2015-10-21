define(
    'TasksView',
    ["backbone", "TaskView"],
    function(Backbone, TaskView) {
        'use strict';

        function sortByAssignee(task1, task2) {
            if (task1.get('assignee').id < task2.get('assignee').id) {
                return -1;
            } else if (task1.get('assignee').id > task2.get('assignee').id) {
                return 1;
            }
            return 0;
        }

        function sortByFeedbackFirst(task1, task2) {
            if (task1.isFeedback() > task2.isFeedback()) {
                return -1;
            } else if (task1.isFeedback() < task2.isFeedback())  {
                return 1;
            }
            return 0;
        }

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

                if (this.status == 1) {
                    tasks.sort(sortByFeedbackFirst);
                }
                if (this.status == 2) {
                    tasks.sort(sortByAssignee);
                }

                this.$el.html('');

                $('#' + this.id + '-count').text('(' + tasks.length + ')');

                _.each(tasks, function(task){
                    var view = new TaskView({ model: task });
                    this.$el.append(view.render().el);
                }, this);
            },

            getHeight: function() {
                return this.$el.height();
            }

        });

        return TasksView;
    }
);
