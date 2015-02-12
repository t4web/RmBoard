var app = {

    config: [],

    run: function(board, loginForm, columnsRelations) {
        $('body').prepend(board.render().el);
        $('body').append(loginForm.render().el);

        //columnsRelations.init();
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
    ["ServiceLocator", "ServiceLocatorConfig"],
    function ( ServiceLocator, slConfig ) {

        var serviceLocator = new ServiceLocator(slConfig);

        serviceLocator.resolve(["BoardView", "LoginView", "ColumnsRelationsService"], app.run, app);
    }
);