define(
    'BoardView',
    ['backbone', 'template/board'],
    function(Backbone, boardTpl) {
        'use strict';

        var BoardView = Backbone.View.extend({

            tasks: null,
            tasksView: null,
            className: 'wrapper row-offcanvas',

            initialize: function(options) {
                this.tasks = options.tasks;
                this.tasksView = options.tasksView;

                this.tasksView.listenTo(this.tasks, 'fetch:success', this.tasksView.render);
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

        return BoardView;
    }
);
