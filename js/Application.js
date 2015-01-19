var app = {

    run: function() {
        require(["BoardController"], function ( BoardController ) {
            var board = new BoardController();
            board.render();
        });
    }
};

app.run();