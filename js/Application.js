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
    ["ServiceLocator"],
    function ( ServiceLocator ) {

        var config = {
            StatusFactory: function (sl) {
                var StatusFactory = require('Status/Factory');
                return new StatusFactory(sl.get("StatusCollection"));
            },
            TasksCollection: function (sl) {
                var TasksCollection = require('TasksCollection');
                return new TasksCollection({
                    statusFactory: sl.get("StatusFactory")
                });
            },
            BoardView: function (sl) {

                var b;

                callback = function (BoardView) {
                    b = new BoardView({
                        tasks: {}//sl.get("TasksCollection")
                    });
                };

                $.when( require(['BoardView'], callback) ).done(callback);

console.log(b);
                /*
                var dfd = $.Deferred();
                //var BoardView = require('BoardView');


                var b;
                dfd.done(function( n ) {

                    b = n;
                    console.log(n);
                });
//console.log(b);
                return b;
                //return new BoardView({
                //    tasks: sl.get("TasksCollection")
                //});*/
            },
            LoginView: function (sl) {
                var LoginView = require('LoginView');
                return new LoginView({
                    tasks: sl.get("TasksCollection")
                });
            },
            StatusCollection: function () {
                var StatusCollection = require('Status/StatusCollection');
                return new StatusCollection([
                    {id: 1, name: "To do"},
                    {id: 2, name: "In progress"},
                    {id: 3, name: "Ready fo test"},
                    {id: 31, name: "In Test"},
                    {id: 32, name: "Ready for prod"},
                    {id: 33, name: "In prod"},
                    {id: 5, name: "Done"}
                ]);
            }
        };

        var serviceLocator = new ServiceLocator(config);

        serviceLocator.resolve(['BoardView', 'LoginView'], app.run);

        app.run(
            serviceLocator.get('BoardView'),
            serviceLocator.get('LoginView')
        );
    }
);
/*
require(
    ["ServiceLocator", "TasksCollection", "BoardView", "LoginView",
        "Status/StatusCollection", "Status/Factory"],
    function ( ServiceLocator, TasksCollection, BoardView, LoginView,
               StatusCollection, StatusFactory ) {
        var config = {
            StatusFactory: function(sl){
                return new StatusFactory(sl.get("StatusCollection"));
            },
            TasksCollection: function(sl){
                return new TasksCollection({
                    statusFactory: sl.get("StatusFactory")
                });
            },
            BoardView: function(sl){
                return new BoardView({
                    tasks: sl.get("TasksCollection")
                });
            },
            LoginView: function(sl){
                return new LoginView({
                    tasks: sl.get("TasksCollection")
                });
            },
            StatusCollection: function(){
                return new StatusCollection([
                    {id: 1, name: "To do"},
                    {id: 2, name: "In progress"},
                    {id: 3, name: "Ready fo test"},
                    {id: 31, name: "In Test"},
                    {id: 32, name: "Ready for prod"},
                    {id: 33, name: "In prod"},
                    {id: 5, name: "Done"},
                ]);
            }
        };

        var serviceLocator = new ServiceLocator(config);

        app.run(
            serviceLocator.get('BoardView'),
            serviceLocator.get('LoginView')
        );
    }
);
*/