define([], function() {
    return {
        "Status/StatusCollection": function(sl) {
            var dfd = $.Deferred();
            require(["Status/StatusCollection"], function(StatusCollection){
                dfd.resolve(new StatusCollection());
            });
            return dfd.promise();
        },
        "Status/Factory": function(sl){
            var dfd = $.Deferred();
            require(["Status/Factory"], function(StatusFactory){
                sl.resolve(["Status/StatusCollection"], function(statuses){ dfd.resolve(new StatusFactory(statuses)) });
            });
            return dfd.promise();
        }
    };
});