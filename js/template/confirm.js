define([], function() {
    return '<div class="modal-dialog modal-sm">\n\
                <div class="modal-content">\n\
                    <div class="modal-body">\n\
                        <p><%=message%></p>\
                    </div>\n\
                    <div class="modal-footer">\n\
                        <button type="button" class="btn btn-default" data-dismiss="modal"><%=dismissBtnText%></button>\
                        <button type="button" class="btn btn-primary" id="confirm-accept"><%=acceptBtnText%></button>\
                    </div>\n\
                </div>\n\
            </div>';
});