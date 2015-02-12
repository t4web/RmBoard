define([], function() {
    return {
        "Status/StatusCollection": function(sl) {
            var dfd = $.Deferred();
            require(["Status/StatusCollection"], function(StatusCollection){
                dfd.resolve(new StatusCollection([
                    {id: 1, name: "To do"},
                    {id: 2, name: "In progress"},
                    {id: 3, name: "Ready fo test"},
                    {id: 31, name: "In Test"},
                    {id: 32, name: "Ready for prod"},
                    {id: 33, name: "In prod"},
                    {id: 5, name: "Done"}
                ]));
            });
            return dfd.promise();
        },

        "Status/Factory": function(sl){
            var dfd = $.Deferred();
            require(["Status/Factory"], function(StatusFactory){
                sl.resolve(["Status/StatusCollection"], function(statuses){ dfd.resolve(new StatusFactory(statuses)) });
            });
            return dfd.promise();
        },

        TasksCollection: function(sl){
            var dfd = $.Deferred();
            require(["TasksCollection"], function(TasksCollection){
                sl.resolve(["Status/Factory"], function(statusFactory){
                    dfd.resolve(new TasksCollection([], {statusFactory: statusFactory}));
                });
            });
            return dfd.promise();
        },

        BoardView: function(sl){
            var dfd = $.Deferred();
            require(["BoardView"], function(BoardView){
                sl.resolve(["TasksCollection"], function(tasks){
                    dfd.resolve(new BoardView({tasks: tasks}));
                });
            });
            return dfd.promise();
        },

        LoginView: function(sl){
            var dfd = $.Deferred();
            require(["LoginView"], function(LoginView){
                sl.resolve(["TasksCollection"], function(tasks){
                    dfd.resolve(new LoginView({tasks: tasks}));
                });
            });
            return dfd.promise();
        },

        "ColumnsRelationsService": function(sl) {
            var dfd = $.Deferred();
            require(["ColumnsRelationsService"], function(ColumnsRelationsService){
                sl.resolve(["TasksCollection"], function(tasks){
                    dfd.resolve(new ColumnsRelationsService(tasks));
                });
            });
            return dfd.promise();
        }
    };
});