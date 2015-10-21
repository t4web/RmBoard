define([], function() {
    return '<section class="content">\n\
                <div class="row refresh">\n\
                    <div class="col-md-12">\n\
                        <button class="btn btn-success btn-sm pull-right" id="refresh-btn" disabled="disabled"><i class="fa fa-refresh"></i> Refresh</button>\n\
                    </div>\n\
                </div>\n\
                \n\
                <div class="row">\n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header"> \n\
                            To do\n\
                            <small><span id="to-do-count">(354)</span> Новая</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            In progress <a href="<%=app.getConfig(\'links.in-progress\')%>" target="_blank"><i class="fa fa-external-link"></i></a>\n\
                            <small><span id="in-progress-count">(354)</span> В работе</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            Ready for merge on test <a href="<%=app.getConfig(\'links.ready-for-test\')%>" target="_blank"><i class="fa fa-external-link"></i></a>\n\
                            <!--<a href="javascript:void(0);" id="deploy-all-on-test"><i class="fa fa-sign-out"></i></a>-->\n\
                            <small><span id="ready-for-test-count">(354)</span> Решена, нужно смерджить на тест</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            In Test <a href="<%=app.getConfig(\'links.in-test\')%>" target="_blank"><i class="fa fa-external-link"></i></a>\n\
                            <small><span id="in-test-count">(354)</span> Решена, нужно проверить на тест</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-2">\n\
                        <h1 class="page-header">\n\
                            Ready for merge on prod <a href="<%=app.getConfig(\'links.ready-for-prod\')%>" target="_blank"><i class="fa fa-external-link"></i></a>\n\
                            <small><span id="ready-for-prod-count">(354)</span> Решена, нужно смерджить на прод</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-1">\n\
                        <h1 class="page-header">\n\
                            In prod <a href="<%=app.getConfig(\'links.in-prod\')%>" target="_blank"><i class="fa fa-external-link"></i></a>\n\
                            <small><span id="in-prod-count">(354)</span> Решена, нужно проверить на прод</small>\n\
                        </h1>\n\
                    </div>\n\
                    \n\
                    <div class="col-md-1">\n\
                        <h1 class="page-header">\n\
                            Done\n\
                            <small>Закрыта</small>\n\
                        </h1>\n\
                    </div>\n\
                </div>\n\
                <div class="row" id="columns">\n\
                    <div class="col-md-2 from-in-progress tasks-column" id="to-do">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2 from-in-test from-in-prod tasks-column" id="in-progress">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2 from-in-progress tasks-column" id="ready-for-test">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2 tasks-column" id="in-test">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-2 from-in-test tasks-column" id="ready-for-prod">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-1 tasks-column" id="in-prod">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                    <div class="col-md-1 from-in-prod tasks-column" id="done">\
                        <div class="box box-solid box-loader">\
                            <div class="overlay"></div>\
                            <div class="loading-img"></div>\
                        </div>\
                    </div>\n\
                </div>\n\
            </section>';
});