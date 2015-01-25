var app = {

    run: function() {
        require(
            ["BoardView", "TasksCollection"],
            function ( BoardView, TasksCollection ) {
                var board = new BoardView({tasks: new TasksCollection()});
                $('body').prepend(board.render().el);
            }
        );
    }
};

app.run();