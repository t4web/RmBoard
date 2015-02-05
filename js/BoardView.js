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

                var _this = this;

                $("#ready-for-merge-test").sortable({
                    placeholder: "sort-highlight",
                    connectWith: "#in-test",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    start: function( event, ui ) {console.log('start');},
                    stop: function( event, ui ) {
                        var taskEl = ui.item;
                        var model = _this.tasks.get(taskEl.attr('id'));
                        _this.listenTo(model, 'change:name', _this.onChangeName);
                        model.mergedToTest();
                    }
                }).disableSelection();

                $("#in-test").sortable({
                    placeholder: "sort-highlight",
                    connectWith: "#ready-for-merge",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    start: function( event, ui ) {console.log('start');},
                    stop: function( event, ui ) {console.log('stop');}
                }).disableSelection();

                $("#ready-for-merge").sortable({
                    placeholder: "sort-highlight",
                    connectWith: "#in-prod",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999
                }).disableSelection();
            },

            onChangeName: function(model) {
                $('#' + model.get('id') + ' h3').text(model.get('name'));
            }

        });

        return BoardView;
    }
);
