define(
    'BoardView',
    ['backbone', 'lib/nprogress/nprogress', 'template/board'],
    function(Backbone, NProgress, boardTpl) {
        'use strict';

        var BoardView = Backbone.View.extend({

            tasks: null,
            className: 'wrapper row-offcanvas',

            events: {
                "click button#refresh-btn": "refresh"
            },

            initialize: function(options) {
                this.tasks = options.tasks;

                this.listenTo(this.tasks, 'fetch:before', this.startLoader);
                this.listenTo(this.tasks, 'fetch:success', this.stopLoader);
            },

            render: function() {
                var template = _.template(boardTpl);

                this.$el.html(template());

                this.refresh();

                return this;
            },

            refresh: function() {
                this.tasks.fetch();
            },

            startLoader: function() {
                $('button#refresh-btn').attr('disabled','disabled');
                NProgress.start();
            },

            stopLoader: function() {
                NProgress.done();
                $('button#refresh-btn').removeAttr('disabled');

                // http://api.jqueryui.com/sortable

                $("#in-test").sortable({
                    placeholder: "sort-highlight",
                    connectWith: "#ready-for-merge",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    stop: function( event, ui ) {console.log('stop');},
                    start: function( event, ui ) {console.log('start');}
                }).disableSelection();

                $("#ready-for-merge").sortable({
                    placeholder: "sort-highlight",
                    connectWith: "#in-prod",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999
                }).disableSelection();
            }

        });

        return BoardView;
    }
);
