define(
    'ConfirmView',
    ['backbone', 'template/confirm'],
    function(Backbone, confirmTpl) {
        'use strict';

        return Backbone.View.extend({

            acceptCallback: null,
            id: 'confirm',
            className: 'modal fade',
            attributes: { role: "dialog" },
            options: {
                message: "Are you sure?",
                acceptBtnText: "Yes"
            },

            events: {
                "click #confirm .btn-primary": "accept"
            },

            render: function() {
                var template = _.template(confirmTpl);

                this.$el.html(template(this.options));

                return this;
            },

            show: function(options) {
                this.options = options;
                this.render();
                this.$el.modal();
            },

            accept: function() {
                var authToken = $('#auth-token').val();

                if (authToken.length > 0) {
                    $.cookie('auth_token', authToken);
                }

                this.reload();
            }

        });
    }
);
