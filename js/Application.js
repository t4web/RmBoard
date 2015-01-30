var app = {

    run: function() {
        require(
            ["BoardView", "LoginView", "TasksCollection", "TasksView"],
            function ( BoardView, LoginView, TasksCollection, TasksView ) {
                var tasks = new TasksCollection();

                var board = new BoardView({
                    tasks: tasks,
                    tasksView: new TasksView({el: '#to-do', status: 1, tasks: tasks})
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