define(
    'ConfirmView',
    ['backbone', 'template/confirm'],
    function(Backbone, confirmTpl) {
        'use strict';

        return Backbone.View.extend({

            id: 'confirm',
            className: 'modal fade',
            attributes: { role: "dialog" },
            options: {
                message: "Are you sure?",
                acceptBtnText: "Yes",
                dismissBtnText: "Cancel",
                acceptCallback: function(){}
            },

            events: {
                "click button.btn-primary": "accept"
            },

            render: function() {
                var template = _.template(confirmTpl);

                this.$el.html(template(this.options));

                return this;
            },

            show: function(options) {
                this.options = _.extend(this.options, options);
                this.render();
                this.$el.modal();
            },

            accept: function() {
                this.options.acceptCallback();
                this.$el.modal('hide');
            }

        });
    }
);
