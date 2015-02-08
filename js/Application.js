var app = {

    config: [],

    run: function(board, loginForm) {
        $('body').prepend(board.render().el);
        $('body').append(loginForm.render().el);
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

require(
    ["ServiceLocator", "TasksCollection", "BoardView", "LoginView"],
    function ( ServiceLocator, TasksCollection, BoardView, LoginView ) {
        var config = {
            TasksCollection: function(){
                return new TasksCollection();
            },
            BoardView: function(sl){
                return new BoardView({
                    tasks: sl.get('TasksCollection')
                });
            },
            LoginView: function(sl){
                return new LoginView({
                    tasks: sl.get('TasksCollection')
                });
            }
        };

        var serviceLocator = new ServiceLocator(config);

        app.run(
            serviceLocator.get('BoardView'),
            serviceLocator.get('LoginView')
        );
    }
);
