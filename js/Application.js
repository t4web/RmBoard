var app = {

    config: [],

    run: function() {
        require(
            ["BoardView", "LoginView", "TasksCollection"],
            function ( BoardView, LoginView, TasksCollection ) {
                var tasks = new TasksCollection();

                var board = new BoardView({
                    tasks: tasks
                });

                var loginForm = new LoginView({
                    tasks: tasks
                });

                $('body').prepend(board.render().el);
                $('body').append(loginForm.render().el);
            }
        );
    },

    getConfig: function(variableName) {
        if (_.size(this.config) == 0) {
            var _this = this;

            $.ajax({
                url: '/index.php?resource=get-config',
                async: false,
                success: function(config) {
                    _this.config = config;
                }
            });
        }

        if (this.config.hasOwnProperty(variableName)) {
            return this.config[variableName];
        }

        return null;
    }
};

app.run();