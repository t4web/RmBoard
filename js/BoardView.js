define(
    'BoardView',
    ["backbone", "TasksCollection"],
    function(Backbone, TasksCollection) {
        'use strict';

        var BoardView = Backbone.View.extend({

            initialize: function() {
            },

            render: function() {
                var tasks = new TasksCollection();
                tasks.fetch();
            }

        });

        return BoardView;
    }
);
