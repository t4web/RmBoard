define(
    'LoginView',
    ['backbone', 'template/login-form'],
    function(Backbone, loginFormTpl) {
        'use strict';

        var LoginView = Backbone.View.extend({

            tasks: null,
            id: 'auth-form',
            className: 'modal fade',
            attributes: { role: "dialog" },

            events: {
                "click #login-btn": "login"
            },

            initialize: function(options) {
                this.tasks = options.tasks;

                this.listenTo(this.tasks, 'empty-issues', this.showAuthorization);
                this.listenTo(this.tasks, 'fetch:error', this.showAuthorization);
            },

            render: function() {
                var template = _.template(loginFormTpl);

                this.$el.html(template());

                return this;
            },

            showAuthorization: function() {
                $('#auth-form').modal({backdrop: "static"});
            },

            login: function() {
                var authToken = $('#auth-token').val();

                if (authToken.length > 0) {
                    $.cookie('auth_token', authToken);
                }

                this.reload();
            },

            reload: function() {
                location.reload();
            }

        });

        return LoginView;
    }
);
