define(
    'TaskModel',
    ["backbone"],
    function (Backbone) {
        'use strict';

        function updateTask(id, data) {
            $.ajax({
                url: '/index.php?method=PUT&resource=/issues/' + id + '.json',
                data: data,
                type: 'POST'
            });
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
                this.set('name', this.get('name') + ' [In Test]');

                updateTask(this.get('id'), { "issue": { "subject": this.get('name') } });
            },

            inProgress: function() {
                this.set('status', 2);

                updateTask(this.get('id'), { "issue": { "status_id": this.get('status') } });

            },

            readyForTest: function() {
                this.set('status', 3);

                updateTask(this.get('id'), { "issue": { "status_id": this.get('status') } });
            },

            setAsNew: function() {
                this.set('status', 1);

                updateTask(this.get('id'), { "issue": { "status_id": this.get('status') } });
            },

            readyForProduction: function() {
                this.set('name', this.get('name') + ' [Ready for Prod]');

                updateTask(this.get('id'), { "issue": { "subject": this.get('name') } });
            },

            inProduction: function() {
                this.set('name', this.get('name') + ' [In Prod]');

                updateTask(this.get('id'), { "issue": { "subject": this.get('name') } });
            },

            done: function() {
                this.set('status', 5);

                updateTask(this.get('id'), { "issue": { "status_id": this.get('status') } });
            }
        });

        return TaskModel;
    }
);