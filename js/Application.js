var app = {

    run: function() {
        require(
            ["BoardView", "LoginView", "TasksCollection", "TasksView"],
            function ( BoardView, LoginView, TasksCollection, TasksView ) {
                var tasks = new TasksCollection();

                var board = new BoardView({
                    tasks: tasks,
                    tasksView: new TasksView({id: 'to-do'})
                });

                var loginForm = new LoginView({
                    tasks: tasks
                });

                $('body').prepend(board.render().el);
                $('body').append(loginForm.render().el);
            }
        );
    }
};

app.run();