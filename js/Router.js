define([
    "backbone", "BoardView"
], function( Backbone, BoardView ) {

    // Extends Backbone.Router
    var router = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home"

        },

        home: function() {
            var board = new BoardView();
            board.render();
        }
    } );

    return router;

} );