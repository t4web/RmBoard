var app = {

    router: null,

    run: function() {
        var _that = this;
        require(["Router"], function ( Router ) {
            _that.router = new Router();
        });
    }
};

app.run();