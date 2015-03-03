define(
    'ColumnsRelationsService',
    ["backbone", "TasksCollection"],
    function (Backbone, TasksCollection) {
        'use strict';

        return function (tasks) {

            var events = _.extend({}, Backbone.Events);

            this.on = function(event, callback, context) {
                events.on(event, callback, context);
            };

            this.off = function(event, callback, context) {
                events.off(event, callback, context);
            };

            if (!(tasks instanceof TasksCollection)) {
                throw new Error("Tasks must be instance of TasksCollection.");
            }

            tasks.on('fetch:success', init, this);

            function init () {

                applySortable("#to-do", "#in-progress", function( event, ui ) {
                    var taskEl = ui.item;
                    var model = tasks.get(taskEl.attr('id'));
                    var fromStatus = model.get('status');

                    model.inProgress();
                    events.trigger('move', { from: fromStatus, to: model.get('status') });
                    $('#in-progress').removeClass('highlight');
                });

                applySortable("#in-progress", ".from-in-progress", function( event, ui ) {
                    var taskEl = ui.item;
                    var model = tasks.get(taskEl.attr('id'));
                    var newStatus = $(taskEl).parent().attr('id');
                    var fromStatus = model.get('status');

                    if (newStatus == 'ready-for-test') {
                        model.readyForTest();
                    } else if (newStatus == 'to-do') {
                        model.setAsNew();
                    }

                    events.trigger('move', { from: fromStatus, to: model.get('status') });
                    $('.from-in-progress').removeClass('highlight');
                });

                applySortable("#ready-for-test", "#in-test", function( event, ui ) {
                    var taskEl = ui.item;
                    var model = tasks.get(taskEl.attr('id'));
                    var fromStatus = model.get('status');

                    model.mergedToTest();
                    events.trigger('move', { from: fromStatus, to: model.get('status') });
                    $('#in-test').removeClass('highlight');
                });

                applySortable("#in-test", ".from-in-test", function( event, ui ) {
                    var taskEl = ui.item;
                    var model = tasks.get(taskEl.attr('id'));
                    var newStatus = $(taskEl).parent().attr('id');
                    var fromStatus = model.get('status');

                    if (newStatus == 'ready-for-prod') {
                        model.readyForProduction();
                    } else if (newStatus == 'in-progress') {
                        model.inFeedback();
                    }

                    events.trigger('move', { from: fromStatus, to: model.get('status') });
                    $('.from-in-test').removeClass('highlight');
                });

                applySortable("#ready-for-prod", "#in-prod", function( event, ui ) {
                    var taskEl = ui.item;
                    var model = tasks.get(taskEl.attr('id'));
                    var fromStatus = model.get('status');

                    model.inProduction();
                    events.trigger('move', { from: fromStatus, to: model.get('status') });
                    $('#in-prod').removeClass('highlight');
                });

                applySortable("#in-prod", ".from-in-prod", function( event, ui ) {
                    var taskEl = ui.item;
                    var model = tasks.get(taskEl.attr('id'));
                    var newStatus = $(taskEl).parent().attr('id');
                    var fromStatus = model.get('status');

                    if (newStatus == 'done') {
                        model.done();
                    } else if (newStatus == 'in-progress') {
                        model.inProgress();
                    }

                    events.trigger('move', { from: fromStatus, to: model.get('status') });
                    $('.from-in-prod').removeClass('highlight');
                });

                applySortable("#done");
            }

            function applySortable(selector, connectWith, onStopCallback) {
                $(selector).sortable({
                    placeholder: "sort-highlight",
                    connectWith: connectWith,
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    start: function( event, ui ) {
                        $(connectWith).addClass('highlight');
                    },
                    stop: onStopCallback
                }).disableSelection();
            }
        };
    }
);