describe('Login View suite', function() {
    var loginView;
    var tasks;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['LoginView'],
            function (LoginView) {
                tasks = jasmine.createSpyObj('tasks', ['fetch', 'on', 'off']);

                loginView = new LoginView({
                    tasks: tasks
                });
                expect(loginView).toBeDefined();
                done();
            }
        );
    });

    it("el must be <div id='auth-form'>", function() {
        expect(loginView.el.tagName.toLowerCase()).toBe('div');
        expect(loginView.id).toBe('auth-form');
    });

    it("test binding to tasks:empty-issues must call showAuthorization", function(done) {
        require(
            ['LoginView', 'TasksCollection'],
            function (LoginView, TasksCollection) {
                var spy = spyOn(LoginView.prototype, "showAuthorization");

                var tasks = new TasksCollection();

                new LoginView({
                    tasks: tasks
                });

                tasks.trigger("empty-issues");
                expect(spy).toHaveBeenCalled();
                done();
            }
        );
    });

    it("test binding to tasks:fetch:error must call showAuthorization", function(done) {
        require(
            ['LoginView', 'TasksCollection'],
            function (LoginView, TasksCollection) {
                var spy = spyOn(LoginView.prototype, "showAuthorization");

                var tasks = new TasksCollection();

                new LoginView({
                    tasks: tasks
                });

                tasks.trigger("fetch:error");
                expect(spy).toHaveBeenCalled();
                done();
            }
        );
    });


    it("showAuthorization() make #auth-form visible", function() {
        spyOn($.fn, 'modal');

        loginView.showAuthorization();

        expect($('#auth-form').modal).toHaveBeenCalledWith({backdrop: "static"});
    });

    describe('Login', function() {

        var authToken;

        beforeEach(function(){
            authToken = $.cookie('auth_token');
        });

        it("login() must save not empty auth-token", function() {
            spyOn($.fn, 'val').and.returnValue('AUTH-TOKEN-VALUE');
            var reloadSpy = spyOn(loginView, 'reload').and.callFake(function(){});

            loginView.login();

            var authToken = $.cookie('auth_token');

            expect(authToken).toEqual('AUTH-TOKEN-VALUE');
            expect(reloadSpy).toHaveBeenCalled();
        });

        it("login() must not save empty auth-token", function() {
            spyOn($.fn, 'val').and.returnValue('');
            var reloadSpy = spyOn(loginView, 'reload').and.callFake(function(){});

            var authTokenBefore = $.cookie('auth_token');

            loginView.login();

            var authTokenAfter = $.cookie('auth_token');

            expect(authTokenBefore).toEqual(authTokenAfter);
            expect(reloadSpy).toHaveBeenCalled();
        });

        afterEach(function(){
            $.cookie('auth_token', authToken);
        });
    });

});