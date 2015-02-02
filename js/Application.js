var app = {

    run: function() {
        require(
            ["BoardView", "LoginView", "TasksCollection", "TasksView"],
            function ( BoardView, LoginView, TasksCollection, TasksView ) {
                var tasks = new TasksCollection();

                var board = new BoardView({
                    tasks: tasks
                });

                new TasksView({id: 'to-do', status: 1, tasks: tasks});
                new TasksView({id: 'in-progress', status: 2, tasks: tasks});
                new TasksView({id: 'in-test', status: 3, tasks: tasks});
                new TasksView({id: 'ready-for-merge', status: 9, tasks: tasks});
                new TasksView({id: 'in-prod', status: 9, tasks: tasks});
                new TasksView({id: 'done', status: 9, tasks: tasks});

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