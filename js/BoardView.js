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
