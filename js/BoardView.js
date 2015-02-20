define(
    'BoardView',
    ["backbone", "lib/nprogress/nprogress", "template/board", "TasksView", "template/confirm"],
    function(Backbone, NProgress, boardTpl, TasksView, confirmTpl) {
        'use strict';

        return Backbone.View.extend({

            tasks: null,
            confirm: null,
            className: 'wrapper row-offcanvas',
            columns: {},
            t: null,
            t2: null,

            events: {
                "click button#refresh-btn": "refresh",
                "click a#deploy-all-on-test": "deployOnTest"
            },

            initialize: function(options) {
                this.tasks = options.tasks;
                this.confirm = options.confirm;

                this.listenTo(this.tasks, 'fetch:before', this.startLoader);
                this.listenTo(this.tasks, 'fetch:success', this.stopLoader);
            },

            render: function() {
                var template = _.template(boardTpl);

                this.columns['to-do'] = new TasksView({id: 'to-do', status: 1, tasks: this.tasks});
                this.columns['in-progress'] = new TasksView({id: 'in-progress', status: 2, tasks: this.tasks});
                this.columns['ready-for-test'] = new TasksView({id: 'ready-for-test', status: 3, tasks: this.tasks});
                this.columns['in-test'] = new TasksView({id: 'in-test', status: 31, tasks: this.tasks});
                this.columns['ready-for-prod'] = new TasksView({id: 'ready-for-prod', status: 32, tasks: this.tasks});
                this.columns['in-prod'] = new TasksView({id: 'in-prod', status: 33, tasks: this.tasks});
                this.columns['done'] = new TasksView({id: 'done', status: 5, tasks: this.tasks});

                this.$el.html(template());

                $('body').append(this.confirm.render().el);

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

                var _this = this;
                setTimeout(function() {
                    var maxHeight = _this.columns['to-do'].getHeight();
                    _.each(_this.columns, function (view, id) {
                        if (maxHeight < view.getHeight()) {
                            maxHeight = view.getHeight();
                        }
                    });
                    console.log(maxHeight);
                    _.each(_this.columns, function (view, id) {
                        view.$el.height(maxHeight);
                    });
                }, 1000);
            },

            progressLoader: function(percent) {
                NProgress.set(percent);
            },

            deployOnTest: function() {

                this.confirm.show({
                    message: "You sure to move all tasks to test?",
                    acceptBtnText: "Yes, move all",
                    dismissBtnText: "No",
                    acceptCallback: $.proxy( this.deploy, this )
                });
            },

            deploy: function() {
                this.startLoader();
                
                var progressStep = 100 / $('#ready-for-test>div').size();

                var _this = this;
                $('#ready-for-test>div').each(function(){
                    var model = _this.tasks.get($(this).attr('id'));

                    model.mergedToTest();

                    _this.progressLoader(progressStep);
                });

                this.columns['ready-for-test'].render();
                this.columns['in-test'].render();

                this.stopLoader();
            }

        });
    }
);
