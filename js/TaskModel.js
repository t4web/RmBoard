define(
    'TaskModel',
    ["backbone"],
    function (Backbone) {
        'use strict';

        function updateTask(id, name, statusId) {
            if (app.config.env != 'development') {
                $.ajax({
                    url: '/index.php?method=PUT&resource=/issues/' + id + '.json',
                    data: {issue: {subject: name, status_id: statusId}},
                    type: 'POST'
                });
            }
        }

        function clearAllMarkers(name) {
            return name.replace(" [In Test]", "")
                .replace(" [Ready for Prod]", "")
                .replace(" [In Prod]", "");
        }

        var TaskModel = Backbone.Model.extend({
            defaults: {
                id: null,
                name: '',
                assignee: '',
                status: 1,
                type: 1,
                colorClass: 'bg-green'
            },

            mergedToTest: function() {
                this.set('name', clearAllMarkers(this.get('name')) + ' [In Test]');
                this.set('status', 31);

                updateTask(this.get('id'), this.get('name'), 3);
            },

            inProgress: function() {
                this.set('name', clearAllMarkers(this.get('name')));
                this.set('status', 2);

                updateTask(this.get('id'), this.get('name'), this.get('status'));
            },

            inFeedback: function() {
                this.set('name', clearAllMarkers(this.get('name')));
                this.set('status', 2);
                this.set('colorClass', this.get('colorClass') + ' task-feedback');

                updateTask(this.get('id'), this.get('name'), 4);
            },

            readyForTest: function() {
                this.set('name', clearAllMarkers(this.get('name')));
                this.set('status', 3);

                updateTask(this.get('id'), this.get('name'), this.get('status'));
            },

            setAsNew: function() {
                this.set('name', clearAllMarkers(this.get('name')));
                this.set('status', 1);

                updateTask(this.get('id'), this.get('name'), this.get('status'));
            },

            readyForProduction: function() {
                this.set('name', clearAllMarkers(this.get('name')) + ' [Ready for Prod]');
                this.set('status', 32);

                updateTask(this.get('id'), this.get('name'), 3);
            },

            inProduction: function() {
                this.set('name', clearAllMarkers(this.get('name')) + ' [In Prod]');
                this.set('status', 33);

                updateTask(this.get('id'), this.get('name'), 3);
            },

            done: function() {
                this.set('name', clearAllMarkers(this.get('name')));
                this.set('status', 5);

                updateTask(this.get('id'), this.get('name'), this.get('status'));
            }
        });

        return TaskModel;
    }
);