define(
    'BoardView',
    ["backbone", "TasksCollection", 'template/board'],
    function(Backbone, TasksCollection, boardTpl) {
        'use strict';

        var BoardView = Backbone.View.extend({

            className: 'wrapper row-offcanvas',

            initialize: function() {
            },

            render: function() {
                var template = _.template(boardTpl);

                this.$el.html(template());

                return this;
                //var tasks = new TasksCollection();
                //tasks.fetch();
            }

        });

        return BoardView;
    }
);
