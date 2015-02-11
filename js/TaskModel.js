define(
    'TaskModel',
    ["backbone"],
    function (Backbone) {
        'use strict';

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

                $.ajax({
                    url: '/index.php?method=PUT&resource=/issues/' + this.get('id') + '.json',
                    data: { "issue": { "subject": this.get('name') } },
                    type: 'POST'
                });

            }
        });

        return TaskModel;
    }
);