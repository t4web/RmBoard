define(
    'BoardView',
    ["backbone", "lib/nprogress/nprogress", "template/board", "TasksView"],
    function(Backbone, NProgress, boardTpl, TasksView) {
        'use strict';

        var BoardView = Backbone.View.extend({

            tasks: null,
            className: 'wrapper row-offcanvas',
            columns: [],

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

                new TasksView({id: 'to-do', status: 1, tasks: this.tasks});
                new TasksView({id: 'in-progress', status: 2, tasks: this.tasks});
                new TasksView({id: 'ready-for-test', status: 3, tasks: this.tasks});
                new TasksView({id: 'in-test', status: 31, tasks: this.tasks});
                new TasksView({id: 'ready-for-prod', status: 32, tasks: this.tasks});
                new TasksView({id: 'in-prod', status: 33, tasks: this.tasks});
                new TasksView({id: 'done', status: 5, tasks: this.tasks});

                this.$el.html(template());

                this.trigger('render:complete');

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

                //$("#ready-for-merge-test").sortable({
                //    placeholder: "sort-highlight",
                //    connectWith: "#in-test",
                //    handle: ".box-header",
                //    forcePlaceholderSize: true,
                //    zIndex: 999999,
                //    start: function( event, ui ) {console.log('start');},
                //    stop: function( event, ui ) {
                //        var taskEl = ui.item;
                //        var model = _this.tasks.get(taskEl.attr('id'));
                //        model.mergedToTest();
                //    }
                //}).disableSelection();

                //$("#in-test").sortable({
                //    placeholder: "sort-highlight",
                //    connectWith: "#ready-for-merge",
                //    handle: ".box-header",
                //    forcePlaceholderSize: true,
                //    zIndex: 999999,
                //    start: function( event, ui ) {console.log('start');},
                //    stop: function( event, ui ) {console.log('stop');}
                //}).disableSelection();
                //
                //$("#ready-for-merge").sortable({
                //    placeholder: "sort-highlight",
                //    connectWith: "#in-prod",
                //    handle: ".box-header",
                //    forcePlaceholderSize: true,
                //    zIndex: 999999
                //}).disableSelection();
            }

        });

        return BoardView;
    }
);
