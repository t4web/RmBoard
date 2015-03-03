define(
    'TaskView',
    ["backbone", "template/task"],
    function(Backbone, taskTpl) {
        'use strict';

        var TaskView = Backbone.View.extend({

            template: _.template(taskTpl),

            attributes : function () {
                return {
                    class : 'box box-solid',
                    id : this.model.get( 'id' )
                };
            },

            initialize: function() {
                this.listenTo(this.model, 'change', this.render);
            },

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                this.$el.addClass(this.model.get( 'colorClass' ))
                return this;
            }

        });

        return TaskView;
    }
);
