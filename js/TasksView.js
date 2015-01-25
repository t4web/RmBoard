define(
    'TasksView',
    ["backbone"],
    function(Backbone) {
        'use strict';

        var TasksView = Backbone.View.extend({

            tasks: null,
            className: 'wrapper row-offcanvas',

            initialize: function(options) {
                this.tasks = options.tasks;
            },

            render: function() {
                var template = _.template(boardTpl);

                this.$el.html(template());

                this.refresh();

                return this;
            },

            refresh: function() {
                this.tasks.fetch();
            }

        });

        return TasksView;
    }
);
