var app = {

    run: function() {
        require(["BoardView"], function ( BoardView ) {
            var board = new BoardView();
            $('body').prepend(board.render().el);
        });
    }
};

app.run();