define([], function() {
    return '<section class="content">\n\
                <div class="row">\n\
                    <div class="col-md-12">\n\
                        <button class="btn btn-success btn-sm pull-right"><i class="fa fa-refresh"></i> Refresh</button>\n\
                    </div>\n\
                </div>\n\
                \n\
                <div class="row">\n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header"> \n\
                            To do\n\
                            <small>Новая</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            In progress\n\
                            <small>В работе</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            In Test\n\
                            <small>Решена</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            Ready for merge\n\
                            <small>Решена, нужно смерджить на прод</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            In prod\n\
                            <small>Решена, нужно проверить на прод</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            Done\n\
                            <small>Закрыта</small>\n\
                        </h1>\n\
                    </div>\n\
                </div>\n\
                <div class="row" id="columns">\n\
                    <div class="col-md-2" id="to-do">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2" id="in-progress">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2" id="in-test">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2" id="ready-for-merge">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2" id="in-prod">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2" id="done">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                </div>\n\
            </section>';
});