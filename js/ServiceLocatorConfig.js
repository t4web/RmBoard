define([], function() {
    return {
        "Assignee/Collection": function(sl) {
            var dfd = $.Deferred();
            require(["backbone"], function(Backbone){
                dfd.resolve(new Backbone.Collection(
                    [
                        {id: 27, name: "Ярослав Подорванов", nick: "VL", colorClass: "label-danger" },
                        {id: 14, name: "Максим Гултурян", nick: "MG", colorClass: "label-success" },
                        {id: 16, name: "Дмитрий Кирилов", nick: "DK", colorClass: "label-info" },
                        {id: 15, name: "Артем Гуржий", nick: "AM", colorClass: "label-warning" },
                    ],
                    {
                        model: Backbone.Model.extend({
                            defaults: { id: null, name: null, nick: null, colorClass: "label-danger" }
                        })
                    }));
            });
            return dfd.promise();
        },

        "Status/StatusCollection": function(sl) {
            var dfd = $.Deferred();
            require(["Status/StatusCollection"], function(StatusCollection){
                dfd.resolve(new StatusCollection([
                    {id: 1, name: "To do"},
                    {id: 2, name: "In progress"},
                    {id: 3, name: "Ready fo test"},
                    {id: 31, name: "In Test"},
                    {id: 32, name: "Ready for Prod"},
                    {id: 33, name: "In Prod"},
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
                sl.resolve(["Status/Factory", "Assignee/Collection"], function(statusFactory, assignees){
                    dfd.resolve(new TasksCollection([], {statusFactory: statusFactory, assignees: assignees}));
                });
            });
            return dfd.promise();
        },

        BoardView: function(sl){
            var dfd = $.Deferred();
            require(["BoardView"], function(BoardView){
                sl.resolve(["TasksCollection", "ConfirmView"], function(tasks, confirm){
                    dfd.resolve(new BoardView({tasks: tasks, confirm: confirm}));
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

        ConfirmView: function(sl){
            var dfd = $.Deferred();
            require(["ConfirmView"], function(ConfirmView){
                dfd.resolve(new ConfirmView());
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