define(
    'ColumnsRelationsService',
    ["TasksCollection"],
    function (TasksCollection) {
        'use strict';

        return function (tasks) {

            if (!(tasks instanceof TasksCollection)) {
                throw new Error("Tasks must be instance of TasksCollection.");
            }

            tasks.on('fetch:success', init, this);

            function init () {

                $("#to-do").sortable({
                    placeholder: "sort-highlight",
                    connectWith: "#in-progress",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    stop: function( event, ui ) {
                        var taskEl = ui.item;
                        var model = tasks.get(taskEl.attr('id'));
                        model.inProgress();
                    }
                }).disableSelection();

                $("#in-progress").sortable({
                    placeholder: "sort-highlight",
                    connectWith: ".from-in-progress",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    stop: function( event, ui ) {
                        var taskEl = ui.item;
                        var model = tasks.get(taskEl.attr('id'));
                        var newStatus = $(taskEl).parent().attr('id');

                        if (newStatus == 'ready-for-test') {
                            model.readyForTest();
                        } else if (newStatus == 'to-do') {
                            model.setAsNew();
                        }
                    }
                }).disableSelection();

                $("#ready-for-test").sortable({
                    placeholder: "sort-highlight",
                    connectWith: "#in-test",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    stop: function( event, ui ) {
                        var taskEl = ui.item;
                        var model = tasks.get(taskEl.attr('id'));
                        model.mergedToTest();
                    }
                }).disableSelection();

                $("#in-test").sortable({
                    placeholder: "sort-highlight",
                    connectWith: ".from-in-test",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    stop: function( event, ui ) {
                        var taskEl = ui.item;
                        var model = tasks.get(taskEl.attr('id'));
                        var newStatus = $(taskEl).parent().attr('id');

                        if (newStatus == 'ready-for-prod') {
                            model.readyForProduction();
                        } else if (newStatus == 'in-progress') {
                            model.inProgress();
                        }
                    }
                }).disableSelection();

                $("#ready-for-prod").sortable({
                    placeholder: "sort-highlight",
                    connectWith: "#in-prod",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    stop: function( event, ui ) {
                        var taskEl = ui.item;
                        var model = tasks.get(taskEl.attr('id'));
                        model.inProduction();
                    }
                }).disableSelection();

                $("#in-prod").sortable({
                    placeholder: "sort-highlight",
                    connectWith: ".from-in-prod",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    stop: function( event, ui ) {
                        var taskEl = ui.item;
                        var model = tasks.get(taskEl.attr('id'));
                        var newStatus = $(taskEl).parent().attr('id');

                        if (newStatus == 'done') {
                            model.done();
                        } else if (newStatus == 'in-progress') {
                            model.inProgress();
                        }
                    }
                }).disableSelection();

                $("#done").sortable({
                    placeholder: "sort-highlight",
                    handle: ".box-header",
                    forcePlaceholderSize: true,
                    zIndex: 999999,
                    stop: function( event, ui ) {
                        var taskEl = ui.item;
                        var model = tasks.get(taskEl.attr('id'));
                        //model.inProduction();
                    }
                }).disableSelection();

            }

        };
    }
);