define(
    'BoardController',
    ["backbone", "TasksCollection", 'template/board'],
    function(Backbone, TasksCollection, boardTpl) {
        'use strict';

        var BoardController = Backbone.View.extend({

            initialize: function() {
            },

            render: function() {
                var template = _.template(boardTpl);
                $('body').append(template());

                var tasks = new TasksCollection();
                tasks.fetch();
            }

        });

        return BoardController;
    }
);
