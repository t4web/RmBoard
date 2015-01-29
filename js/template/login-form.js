define([], function() {
    return '<div class="modal-dialog modal-sm">\n\
                <div class="modal-content">\n\
                    <div class="modal-header">\n\
                        <h4 class="modal-title">Login</h4>\n\
                    </div>\n\
                    <div class="modal-body">\n\
                        <div class="form-group">\n\
                            <label for="recipient-name" class="control-label">Enter _redmine_session cookie:</label>\n\
                            <textarea class="form-control" id="auth-token"></textarea>\n\
                        </div>\n\
                    </div>\n\
                    <!--<div class="modal-body">\n\
                        <div class="form-group">\n\
                            <label for="recipient-name" class="control-label">Recipient:</label>\n\
                            <input type="text" class="form-control" id="recipient-name">\n\
                        </div>\n\
                        <div class="form-group">\n\
                            <label for="message-text" class="control-label">Message:</label>\n\
                            <input type="text" class="form-control" id="recipient-name">\n\
                        </div>\n\
                    </div>-->\n\
                    <div class="modal-footer">\n\
                        <button type="button" class="btn btn-primary btn-block" id="login-btn">Login me in</button>\n\
                    </div>\n\
                </div>\n\
            </div>';
});